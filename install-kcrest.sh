#!/bin/bash

# Clone this project to local. (Project's size is about 315M)
# It is recommended to clone only the latest commit to avoid downloading too much change
#   history in .git (I apologize for the large number of unskilled changes):
git clone --depth 1 https://github.com/boholder/KanColleREST.git

# Initialize and update submodule (Submodules size is about 2G)
git submodule init
git submodule update

# Install it. Use `--production` option to set `NODE_ENV` environment
#   variable to 'production', so all `devDependencies` in `package.json` file
#   will be ignored when running npm install.
npm install --production