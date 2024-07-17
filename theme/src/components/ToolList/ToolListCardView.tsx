import { Box, Card, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import React, { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image'

import { Tool } from './types'

export interface ToolListCardViewProps {
  tools: Tool[]
}

export const ToolListCardView: React.FC<ToolListCardViewProps> = ({ tools }) => {
  const toolImages = useMemo(() => {
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
    const allImages = new Map(imageData.allFile.nodes.map((node) => [node.name, node]))

    const imageMap = new Map()
    tools.forEach((tool) => {
      const imageNode = allImages.get(tool.toolId) as { childImageSharp: any }
      let image: IGatsbyImageData
      try {
        image = getImage(imageNode.childImageSharp)
      } catch (e) {
        const defaultImage = allImages.get('default') as { childImageSharp: any }
        image = getImage(defaultImage.childImageSharp)
      }
      imageMap.set(tool.toolId, image)
    })

    return imageMap
  }, [tools])

  return (
    <Grid container spacing={2}>
      {tools.map((tool) => (
        <Grid key={tool.toolId} xs={12} sm={6} md={4}>
          <ToolListCard tool={tool} image={toolImages.get(tool.toolId)} />
        </Grid>
      ))}
    </Grid>
  )
}

export interface ToolListCardProps {
  tool: Tool
  image: any
}

export const ToolListCard: React.FC<ToolListCardProps> = ({ tool, image }) => {
  return (
    <Card>
      <Box sx={{ width: '100%', height: '70px' }}>
        <GatsbyImage
          image={image}
          alt={`card image for ${tool.name}`}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Box>

      <Box sx={{ p: 2 }}>
        <Typography sx={{ fontWeight: 'bold' }}>{tool.name}</Typography>
        <Box>{tool.description}</Box>
      </Box>
    </Card>
  )
}
