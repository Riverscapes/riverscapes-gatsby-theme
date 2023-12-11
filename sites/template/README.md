# Clean template site

## Getting started for development

1. Open up the `Docs.code-workspace` file in VSCode. This should open up the workspace and put you in the right place to run the site.
2. Make sure you are running node > v18 and have access to yarn at the command line:

```bash
> node --version
v18.16.0

> yarn --version
3.6.1
```

***The version of yarn isn't that important for content writers. We just run this command to make sure it's installed.***

3. Open up a terminal window in VSCode and run `yarn install` to install all the dependencies.
4. Run `yarn start` to start the dev server and develop locally.
5. If you think something is broken or weird you can run `yarn clean` to clear the cache and then `yarn start` again to see if that fixes it. We also have `yarn start:clean` that combines these two steps.


## Creating a new `./docs` site

1. Copy everything in this `./template` folder to a `./docs` subfolder in your desired repo. **NOTE: Make SURE to get all the dot-prefixed hidden files.** 
2. Open the `Docs.code-workspace` in the new location. For those of us with nvm installed (not windows users) This should put your terminal in the right place so that the `.nvmrc` file registers and the correct version of node is installed.
3. open `gatsby-config.ts` change:
  - `pathPrefix`: If this site is going to live at a subpath like `https://example.com/useless-site`, then change this to `/useless-site` **NOTE: Case matters**
  - `start_url`: Should match the `pathPrefix` if you have one

4. Run `yarn install` inside the `./docs` folder to install all the dependencies
5. RUn `yarn start` inside the `./docs` folder to start the dev server and develop locally.
6. Now move the 2 yml files in the root of your `.git` repo. They are living in the `.github/workflows` folder next to this README.md file but they will need to be moved to the root of whatever repo they end up in.
   1. `/.github/workflows/pages-publish.yml`
   2. `/.github/workflows/pages-validate.yml`
7. Once you push these files push the whole mess to Github and then go to the repo settings and enable Github Pages:
   1. Repo Settings
   2. Pages
   3. Build and deployment --> Source --> Select `Github Actions`
   4. Wait for it to build and deploy.

## Deploying to Former Jekyll `./docs` site

Delete the old Jekyll files:

- `Gemfile`
- `.gitignore` (The steps above include a Gatsby .gitignore)
- `_config.yml`


## Typical problems and content gotchas:

- Frontmatter Fields: 
    - All frontmatter is optional. You can have no frontmatter at all and the page will still work.
    - `title` is optional. It is used in conjunction with `banner`
    - `description` is optional. It is used in conjunction with `banner`
    - If you have `isHome` set to true (you can ommit this completely if it's false) Then you need to wrap all your content in a container tag.
    - If you want the banner at the top of the page set `banner:true`
    - `banner` and `isHome` do not work well together

```mdx
import { Container } from '@mui/material'

<Container maxWidth="xl">

## This is a title

Et voluptate anim nulla magna nisi reprehenderit id. Labore exercitation esse magna Lorem proident cillum nisi ipsum voluptate id labore est culpa officia. Quis ipsum id deserunt sit quis in adipisicing est mollit in consequat. Dolore laboris veniam Lorem reprehenderit commodo do laborum consequat consequat amet sit laborum nostrud nostrud. Nulla commodo enim occaecat minim. Dolor minim amet Lorem aute deserunt excepteur reprehenderit laborum exercitation.

Nulla cupidatat nulla sit reprehenderit laborum exercitation proident sunt duis tempor eiusmod commodo consequat officia. Aute occaecat ad et sunt do veniam irure irure excepteur minim enim eiusmod ullamco. Adipisicing officia exercitation sit et ex excepteur incididunt nulla incididunt non ullamco irure minim. Pariatur aliqua et fugiat culpa voluptate ea cupidatat incididunt ut pariatur commodo officia nostrud consectetur. Qui in duis sint sint labore eiusmod minim ut. Proident ut esse occaecat amet dolore aute tempor amet mollit. In cupidatat nisi deserunt laboris aute cupidatat laborum eu excepteur voluptate.

</Container>
```


- Menu links: 
    - **Broken menu links** (i.e. links that lead to a non-existent page) will not crash the site. They will just lead to a 404. On the 404 page you should be able to search for the correct url using the search form.
- Images: 
    - If you import images like `import WhatIsRiverscape from './what-is-riverscape.jpg'` then the image not being there WILL break the site. It will look like a red error in the console

```
  ModuleNotFoundError: Module not found: Error: Can't resolve './what-is-riverscape.jpg' in '/some/path/content/page'
```