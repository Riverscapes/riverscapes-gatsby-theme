# RUN THIS FROM THE ROOT FOLDER
printf "\n\nCLEAN NPM COMPLETELY AND REINSTALL?!?!?!?!?!?!?g\n\n\n"
read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then

      printf "Good Call! Phew, that was  close one.\n"

    exit 1
fi

echo "Removing yarn.lock file"
rm yarn.lock

echo "Removing all .cache folders"
find ./sites -type d -name '.cache' -exec rm -rf {} \;

echo "Removing all public folders"
find ./sites -type d -name 'public' -exec rm -rf {} \;

echo "Removing all dist folders"
rm -fr theme/dist

echo "Removing all node_modules folders"
rm -fr node_modules

echo "Reinstalling all node_modules"
yarn install
yarn build
