# Dockerfile
FROM mcr.microsoft.com/devcontainers/typescript-node:0-18

# Install wget if not already installed
RUN apt-get update && apt-get install -y wget

# Download .zshrc from remote address
# RUN sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
USER node
RUN wget https://raw.githubusercontent.com/Riverscapes/environment/master/nar-ys.zsh-theme -O ~/.oh-my-zsh/custom/themes/nar-ys.zsh-theme
RUN wget https://raw.githubusercontent.com/Riverscapes/environment/master/.aliases -O ~/.aliases
RUN wget https://raw.githubusercontent.com/Riverscapes/environment/master/.zshrc -O ~/.zshrc


# set memory to 6Gb so that Gatsby has a chance
ENV NODE_OPTIONS=--max-old-space-size=6144

