NTE/JCM provides several methods for controlling the loading and retrieval of resources within resource packs in JavaScript scripts.

Code written in the top-level space outside of functions will be executed when a resource pack is loaded and can be used to initialize resources such as models, textures, etc. Resources that should not be different for each train (such as models and such) are recommended to be stored in global variables to avoid excessive memory usage when loading a copy of the same content for each train.

## Identifier (a.k.a ResourceLocation)
Minecraft uses an **Identifier** to identify files in a resource pack, thus many functions only accept `Identifier` rather than strings.  
To create an `Identifier`, you can use the following functions:

|Functions|Description|
|:--------|:----------|
|`static Resources.id(idStr: string): Identifier`|Create an Identifier based on the string<br>e.g. `Resources.id(“mtr:path/absolute.js”)`.|
|`static Resources.idr(relPath: string): Identifier`|Create an Identifier based on the relative directory the currently executed script are located in<br>e.g. `Resources.idr(“relative.js”)`.|

## Model Loading
!!! info
    Please note that the current API is much more high level and does not offer fine-grained control like in MTR 3/NTE.

|Functions|Description|
|:--------|:----------|
|`static ModelManager.loadModel(id: Identifier, flipV: boolean): Model`|Load an OBJ/bbmodel model from a path and upload to the GPU.<br>Set `flipV` to true if your texture is rendered incorrectly.|

## Loading AWT Resources
These functions load the resources used to draw dynamic textures via the Java AWT.

|Functions|Description|
|:--------|:----------|
|`static Resources.getSystemFont(name: string): Font`|Get a system or MTR built-in font, one of the following:<br>- **Noto Serif**: MTR's built-in serif font (similar to Song), identical on all systems.<br>- **Noto Sans**: NTE Built-in sans serif font (similar to Helvetica). Identical on all systems. **[Not available in JCM for now]**<br>- **Serif**: A serif font selected by AWT that is installed on this computer. May be different on different devices.<br>- **SansSerif**: A sans serif font selected by AWT that is installed on this computer. May be different on different devices.<br>- **Monospaced**: A monospaced font selected by AWT that is installed on this computer. May be different on different devices.|
|`static Resources.readFont(path: Identifier): Font`|Load a custom TTF or OTF font file as an AWT Font.<br> *Note: Due to the way Java and Minecraft Resource Pack works, new temporary font files are generated on your disk every time you call this function.<br>If you find yourself running out of disk space during the development, you can free up disk space by deleting files starting with `+~JF` on your system temp directory, or restart your Minecraft/Computer.*|
|`static Resources.readBufferedImage(path: Identifier): BufferedImage`|Loads an image file as an AWT BufferedImage.|
|`static Resources.getFontRenderContext(): FontRenderContext`|Get an AWT FontRenderContext.|

## Reading resource files
|Functions|Description|
|:--------|:----------|
|`static Resources.readString(location: Identifier): string?`|Reads the contents of a resource file as a string. Returns null if reading fails.|
