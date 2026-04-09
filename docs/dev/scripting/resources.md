# Resource Loading API

The Resource Loading API allows you to read assets within resource packs, such as json, images or fonts via scripting.


## Identifier (a.k.a. ResourceLocation)
Minecraft uses an **Identifier** to identify files in a resource pack, thus many functions only accept `Identifier` rather than strings.  
To create an `Identifier`, you can use the following functions:

|Functions|Description|
|:--------|:----------|
|`static Resources.id(idStr: String): Identifier`|Create an Identifier based on the string<br>e.g. `Resources.id(“mtr:path/absolute.js”)`.|
|`static Resources.idr(relPath: String): Identifier`|Create an Identifier based on the relative directory the currently executed script are located in<br>e.g. `Resources.idr(“relative.js”)`.<br>**Note: This function must be used during the script parsing stage. It cannot be used in runtime as by then there's no reference to the current script location anymore.**|

## Resources
This class allows developers to access file contents within resource packs, as well as some utilities functions for obtaining AWT resources such as Font.

### Resource Reading
|Functions|Description|
|:--------|:----------|
|`static Resources.read(id: Identifier): DataReader?`|Read an asset/file in the resource pack based on the Identifier location.<br>Returns a [DataReader](./data_reading.md#datareader) to read the file's content.<br>Null if the file does not exist.|
|`static Resources.exist(id: Identifier): boolean`|Returns whether the specified file exist in the resource pack.|

??? info "Show deprecated fields/functions"
    These functions are kept for backward compatibility, before the introduction of a unified [Data Reading](./data_reading.md) API.    
    You are advised to avoid using these functions for newly created scripts.

    |Functions|Description|
    |:--------|:----------|
    |`static Resources.manager(): null`|Returns Minecraft's native resource manager in NTE.<br>Since it is not exposed in Minecraft-Mappings (MTR 4's cross-version framework), this now returns null. Other functions that require `Resources.manager()` can accept null without any issues.|
    |`static Resources.readString(id: Identifier): String?`|Reads the contents of a resource file as a string.<br>Null if the file reading failed.|
    |`static Resources.readBufferedImage(id: Identifier): BufferedImage?`|Loads an image file as an AWT BufferedImage.<br>Null if the file reading failed.|
    |`static Resources.readFont(id: Identifier): Font?`|Load a custom TTF or OTF font file as an AWT Font.<br>Null if the file reading failed.<br> *Note: Due to the way Java and Minecraft Resource Pack works, new temporary font files are generated on your disk every time you call this function.<br>If you find yourself running out of disk space during the development, you can free up disk space by deleting files starting with `+~JF` on your system temp directory, or restart your Minecraft/Computer.*|

### AWT related
[AWT is a window toolkit for Java](https://en.wikipedia.org/wiki/Abstract_Window_Toolkit). While not used directly in Minecraft, many of it's classes are still in-use (Such as BufferedImage/AWT Graphics) for cross-platform graphics processing/canvas. This is also used to power the [Graphics API](./dynamic_textures.md).

Here, you may obtain instances that may be useful for drawing with the Graphics API/AWT.

|Functions|Description|
|:--------|:----------|
|`static Resources.getSystemFont(name: String): Font`|Get a system or MTR built-in AWT font.<br>`name` can be one of the following:<br>- **Noto Serif**: MTR's built-in CJK serif font (similar to Song), identical on all systems.<br>- **Noto Sans Semibold**: MTR's built-in sans-serif font (Similar to Myriad Pro). <br>- **Noto Sans CJK TC Medium**: JCM's built-in sans-serif CJK font (similar to Helvetica). Identical on all systems. Identical on all systems.<br>- **Noto Sans**: [Deprecated] Alias of Noto Sans CJK TC Medium (above font). For NTE compatibility only! <br>- **Serif**: A serif font selected by AWT that is installed on this computer. Varies between devices.<br>- **SansSerif**: A sans serif font selected by AWT that is installed on this computer. Varies between devices.<br>- **Monospaced**: A monospaced font selected by AWT that is installed on this computer. Varies between devices|
|`static Resources.getFontRenderContext(): FontRenderContext`|Obtain an [AWT FontRenderContext](https://docs.oracle.com/javase/8/docs/api/java/awt/font/FontRenderContext.html) for dimension measurement of text.|
|`static Resources.ensureStrFonts(text: String, primaryFont: Font, fallbackFonts: Font...): AttributedString`|Get an instance of AttributedString with the corresponding text and font set.<br>`primaryFont` is the default font used. If the primary font cannot render a certain character, it will iterate over `fallbackFonts` (If there are any) and check whether the font is capable of rendering the characters. If not, it will iterate through the fonts available in the user's computer until a suitable one can be found.<br><br>This is useful to prevent Tofu/Square when rendering versatile scripts (Such as Arabic on a Latin font).|