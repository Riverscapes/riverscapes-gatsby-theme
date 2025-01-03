import React from 'react'
import SideNav from './SideNav'

interface AllPagesMenuProps {
  nodes: Node[]
  heading?: string
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5'
  showHeading?: boolean
}

const AllPagesMenu: React.FC<AllPagesMenuProps> = ({
  nodes,
  heading = 'Site Index',
  headingType = 'h2',
  showHeading = false,
}) => {
  // Function to group entries based on slug levels and convert to new object structure
  const convertToStructure = (groupedItems) => {
    const result = []

    const traverse = (items, parent = null) => {
      Object.keys(items).forEach((key) => {
        const item = items[key]
        const newItem = {
          title: item.title || key,
          url: item.url || '',
          menuWeight: item.menuWeight || 999,
          items: [],
        }
        if (item.items) {
          traverse(item.items, newItem.items)
        }
        parent.push(newItem)
      })
      // Sort the items array first by weight and then alphabetically by title
      parent.sort((a, b) => {
        if (a.menuWeight !== b.menuWeight) {
          return a.menuWeight - b.menuWeight
        }
        return a.title.localeCompare(b.title)
      })
    }

    traverse(groupedItems, result)
    return result
  }

  // Function to group entries based on slug levels
  const groupItemsBySlugLevels = (entries) => {
    const groupedItems = {}

    entries.forEach((entry) => {
      const slugLevels = entry.fields.slug
        .split('/')
        .filter((level) => level !== '')
        .map((level) => level.replace(/_/g, ' '))

      let currentGroup = groupedItems

      slugLevels.forEach((level, index) => {
        if (!currentGroup[level]) {
          currentGroup[level] = { items: [] }
        }
        if (index === slugLevels.length - 1) {
          currentGroup[level].url = entry.fields.slug || ''
          currentGroup[level].title = entry.frontmatter.title
          currentGroup[level].menuWeight = entry.frontmatter.menuWeight || 999
        } else {
          if (!currentGroup[level].items) {
            currentGroup[level].items = []
          }
          currentGroup = currentGroup[level].items
        }
      })
    })

    return convertToStructure(groupedItems)
  }

  const groupedItems = groupItemsBySlugLevels(nodes)
  const groupedItemsObject = {
    items: [],
  }
  groupedItemsObject['items'] = groupedItems

  return (
    <nav>
      <SideNav heading={heading} headingType={headingType} content={groupedItemsObject} showHeading={showHeading} />
    </nav>
  )
}

export default AllPagesMenu
