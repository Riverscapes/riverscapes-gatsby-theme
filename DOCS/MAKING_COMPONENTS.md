# How to make a new content component

From time to time it may be necessary to create a new component if there is content pattern that can't be accomodated by our current set of components.

## Do I need a new component?

1. Can I get what I want combining the building blocks I already have?
2. Is this something I will use in more than one place?
3. Is the idea generic enough be implemented with few enough parameters that it is still useful?
4. What are the edge cases for using this?


## How to make a new component

1. Create a component in the `/theme/src/components/custom` folder. It should be a `.tsx` file. Youc an copy the template here: `/theme/src/components/custom/TEMPLATE.tsx`

```tsx
/**
 * This is a TEMPLATE Component. DO NOT USE IT OR LINK IT UP
 */

import React from 'react'
import { Box } from '@mui/material'

interface TEMPLATEProps extends React.PropsWithChildren {
  propA?: string
  propB?: React.ReactNode | React.ReactNode[]
}

export const TEMPLATE: React.FC<TEMPLATEProps> = ({ propA, propB, children, ...props }) => {
  // Logic or hooks here

  return <Box>{children}</Box>
}

```

2. Make sure to replace `TEMPLATE` with a good name. Then build the component the way you normally would.
3. When you're happy go to `/theme/src/components/MDXRender.tsx` and import it for use in the shortcodes. This will make the component usable inside the markdown files without needing to import it:

Note that you can give it a different name here if you want to use a different name in the markdown files.

```typescript
  import { MyComponent } from './custom/MyComponent'

  // ...src/components/MDXRender.tsx

  const shortcodes: Record<string, any> = {
    // ...other shortcodes
    CoolName: MyComponent,
  }

  // ...src/components/MDXRender.tsx
```

4. Create an `.mdx` file in the `/sites/devsite/content/page/TESTING/crazybutton.mdx` and put in all the ways you expect this component to be used. Try to be exhaustive.

```mdx
This is a crazy button DEMO PAGE

<CoolName title="Crazy Button"/>

this is it inline <CoolName /> and this is it again <CoolName />.

<CoolName>
  Here it has some children
</CoolName>

<CoolName propA="thing" />

```

5. Run `yarn start` in the `/sites/devsite` folder to see the demo site. Now you can develop live by loading your markdown file in the browser and seeing how it looks. 

6. When it works submit the component on a git branch and open a PR. We'll review it and merge it in.
7. Any site that needs to use this will need to get this new version of the theme. You can do this by running `yarn upgrade @riverscapes/gatsby-theme` in the site folder.