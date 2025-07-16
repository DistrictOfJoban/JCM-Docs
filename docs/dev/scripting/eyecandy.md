Decoration Object Scripting allows you to use [JavaScript](index.md) to control the rendering of a MTR Decoration Object.

## Concept
Your script will be associated as part of a Decoration Object model entry in the resource pack. When the model is assigned to a Decoration Object block, your script will start to execute.

During the execution, you may request for one or more model to be drawn onto the world, as well as requesting for sounds to be played.

### Global Environment
A script is evaluated & executed when a Decoration Object entry is loaded during the resource-pack loading phase.

Therefore, the same Decoration Object entry will use the same working environment (global variables and etc).

Code written in top-level space outside of functions will run when a resource package is loaded, and can be used to load resources such as models and textures. It is recommended to store resources (such as models, fonts and textures) in global variables, which do not need to be different for each decoration object, to avoid excessive memory usage caused by loading a copy of the same content for each block.  

## Implementation

### Registering scripts to Decoration Object
!!! note
    It is not possible to add scripting to a decoration object with the MTR 4 resource format at the moment.

You can add a model that uses JavaScript to control rendering by appending the following lines to your `decor_obj.json` file (Where `decor_obj.json` is the json file that contains the NTE decoration object):

``` json hl_lines="7"
{
  "nte_lcd": {
      "name": "NTE LCD Test",
      "translation": [ 0, 0, 0 ],
      "rotation": [ 0, 0, 0 ],
      "scale": [ 1, 1, 1 ],
      "scriptFiles": ["mtrsteamloco:eyecandies/js/nte_lcd_test/main.js"],
      "mirror": [ false, false, false ]
  }
}
```

In general, the parameters are the same as those required for regular decoration object json for NTE, except for the `scriptFiles` parameter.

If the `model` field is specified, the JavaScript-driven elements will be overlaid on top of the existing model. Otherwise, the appearance will be controlled solely by JavaScript.

`scriptFiles` is an array containing the locations of .js scripts. Multiple scripts can be specified.
`scriptTexts` allows you to directly write JS inside, but should only be used for simple variable declaration.

### Called Functions
Your script should include the following functions that JCM will call as needed:
``` js
function create(ctx, state, blockEntity) { ... }
function render(ctx, state, blockEntity) { ... }
function dispose(ctx, state, blockEntity) { ... }
```

|Functions|Description|
|:--------|:----------|
|`create`|It is called when a Decoration Object block is rendered for the first time and can be used to perform some initialization operations, for example, to create dynamic textures.|
|`render` |This function is called at-most once per frame. It is used to render contents. In practice however, the code is executed in a separate thread so as not to slow down FPS. If it takes too long to execute the code, it may be called once every few frames instead of every frame.|
|`dispose`|Called when the Decoration Object block goes out of sight. Can be used for things like releasing the dynamic textures to free up memory.|

JCM calls these functions with three parameters, each of which is described below.

|Parameter|Description|
|:--------|:----------|
|First (`ctx`)|Used to pass rendering actions to JCM. Type — [EyeCandyScriptContext](#eyecandyscriptcontext).|
|Second (`state`)|A JavaScript object associated with a single Decoration Object block.<br>The initial value is {}, and its content can be set arbitrarily to store what should be different for each block.|
|Third (`blockEntity`)|This returns the block entity of the placed Decoration Object block. Type — [EyecandyBlockEntity](#eyecandyblockentity)|

The following lists all the rendering control operations that can be performed and all the information that can be obtained about `blockEntity`.

### API Reference

#### Rendering Related

##### EyeCandyScriptContext
The following functions are called to **control rendering**. The functions for rendering models should be called each time render is called.

|Functions And Objects|Description|
|:--------------------|:----------|
|`EyeCandyScriptContext.drawModel(model: ScriptedModel, matrices: Matrices)`| Requests JCM to render a model loaded via [ModelManager](resources.md#model-loading).<br>`matrices` is the transformation of model placement. If passed null, the model will be placed in the center of the block without transformation.|
|`EyeCandyScriptContext.setDebugInfo(key: string, value: object)`|Output debugging information in the upper left corner of the screen. You need to enable **Debug mode** in JCM Settings to display it.<br>`key` is the name of the value<br>`value` is the content (`value` will be converted to string for display, except for GraphicsTexture which will display the entire texture image on the screen).|

#### Block Entity Related

##### EyecandyBlockEntity
|Functions And Objects|Description|
|:--------------------|:----------|
|`EyecandyBlockEntity getModelId(): string`|Return the model/prefab that is currently assigned to this block.<br>`null` if no model is selected.|
|`EyecandyBlockEntity getTranslateX(): number`|The value in **meters** on how much the Decoration Object is translated on the X-axis, configured via GUI.|
|`EyecandyBlockEntity getTranslateY(): number`|The value in **meters** on how much the Decoration Object is translated on the Y-axis, configured via GUI.|
|`EyecandyBlockEntity getTranslateZ(): number`|The value in **meters** on how much the Decoration Object is translated on the Z-axis, configured via GUI.|
|`EyecandyBlockEntity getRotateX(): number`|The value in **radians** on how much the Decoration Object is rotated on the X-axis, configured via GUI.|
|`EyecandyBlockEntity getRotateY(): number`|The value in **radians** on how much the Decoration Object is rotated on the Y-axis, configured via GUI.|
|`EyecandyBlockEntity getRotateZ(): number`|The value in **radians** on how much the Decoration Object is rotated on the Z-axis, configured via GUI.|
|`blockEntity.getFullBrightness(): boolean`|Return whether the Decoration Object is marked as "Full Light", configured via GUI.|