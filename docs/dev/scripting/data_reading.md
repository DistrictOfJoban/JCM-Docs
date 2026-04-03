# DataReader

The [Resource](./resources.md), [Files](./files.md) and [Networking API](./networking.md) allows reading of data from various sources.  
(From Resource Packs, on-disk file, and data transmitted via HTTP respectively).

One thing they have in common is that these data are nothing but a sequence of bytes. (A file is just a sequence of bytes, a Resource Pack file is just a sequence of bytes, Data transmitted from the network is also just a sequence of bytes).

To turn it into something useful, we have to decode these data depending on the result we want to achieve, which is why all these API returns a [DataReader](#datareader), a common class that allows script developers to decode these bytes into various formats. (e.g. Turn it into String/BufferedImage)

## DataReader
A DataReader represents a sequence of bytes data.

Multiple functions are provided allowing you to decode these type of bytes data (Such as converting it into String/BufferedImage):

|Functions|Description|
|:--------|:----------|
|`DataReader.asString(): String?`|Return the file's content as plain text, in UTF-8 encoding.<br>Null if the decoding failed, alongside a console error.|
|`DataReader.asBufferedImage(): BufferImage?`|Return the file's content as a BufferedImage.<br>Null if the decoding failed, alongside a console error.|
|`DataReader.asFont(): Font?`|Load a custom TTF or OTF font file as an AWT Font.<br>Null if the decoding failed, alongside a console error.<br> *Note: Due to the way Java and Minecraft Resource Pack works, new temporary font files are generated on your disk every time you call this function.<br>If you find yourself running out of disk space during the development, you can free up disk space by deleting files starting with `+~JF` on your system temp directory, or restart your Minecraft/Computer.*|
|`DataReader.asByteArray(): byte[]`|Return the file's content as a raw byte array.|
|`DataReader.openInputStream(callback: Consumer<InputStream>): void`|Opens the underlying `InputStream` and pass it to `callback`. The closing of InputStream is automatically done after executing your callback.|
|`DataReader.asInputStream(): InputStream`|Return the underlying `InputStream`.<br>**Note: Remember to close the InputStream after use with .close()**|

## Example
``` js
/* Files API example (String) */
let mtrConfigFile = Files.read("config", "mtr.json"); // DataReader, or null if the file doesn't exist
if(mtrConfigFile != null) {
    let mtrConfigStr = mtrConfigFile.asString(); // Invoke DataReader.asString() to read it as the string
    let mtrConfig = JSON.parse(mtrConfigStr);
    // ...
}

/* Resources API example (Image) */
let imgAData = Resources.read(Resources.idr("a.png")); // DataReader, or null if the file doesn't exist
if(imgAData != null) {
    let imgA = imgAData.asBufferedImage(); // Invoke DataReader.asBufferedImage() to read it as a BufferedImage
}

/* Network API example (Font) */
/* Note: For illustration only, unless you have really good reason, you shouldn't need to fetch font over the internet... */
let resp = Networking.fetch("https://example.com/a.ttf");
if(resp.ok()) {
    let data = resp.getData(); // DataReader
    let font = data.asFont(); // Invoke DataReader.asFont() to read it as an AWT font
    // ...
}
```