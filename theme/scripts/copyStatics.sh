#!/bin/bash

# Copy static files to the statics folder
# Use the find command to search for image files in the source directory
# and copy them to the destination directory
find "./src" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" \) -exec sh -c '
    src="$1"
    dst="$2${src#$3}"
    echo "Copying $src to $dst"
    mkdir -p "$(dirname "$dst")"
    cp "$src" "$dst"
' sh {} "./dist" "./src" \;