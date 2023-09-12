# RUN THIS FROM THE ROOT FOLDER
printf "\n\nCLEAN NPM COMPLETELY AND REINSTALL?!?!?!?!?!?!?g\n\n\n"
read -p "Are you sure? " -n 1 -r
echo    # (optional) move to a new line
if [[ ! $REPLY =~ ^[Yy]$ ]]
then

      printf "Good Call! Phew, that was  close one.\n"

    exit 1
fi

rm yarn.lock
rm -fr node_modules
rm -fr public
rm -fr .cache
yarn install
