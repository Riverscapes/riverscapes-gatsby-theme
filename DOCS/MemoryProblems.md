## Memory Problems

```ts
{
    flags: {
    // DEV_SSR fixes a problem where `gatsby develop` is overwhelming the system memory
    // It's related to this issue: https://github.com/gatsbyjs/gatsby/issues/36899
    // More about DEV_SSR: https://www.gatsbyjs.com/docs/debugging-html-builds/#ssr-during-gatsby-develop
    // Eventually this needs to go away but likely not until the Gatsby webpack version is updated
    DEV_SSR: false,
  },
}
```

```bash
npx process-top ../../node_modules/.bin/gatsby develop | tee process-top.log
```


```bash
GATSBY_CPU_COUNT=1 gatsby build
```

```bash
NODE_OPTIONS=--max-old-space-size=4096 gatsby build
```



Questions:

Are Gifs considered at all?

