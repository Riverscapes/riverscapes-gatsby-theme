/**
 * RSIcon component
 *
 * This is designed to be an icon that wraps the MUI Icon component.
 * It's specially designed so that it doesn't fail if the icon can't be found
 * and it prevents the user needing to run `import Iconname` inside the markdown file.
 *
 * It is used by RSStaticImage as well.
 */

import React from 'react'
import { SvgIconProps, Tooltip } from '@mui/material'
import * as allIcons from '@mui/icons-material'

interface RSLinkButtonProps extends SvgIconProps {
  iconName: keyof typeof allIcons
}

export const RSIcon: React.FC<RSLinkButtonProps> = ({ iconName, ...props }) => {
  // Icon is an SVGIcon
  let Icon: allIcons.SvgIconComponent = allIcons['Error']
  let found = false
  try {
    const iconNameFinal = iconName.replace(/Icon$/g, '') // Remove "Icon" from the end of the string
    // Import the icon on the fly
    if (allIcons[iconNameFinal]) {
      Icon = allIcons[iconNameFinal]
      found = true
    }
  } catch (e) {
    console.error(e)
  }

  if (!found) {
    return (
      <Tooltip title={`Icon ${iconName} not found`}>
        <Icon
          {...props}
          sx={{
            ...props.sx,
            color: 'red',
          }}
        />
      </Tooltip>
    )
  }

  return <Icon {...props} />
}
