import { Reporter } from 'gatsby' // Import the Reporter type from Gatsby
import sharp, { ResizeOptions } from 'sharp'
import glob from 'glob'
import fs from 'fs-extra'
import path from 'path'
import loglevel from 'loglevel'

loglevel.enableAll()

const MAX_WIDTH = 1920 // the biggest width we want to allow
const MAX_HEIGHT = 1920
// Set maximum file size to 500kb
const MAX_BYTESIZE = 500000
// Anything less than 50kb is too small to optimize
const MIN_BYTESIZE = 50000
const QUALITY = 70
const PNG_COMPRESSION = 9

type Logger = {
  debug: (msg: string) => void
  info: (msg: string) => void
  warn: (msg: string) => void
  error: (msg: string) => void
}

const getLogger = (reporter?: Reporter): Logger => {
  if (reporter) {
    return {
      debug: reporter.verbose.bind(reporter),
      info: reporter.info.bind(reporter),
      warn: reporter.warn.bind(reporter),
      error: reporter.error.bind(reporter),
    }
  } else {
    return {
      debug: loglevel.debug.bind(loglevel),
      info: loglevel.info.bind(loglevel),
      warn: loglevel.warn.bind(loglevel),
      error: loglevel.error.bind(loglevel),
    }
  }
}

export function optimizeImages(imgPath: string, reporter?: Reporter): Promise<void[]> {
  const log = getLogger(reporter)
  log.info(`Optimizing images in ${imgPath}`)
  const imagePaths: string[] = glob.sync(path.join(imgPath, '**/*.{png,jpg,jpeg}')).filter((imgPath: string) => {
    // Filter out the backups or OPTIMIZED temporary images so we don't get any weird recursion loops
    if (!imgPath.includes('-OPTIMIZED.') && !imgPath.includes('-BACKUP.')) {
      return true
    }
  })
  log.info(`Found ${imagePaths.length} images to optimize`)

  /**
   * Resize images to a sensible size, and convert to JPEG.
   */
  return Promise.all(
    imagePaths.map(async (imgPathOrig: string) => {
      const stream = sharp(imgPathOrig)
      const info = await stream.metadata().catch((err) => {
        log.error(`Error finding metadata for image ${imgPathOrig}`)
        throw err
      })

      const backupName: string = imgPathOrig.replace(/(\..+)$/, (match, ext) => `-BACKUP${ext}`)
      const newName: string = imgPathOrig.replace(/(\..+)$/, (match, ext) => `-OPTIMIZED${ext}`)

      // Here are some reasons we won't proceed
      if (info.size < MIN_BYTESIZE) {
        log.debug(`SKIPPING: Image ${imgPathOrig} is too small to optimize`)
        return
      }
      if (info.width < MAX_WIDTH && info.height < MAX_HEIGHT && info.isProgressive && info.size < MAX_BYTESIZE) {
        log.debug(`SKIPPING: Image ${imgPathOrig} as it is fine as-is`)
        return
      } else if (fs.existsSync(backupName)) {
        log.debug(
          `Backup already exists for ${imgPathOrig} This means we've already tried to optimize this file -- SKIPPING`
        )
        return
      }
      if (fs.existsSync(newName)) {
        log.warn(
          `Optimized file already exists for ${imgPathOrig} this could mean the last optimization failed. Removing this file and trying again`
        )
        fs.removeSync(newName)
      }

      let resizeOptions: ResizeOptions = {}
      // If the width or height are greater than their max values, resize the image.
      if (info.width > MAX_WIDTH || info.height > MAX_HEIGHT) {
        resizeOptions = {
          width: info.width > MAX_WIDTH ? MAX_WIDTH : null,
          height: info.height > MAX_HEIGHT ? MAX_HEIGHT : null,
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        }
      }

      // PNG Processing
      if (info.format === 'png') {
        // Decide if we have nothing to do here or not.
        if (
          resizeOptions.width === null ||
          resizeOptions.height === null ||
          !info.isProgressive ||
          info.size < MAX_BYTESIZE
        ) {
          return
        }

        /**
          CompressionLevel: The compressionLevel option controls the zlib compression level. It can be a value from 0 (no compression) 
          to 9 (best compression). Higher values will result in smaller file sizes but slower compression times.

          Progressive: The progressive option enables progressive (interlace) scan for PNG output. This can provide a better user 
          experience because the image will gradually become clearer as it's downloaded.
        */

        await stream
          .resize(resizeOptions)
          .png({
            compressionLevel: PNG_COMPRESSION,
            progressive: true,
          })
          .toFile(newName)
          .catch((err) => {
            log.error(`Error optimizing image ${imgPathOrig}`)
            throw err
          })
      }
      // JPG Processing
      else {
        // Decide if we have nothing to do here or not.
        if (!info.isProgressive || info.size < MAX_BYTESIZE) {
          return
        }
        /**
          Quality: The quality option controls the quality of the output image. Lower values will result in smaller file sizes 
          but lower image quality. A value of around 60-70 is often a good compromise between size and quality.

          Progressive: The progressive option enables progressive (interlace) scan for JPEG output. This can provide a 
          better user experience because the image will gradually become clearer as it's downloaded.

          OptimiseScans: The optimiseScans option, when combined with progressive: true, will produce a smaller file with 
          virtually no difference in perceived visual quality, at a slight cost in terms of speed to compress.

          ChromaSubsampling: The chromaSubsampling option controls the chroma subsampling level. The value '4:4:4' will 
          prevent chroma subsampling, leading to higher quality and larger file size. The value '4:2:0' will enable chroma 
          subsampling, leading to lower quality and smaller file size.
        */
        await stream
          .resize(resizeOptions)
          .jpeg({
            quality: QUALITY,
            progressive: true,
            optimiseScans: true,
            chromaSubsampling: '4:2:0',
          })
          .toFile(newName)
          .catch((err) => {
            log.error(`Error optimizing image ${imgPathOrig}`)
            throw err
          })
      }

      if (fs.existsSync(newName)) {
        fs.rename(imgPathOrig, backupName)
        fs.rename(newName, imgPathOrig)
        log.info(`Optimized image ${imgPathOrig} and saved backup to ${backupName}`)
      } else {
        log.error(`Error optimizing image ${imgPathOrig}`)
      }

      return
    })
  )
}
