NTE provides a GraphicsTexture class to use JS-controlled textures with dynamic content on models for LCD displays, blinking indicators, scrolling text LED, and so on.

## GraphicsTexture
|             Functions And Objects              | Description |
| :--------------------------------------------- | :---------- |
| `new GraphicsTexture(width: int, height: int)` | To create a dynamic texture, you need to specify the width and height.<br>If you plan to draw contents related to per-block/per-train, you should use this in the  `create` function and store in `state`.|
| `GraphicsTexture.close(): void` | Releases the memory used by this texture. It cannot be used after that.<br>If it was created in the `create` train function, it must be deleted in the `dispose` function, otherwise it will continue to occupy memory, thus creating a memory leak.|
|`GraphicsTexture.bufferedImage: BufferedImage`|Java AWT's BufferedImage for use as a temporary canvas.|
|`GraphicsTexture.graphics: Graphics2D`|This is the Java AWT's Graphics for this texture. You can call different functions to draw on the bufferedImage.|
|`GraphicsTexture.upload(): void`|Loads the contents of bufferedImage into video memory and immediately displays it on the model.<br>This operation can significantly reduce FPS. It is recommended to use it in combination with `RateLimit` to reduce the frequency of texture updates.<br><br>For example, the screen can be updated only 10 times per second, and it may not be updated at far distances, in some cases the information may not be updated at all.|
|`GraphicsTexture.identifier: Identifier`|The identifier of the virtual resource of this dynamic texture. You can use this to replace the model texture/draw a texture with this id.|

## AWT-related classes
You can use the importPackage function from Rhino to satisfy the java.awt dependency when using AWT classes.

You can find some AWT tutorials on the Internet or look at the JavaDoc to see what drawing capabilities are available in Graphics2D:

- JavaDoc: [Graphics](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics.html) (is a parent class for Graphics2D, which means everything in it can be used in GraphicsTexture.graphics as well)
- JavaDoc: [Graphics2D](https://docs.oracle.com/javase/8/docs/api/java/awt/Graphics2D.html)

The following functions can be used:

- `static Color.decode`, `Color.WHITE…`, `new Color`
- `Graphics.setColor`, `Graphics.setFont`, `Graphics.setStroke(new BasicStroke(…))`
- `Graphics.drawRect`, `Graphics.fillRect`, `Graphics.drawRoundRect`, `Graphics.fillRoundRect`
- `Graphics.drawImage`, `Graphics.drawString`, `Font.deriveFont`
- `Graphics.setPaint(new GradientPaint(…))`, `Graphics.fill(new Rectangle(…))`
- `Graphics.getTransform`, `Graphics.transform`, `Graphics.setTransform`, `AffineTransform.getTranslateInstance`, `AffineTransform.getRotateInstance`
- `Graphics.setClip`
- `Graphics.getComposite`, `Graphics.setComposite(AlphaComposite.getInstance(AlphaComposite.SRC_OVER, …))`, `Graphics.setComposite`

## Referenced sources
- [https://wiki.minecrafttransitrailway.com/mtr_addon:nte:js:dynamic_texture](https://wiki.minecrafttransitrailway.com/mtr_addon:nte:js:dynamic_texture)
