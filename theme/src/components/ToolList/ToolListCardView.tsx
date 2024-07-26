import { Box, Card, Typography, Link } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React, { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import { ToolInfoModal } from './ToolInfoModal'
import { Tool } from './types'

export interface ToolListCardViewProps {
  tools: Tool[]
}

export const ToolListCardView: React.FC<ToolListCardViewProps> = ({ tools }) => {
  const [modalState, setModalState] = React.useState({
    modalOpen: false,
    tool: tools[0],
  })

  const handleModalOpen = (tool) => {
    setModalState({ modalOpen: true, tool })
  }

  const handleModalClose = () => {
    setModalState((state) => ({ ...state, modalOpen: false }))
  }

  const imageData = useStaticQuery(graphql`
    query ToolImages {
      allFile(filter: { sourceInstanceName: { eq: "siteImages" }, relativeDirectory: { eq: "tools" } }) {
        nodes {
          name
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  `)

  const toolImages = useMemo(() => {
    const allImages = new Map(imageData.allFile.nodes.map((node) => [node.name, node]))

    const imageMap = new Map()
    tools.forEach((tool) => {
      const imageNode = allImages.get(tool.toolId) as { childImageSharp: any }
      let image: IGatsbyImageData
      try {
        image = getImage(imageNode.childImageSharp)
      } catch (e) {
        const defaultImage = allImages.get('default') as { childImageSharp: any }
        if (defaultImage == undefined) {
          imageMap.set(tool.toolId, null)
          return
        }
        image = getImage(defaultImage.childImageSharp)
      }
      imageMap.set(tool.toolId, image)
    })

    return imageMap
  }, [tools, imageData])

  return (
    <Box>
      <Grid container spacing={2}>
        {tools.map((tool) => (
          <Grid key={tool.toolId} xs={12} sm={6}>
            <ToolListCard tool={tool} image={toolImages.get(tool.toolId)} onClick={() => handleModalOpen(tool)} />
          </Grid>
        ))}
      </Grid>
      <ToolInfoModal onClose={handleModalClose} open={modalState['modalOpen']} tool={modalState['tool']} />
    </Box>
  )
}

export interface ToolListCardProps {
  tool: Tool
  image: any
  onClick?: () => void
}

export const ToolListCard: React.FC<ToolListCardProps> = ({ tool, image, onClick }) => {
  return (
    <Card sx={{ height: '100%' }}>
      {image && (
        <Box sx={{ width: '100%', height: '70px' }}>
          <Link sx={{ cursor: 'pointer' }} onClick={onClick}>
            <GatsbyImage
              image={image}
              alt={`card image for ${tool.name}`}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </Link>
        </Box>
      )}

      <Box sx={{ p: 2 }}>
        <Typography
          component={Link}
          sx={{
            fontWeight: 'bold',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            display: 'inline-block',
            maxWidth: '100%',
            cursor: 'pointer',
          }}
          onClick={onClick}
          underline="none"
        >
          {tool.name}
        </Typography>
        <Box>
          {tool.description.length < 100 ? tool.description : tool.description.slice(0, 100) + '...'}
          {tool.description.length > 100 ? (
            <Link sx={{ cursor: 'pointer' }} onClick={onClick}>
              See More
            </Link>
          ) : (
            ''
          )}
        </Box>
      </Box>
    </Card>
  )
}
