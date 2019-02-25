# Image Renamer

This is a simple tool that I wrote to help my wife to work around shortcomings of the Mac finder. She wants to view images in the order in which they were taken, not in the order in which they were last modified or created.

The EXIF data contains the image creation time, but it's not available for sorting in Finder.

## Renaming

The script will rename files like so:

```
_MG_1534.jpg   =>   2018_12_12_1534.jpg
_MG_1535.jpg   =>   2018_12_12_1535.jpg
```

## Usage

To make things easier, I've made a Docker container in which all images (non-recursively) in the `/images` directory will be renamed.

```
docker container run --rm -tiv /path/to/images:/images mikesir87/image-renamer
```

## Installation

If on a Mac, unzip the `RenameImages.workflow.zip` archive and double-click on the "Rename Images" workflow. You will be prompted to install the custom action. Once you do so, you can simply right-click on any directory and rename!

The script being used is located in `workflow.sh`
