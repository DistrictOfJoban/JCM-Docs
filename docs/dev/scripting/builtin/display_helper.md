# Display Helper

This is a built-in script which makes it easier to add digital display screens onto trains/eyecandy.

## DisplayHelper
To import this script, insert `include(Resources.id("mtrsteamloco:scripts/display_helper.js"));` at the top of your script.

|Functions|Description|
|:--------|:----------|
|`new DisplayHelper(cfg: Object)`|Creates a new DisplayHelper based on the configuration object|
|`DisplayHelper.create(): DisplayHelper`|This returns a new *instance* of DisplayHelper, with the associated textures already binded for you.<br>You should call this in the `create()` function and store it in the `state` variable for re-using in `render()`.|
|`DisplayHelper.close(): void`|This release the associated resource (Such as texture), freeing up memory.<br>You should call this in the `dispose()` function to prevent memory leak/memory accumulating.|
|`DisplayHelper.graphics(): Graphics2D`|This returns an AWT Graphics2D for the full texture defined in the configuration object.|
|`DisplayHelper.graphicsFor(slotName: string): Graphics2D`|This returns an AWT Graphics2D for the full texture defined in the configuration object.<br>This applies the appropriate translation in Graphics2D so that it is ready to be used with the corresponding slot.|
|`DisplayHelper.upload(): void`|Upload the texture to the GPU. Call this if your texture has been updated and you want to display the updated content.|
|`DisplayHelper.model: DisplayHelperCompat`|**[Deprecated!]** This used to be a `ModelCluster` in NTE.<br>Due to design limitations in MTR 4, this is changed to a special type<br>called `DisplayHelperCompat`, which can be passed to `ctx.drawModel()` and related NTE methods to achieve full backward compatibility.|
|`DisplayHelper.texture: GraphicsTexture`|Returns the [GraphicsTexture](../dynamic_textures.md#graphicstexture) used by this DisplayHelper.|
|`DisplayHelper.drawCalls(): List<DrawCall>`|Returns a list of draw calls to be passed into `RenderManager#queue()` in order to render the DisplayHelper screens.|

### Example Script

```js linenums="1"
include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

let slotCfg = {
  "version": 1,
  "texSize": [2048, 1024],
  "slots": [
    {
      "name": "lcd_north",
      "texArea": [0, 0, 2048, 274],
      "pos": [
        [[-0.59, 2.125, -1.75], [-0.755, 2.03, -1.75], [-0.755, 2.03, -3.25], [-0.59, 2.125, -3.25]]
      ],
      "offsets": [[0, 0, -5], [0, 0, 0], [0, 0, 5], [0, 0, 10]]
    },
    {
      "name": "lcd_south",
      "texArea": [0, 512, 2048, 274],
      "pos": [
        [[0.59, 2.125, -3.25], [0.755, 2.03, -3.25], [0.755, 2.03, -1.75], [0.59, 2.125, -1.75]]
      ],
      "offsets": [[0, 0, -5], [0, 0, 0], [0, 0, 5], [0, 0, 10]]
    }
  ]
};
var dhBase = new DisplayHelper(slotCfg);

function create(ctx, state, eyecandy) {
  state.pisRateLimit = new RateLimit(0.05);
  state.dh = dhBase.create();
}

function dispose(ctx, state, eyecandy) {
  state.dh.close();
}

function render(ctx, state, eyecandy) {
  if (state.pisRateLimit.shouldUpdate()) {
    let g;

    g = state.dh.graphicsFor("lcd_north");
    g.setColor(Color.RED);
    g.fillRect(0, 0, 2048, 274);
    // ...

    g = state.dh.graphicsFor("lcd_south");
    g.setColor(Color.BLUE);
    g.fillRect(0, 0, 2048, 274);
    // ...

    state.dh.upload();
  }

  for(let drawCall of state.dh.drawCalls()) {
    ctx.renderManager().queue(drawCall);
  }
}
```

### Configuration Object
The dynamic display settings are specified using an array. This allows for greater flexibility in the settings, making it easier to add to existing vehicle models, and it's also similar to RTM's display settings.

```js linenums="1"
{
  "version": 1,
  "texSize": [2048, 1024],
  "slots": [
    {
      "name": "lcd_north",
      "texArea": [0, 0, 2048, 274],
      "pos": [
        [[-0.59, 2.125, -1.75], [-0.755, 2.03, -1.75], [-0.755, 2.03, -3.25], [-0.59, 2.125, -3.25]]
      ],
      "offsets": [[0, 0, -5], [0, 0, 0], [0, 0, 5], [0, 0, 10]]
    },
    {
      "name": "lcd_south",
      "texArea": [0, 512, 2048, 274],
      "pos": [
        [[0.59, 2.125, -3.25], [0.755, 2.03, -3.25], [0.755, 2.03, -1.75], [0.59, 2.125, -1.75]]
      ],
      "offsets": [[0, 0, -5], [0, 0, 0], [0, 0, 5], [0, 0, 10]]
    }
  ]
}
```

#### Result of the above example
This configuration sets two display screen positions. Each display screen position uses a different display content, which can be displayed on multiple screens in the `pos` parameter below, but all screens can only display the same content.

The content of all screens is drawn together on a single generated dynamic texture.

- `texSize` specifies the dimensions (width, height) of this dynamic texture.
- `name` is the name of this position.
- `texArea` specifies which part of the final dynamic texture is used as the display content for this screen, defined by its X, Y, width, and height.
- `pos` is a three-level array (pay attention to the number and distribution of parentheses to avoid errors) specifying the position of each screen. Each screen can only be rectangular, and for each screen, four XYZ coordinates are given in the order of top-left, bottom-left, bottom-right, and top-right relative to its front. The origin of the coordinates is the train center, at floor height, with positive X pointing left, positive Y pointing up, and positive Z pointing backward.
- `offsets` is a two-level array used to duplicate the display screen specified by `pos`, saving space in scenes such as flashing lights above a door. Specify the XYZ offsets for each copy to be made. If no offsets are specified, the copying will not be performed.

### Reference
[https://www.zbx1425.cn/nautilus/mtr-nte/js-display-helper.html](https://www.zbx1425.cn/nautilus/mtr-nte/js-display-helper.html)