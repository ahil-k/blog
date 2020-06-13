#!/bin/sh

# If a command fails then the deploy stops
set -e

printf "\033[0;32mDeploying site to GitHub...\033[0m\n"

# Build the project.
hugo # if using a theme, replace with `hugo -t <YOURTHEME>`

# Go To Public folder
cd public

# Add changes to git.
git add .

# Commit changes.
msg="site deployment @ $(date +'%Y-%m-%d %H:%M:%S %z')"
if [ -n "$*" ]; then
	msg="$*"
fi
git commit -m "$msg"

# Push source and build repos.
git push origin master