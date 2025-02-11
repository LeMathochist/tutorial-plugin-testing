# Introduction

This starter plugin is a good place to get started when developing for Photoshop. It does not rely on any frameworks or build steps -- hence the name "Vanilla".

## Compatibility

Since Photoshop 

## Getting Started

Make sure Photoshop is up and running first. First, add the plugin to the "Developer Workspace" in the UXP Developer Tools (UDT) application.
  * If you selected "Create Plugin..." earlier, it will have already be there with the plugin ID and name you specified. 
  * Otherwise, click "Add Plugin" and select the `manifest.json` file in the corresponding plugin folder.

Click the ••• button next to the corresponding workspace entry, and click "Load". Switch over to Photoshop, and the plugin's panel will be running. 

## Documentation

* Read more about creating and debugging plugins using the UDT application [here](https://developer.adobe.com/photoshop/uxp/2022/guides/devtool/udt-walkthrough/). 

* We build on this starter template and show you how to [edit a document](https://developer.adobe.com/photoshop/uxp/2022/guides/getting-started/editing-the-document/) and [write a file](https://developer.adobe.com/photoshop/uxp/2022/guides/getting-started/writing-a-file/) using UXP. 

* [The Photoshop API Reference](https://developer.adobe.com/photoshop/uxp/2022/ps_reference/)

## How it Works

### `manifest.json`

This file dictates the plugin specifics needed to run

1. The `"app"` key dictates what Adobe program this applies to

2. The `"minVersion"` key dictates what the minimum version of the app named in `app` that the plugin will work with. 
    - **Will need to ascertain how to deploy a version for a `minVersion` less that working.** _probably by installing that version_

3. The `"main"` key is what file is loaded when the plugin is loaded by `app`. 
    - in the Tutorial, this is `index.html`,
    
### `index.html`    

This an HTML5 document that
    
    - defines the plugin's UI panels

    - uses a *subset* of the [HTML/CSS/JS Features](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/)
    
    - THere are also custom components that are available in the [Spectrum UXP Components](https://developer.adobe.com/photoshop/uxp/2022/uxp-api/reference-spectrum/) library that leverave the Spectrum Design System to make the plugin feel native to the Adobe application environment

### `main.js`

In this tutorial, this file defines a `click` listener on the 'Populate Layers' button, accessing the PS API to populate an `<sp-boddy>` tag that has the  `id = layers` name in it, providing the names of all the layers in the document, including the default Background.

The function `showLayerNames()` is defined to import the `Photoshop` API module when called. 

We can do this with various API modules. 

## Adjusting the Plugin: Add Opacity

**NB. During Development, if you started the plugin with `Load`, when you update `manifest.json`, we must fully reload the plugin in the UDT. If you instead start it with `Load & Watch`, UDT will watch the project folder for changes and automatically reload it with the changes** 

Viewing the [The Photoshop API Reference](https://developer.adobe.com/photoshop/uxp/2022/ps_reference/), and looking at the `Layer class`

## Adjusting the Plugin: Editing the PS Document

1. We remove the `sp-body` tags and rename the button to `Rename Layers`

2. Now we update `index.js` to add the function, `renmeLayerNames`, allowing write access to the document, by calling the Photoshop Core Module function `executeAsModal` to allow the function to be called outside of a Modal context. This could be important to know as there will likely be MANY such cases where the functions called must be called within a Modal in order to edit by JS Script.

