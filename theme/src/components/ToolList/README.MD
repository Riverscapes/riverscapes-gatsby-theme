# Tool List Component

## What is it
The ToolList component is meant to display a series of tools in an easily viewable and filterable manner.

## How to set up
To use this component, there is some setup required.

The bare minimum is to create and populate the `tools.json` file that contains the tools to display. This file must be located at `content/data/tools.json`, ie in a folder called "data" adjacent to the main "page" folder.

The contents of the JSON file should be in the same format as the following example.

```json
[
  {
    "toolId": "toola",
    "name": "Tool A",
    "description": "This is Tool A",
    "url": "https://www.example.com",
    "purpose": ["Purpose A"],
    "compliance": ["Compliance A"],
    "interface": ["Interface A"],
    "resolution": ["Resolution A"]
  },
  {
    "toolId": "toolb",
    "name": "Tool B",
    "description": "This is Tool B",
    "url": "https://google.com",
    "purpose": ["Purpose A", "Purpose B"],
    "compliance": ["Compliance A"],
    "interface": ["Interface A", "Interface B"],
    "resolution": ["Resolution A", "Resolution B"]
  },
  ...
]
```
Where the contents are replaced with the details of any tools you wish to display.

This is the only mandatory prerequiste to using the component. You may additionally add images for some or all of the tools.

### How to add images for tools
All tool images must be in the folder `static/images/tools`. To match an image to a tool, rename the image so that it is the same as the ID of the tool.

So, if you wanted to add an image for Tool A in the example JSON above, you would name the image `toola.jpg` (noting that `"toolId": "toola"` for Tool A).

You may additionally want to create an image called `default.jpg` in the same location. If you do, all tools that cannot find a corresponding image will use this as their default image.

## Using the component in Markdown

You can use this component in your MDX file as follows:
```md
<ToolListContainer name={"Cool Tools"} initialFilters={{
  purpose: ["Purpose B"],
  compliance: [],
  interface: ["Interface A"],
  resolution: []
}}/>
```

`name` (REQUIRED) is the section title that is displayed at the top of the component.

`intialFilters` (optional) is an object that selects certain filters to be active by default. If you do not include this, there will simply be no filters active by default.

**Important!** Take note that the component you use is `ToolListContainer`, NOT `ToolList`. The container reads the data from your `tools.json` and passes them to an internal `ToolList`. You should only use `ToolList` directly if for some reason (eg. testing) you do not want to set up a `tools.json` file.
