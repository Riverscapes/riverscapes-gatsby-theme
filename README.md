# Riverscape Gatsby Theme

* The demo site can be seen HERE: <https://riverscapes.github.io/riverscapes-gatsby-theme/>
* The Feature explainer and styleguide is here: <https://riverscapes.github.io/riverscapes-gatsby-theme/demo/>

#### This site has a few different packages:

* `/theme` `@riverscapes/gatsby-theme` - The theme that is used to build the site.
* `/sites/template` `@riverscapes/developer-site` - Working copy of the gatsby site to help debug problems and test new versions
* `/sites/template` `@riverscapes/template-clean` - Clean template to use when creating new sites

## Developing

### Starting out

1. Clone the repo
2. Open the `GatsbyDeveloper.code-workspace` file in VSCode
3. In a terminal run `yarn install` at the root of the repo
4. Run `yarn build` to create the `dist` folder and copy the files over

### Themeing / CSS Work

For most cases you shouldn't need to do node debugging.

1. In one terminal window run `yarn watch` in the root folder. This will compile typescript react components as you type.
2. In a separate terminal window `yarn start`. This will start the gatsby developer site (`@riverscapes/developer-site`) in development mode. It will watch for changes and reload the browser automatically.
3. (Optional) In VSCode navigate to the "Run and Debug" sidebar and select "Debug Using Chrome". This will allow you to set breakpoints in the browser and debug the react components.

### Testing [pathPrefixes](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/) locally

If you're planning to use a [pathPrefix](https://www.gatsbyjs.com/docs/how-to/previews-deploys-hosting/path-prefix/) in order to run Gatsby in a domain's subfolder you may notice some broken links and need to test it locally. 

1. Make sure `pathPrefix` is set correctly in `gatsby-config.js` in the site you're testing.
2. Run `yarn build` in the root folder. This command includes `--prefix-paths` which is required for the pathPrefix to work.
3. Run `yarn serve` in the root folder. This will serve the site locally at `http://localhost:9000/MYPREFIX` and you can test the links.

### Advanced developement

In some very rare cases there will be an issue with `gatsby-node.js` or some `graphql` problem that you need to debug at the node level. In this case you will need to run "Debug Gatsby Node API" from the "Run and Debug" sidebar. This will start the gatsby site in debug mode with NODE breakpoints enabled and allow you to set breakpoints in the node code. THEMEING AND REACT WORK SHOULD NOT NEED THIS.

### Publishing to NPM

1. `yarn workspace @riverscapes/gatsby-theme version patch` (You can use patch or minor or major as appropriate). Also you can just edit the `theme/package.json` version number manually.
2. Git commit and push all package.json changes
3. `yarn npm login` - Log into NPM
4. `yarn workspace @riverscapes/gatsby-theme npm publish`

### Notes

- If you add or change the location of theme images (just images in the `/theme/src/images` folder) you will need to run `yarn build` again to copy them into the `dist` folder. Any other image in the `sites` folder should build automatically