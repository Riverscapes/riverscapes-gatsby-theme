# Riverscape Website

## Content

### MDX

- /content/page/ - All pages
- /content/utilities/ - Footer content

All MDX pages must have a Heading2 text at the top. This is used in code that loops (maps) over the content pages.

To add cards to the bottom of an MDX page, simply add subfolders into the folder containing the parent MDX file. Copy the format from the existing subpages.

Markdown images in MDX files should be placed directly in the same folder as the MDX page that uses them.

### Image
- /src/images

## Build
Develop: `gatsby develop`

Production build: `gatsby build` 
- /public folder

## Custom components for MDX use
### Button 
- MUI contained button with Gatsby Link integration, use for internal links
    - attribute:
        - to: *string* - page link
        - children: *node* - button content

### Card
- MUI card with image, with Gatsby Link integration
    - attribute:
        - to: *string* - page link
        - img: *object* - image object
        - imgAlt: *string* - image alt text
        - heading: *string* - card headline
        - headingVariant: *oneOf h1, h2, h3, h4, h5* - headline variant using MUI typography
        - children: *node* - Card content

### Hero
- Homepage hero component
    - attribute:
        - image: *object* - image object
        - children: *node* *array of node* - Content

### HomepageCard
- Homepage media and text
- Three use cases:
    1. Stats media and text
    2. Quote media and text
    3. Image media and text
- Consists of [HomepageCardContent](#Homepagecardcontent) and [HomepageCardHighlight](#homepagecardhighlight)
- Attributes:
    - children: *node* - Content

#### HomepageCardContent
- Use exclusively inside [HomepageCard](#homepagecard)
- Left side content region
- attributes:
    - background: *oneOf blue, white* - Different background option
        - *blue* for blue texture background with white text
        - *white* for white background with black text
    - children: *node* or *array node* - content


#### HomepageCardHighlight
- Use exclusively inside [HomepageCard](#homepagecard)
- Right side content region
- attribute:
    - type: *oneOf image, text* - Options for image or text
        - *text* for Statistics or Quote
        - *image* for image
    - alignment: *oneOf center, left* - Text alignment, default left
    - children: *node* or *array node* - children

##### HomepageCardStat
- Use exclusively inside [HomepageCardHighlight](#homepagecardcontent)
- Use for displaying stats in large text and small size label
- attribute: 
    - value: *string* - number
    - label: *string* - label

## MUI components for MDX use
### [Container](https://mui.com/material-ui/react-container/)
- Use for defining region
- maxWidth="xl" for max content region width
### [Grid](https://mui.com/material-ui/react-grid/)

## Menu / Navigation

Header menu and footer link menu are managed through `menuLinks` in [`gatsby-config.js`](gatsby-config.js)

## Footer

Footer content is updated through [`footer.json`](content/utilities/footer.json) in `content/utilities`

Note the footer gets the top level menu links from [`gatsby-config.js`](gatsby-config.js). It doesn't pull the second or third menu levels.

# More Resources

- [Gatsby Project Structure](https://www.gatsbyjs.com/docs/reference/gatsby-project-structure/)
- [How to populate text using MUI typography](https://mui.com/material-ui/api/typography/)
- how to add more cards to a page - card and MUI grid, container for max region width
- how to update the main nav - identified in menu readme
- how to update the footer info - menu above and footer readme.
- Make sure you have the MDX extension for Visual Studio Code installed for linting.