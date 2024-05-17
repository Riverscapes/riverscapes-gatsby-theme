import React from 'react';
import SideNav from './SideNav'

interface AllPagesMenuProps {
  nodes: Node[];
  heading?: string;
  headingType?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  showHeading?: boolean;
}

const AllPagesMenu: React.FC<AllPagesMenuProps> = ({
  nodes,
  heading = 'All pages',
  headingType = 'h2',
  showHeading = false,
}) => {
  // Function to group entries based on slug levels and convert to new object structure
  const convertToStructure = (entries) => {
    return Object.keys(entries).map((key) => {
      const entry = entries[key];
      const newItem = {
        title: entry.title || key,
        url: entry.url || '',
        items: []
      };
      if (entry.items) {
        newItem.items = convertToStructure(entry.items);
      }
      return newItem;
    });
  };

  // Function to group entries based on slug levels
  const groupItemsBySlugLevels = (entries) => {
    const groupedItems = {};

    entries.forEach((entry) => {
      const slugLevels = entry.fields.slug.split('/').filter((level) => level !== '');
      let currentGroup = groupedItems;

      slugLevels.forEach((level, index) => {
        if (!currentGroup[level]) {
          currentGroup[level] = {};
        }
        if (index === slugLevels.length - 1) {
          currentGroup[level].url = entry.fields.slug || "";
          currentGroup[level].title = entry.frontmatter.title;
        } else {
          if (!currentGroup[level].items) {
            currentGroup[level].items = {};
          }
          currentGroup = currentGroup[level].items;
        }
      });
    });

    return convertToStructure(groupedItems);
  };

  const groupedItems = groupItemsBySlugLevels(nodes);
  let groupedItemsObject = {}
  groupedItemsObject['items'] = groupedItems

  return (
    <nav>
      <SideNav heading={heading} headingType={headingType} content={groupedItemsObject} showHeading={showHeading} />
    </nav>
  );
};

export default AllPagesMenu;
