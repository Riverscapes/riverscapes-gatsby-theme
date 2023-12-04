# Clean template site

## Creating a new `./docs` site

1. Copy everything in this `./tempalte` folder to a `./docs` subfolder in your desired repo 
2. open `gatsby-config.ts` change
  - `pathPrefix`: If this site is going to live at a subpath like `https://example.com/useless-site`, then change this to `/useless-site`
  - `start_url`: Should match the `pathPrefix` if you have one
3. Now move the 2 yml files in the root of your `.git` repo. They are living in the `.github/workflows` folder next to this README.md file but they will need to be moved to the root of whatever repo they end up in.
   1. `/.github/workflows/pages-publish.yml`
   2. `/.github/workflows/pages-validate.yml`
4. Once you push these files push the whole mess to Github and then go to the repo settings and enable Github Pages:
   1. Repo Settings
   2. Pages
   3. Build and deployment --> Source --> Select `Github Actions`
   4. Wait for it to build and deploy.