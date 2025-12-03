# Eyecandy Scripting

Eyecandy Scripting allows you to use [JavaScript](../../index.md) to control the rendering of a MTR Decoration Object.

## Concept
Your script will be associated as part of a Decoration Object model entry in the resource pack. When the model is assigned to a Decoration Object block, your script will start to execute.

During the execution, you may request for one or more model to be drawn onto the world, as well as requesting for sounds to be played.

### Global Environment
A script is evaluated & executed when a Decoration Object entry is loaded during the resource-pack loading phase.

Therefore, the same Decoration Object entry will use the same working environment (global variables and etc).

Code written in top-level space outside of functions will run when a resource package is loaded, and can be used to load resources such as models and textures. It is recommended to store resources (such as models, fonts and textures) in global variables, which do not need to be different for each decoration object, to avoid excessive memory usage caused by loading a copy of the same content for each block.  

## Implementation

### Registering scripts to Decoration Object

=== "MTR 4 Custom Resources"
    ??? info "Mixing static object model & scripts"
        If the `modelResource` field is specified, the script-driven elements will be overlaid on top of the existing model. Otherwise, the appearance will be controlled solely by scripting.

    You can add the `scripting` block to your eyecandy object entry:

    ``` json linenums="1" hl_lines="6-12" title="mtr_custom_resources.json"
    {
        "objects": [
            {
                "id": "nte_lcd",
                "name": "NTE LCD Test",
                "scripting": {
                    "prependExpressions": ["print('Hello world')"],
                    "scriptLocations": ["mtrsteamloco:eyecandies/js/nte_lcd_test/main.js"],
                    "input": {
                        "ksDay": "514"
                    }
                }
            }
        ]
    }
    ```

    Field description within the `scripting` block are listed as follows:

    |Field name|Description|Equivalence in MTR 3/NTE format|
    |----------|-------|--------------------|
    |scriptLocations|An array containing the locations of .js scripts, multiple scripts can be specified.|scriptFiles|
    |prependExpressions|Allows you to directly write JS inside, which will be executed before the scripts in **scriptLocations**|scriptTexts|
    |input|Allows you to specify arbitary JSON object. which is then made accessible to the **.js** scripts via the variable `SCRIPT_INPUT`|scriptInput|

    All fields are optional and could be emitted (Including the entire `scripting` object). However in order for script to load, either the `scriptLocation` or `prependExpressions` should be filled.

=== "MTR 3 / MTR-NTE Format"
    ??? info "Mixing static object model & scripts"
        If the `model` field is specified, the script-driven elements will be overlaid on top of the existing model. Otherwise, the appearance will be controlled solely by scripting.

    You can append the following lines to your `eyecandy.json` file (Where `eyecandy.json` is the json file containing the NTE eyecandy definition):

    ``` json linenums="1" hl_lines="4-8" title="eyecandy.json"
    {
        "nte_lcd": {
            "name": "NTE LCD Test",
            "scriptTexts": ["print('Hello World!')"],
            "scriptFiles": ["mtrsteamloco:eyecandies/js/nte_lcd_test/main.js"],
            "scriptInput": {
                "ksDay": "514"
            },
            "mirror": [ false, false, false ]
        }
    }
    ```

    - `scriptFiles` is an array containing the locations of .js scripts. Multiple scripts can be specified.
    - `scriptTexts` allows you to directly write JS inside, and are executed before the scripts in **scriptFiles**.
    - `scriptInput` allows you to specify arbitary JSON object. This is then made accessible to the **.js** scripts via the variable `SCRIPT_INPUT`.

    All script fields are optional and could be emitted. However in order for script to load, either the `scriptFiles` or `scriptTexts` should be filled.



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

#### EyeCandyScriptContext
The following functions are called to **control rendering**. The functions for rendering models should be called each time render is called.

|Functions And Objects|Description|
|:--------------------|:----------|
|`EyeCandyScriptContext.drawModel(model: ScriptedModel, matrices: Matrices)`| Requests JCM to render a model loaded via [ModelManager](../../resources.md#model-loading).<br>`matrices` is the transformation of model placement. If passed null, the model will be placed in the center of the block without transformation.|
|`EyeCandyScriptContext.setDebugInfo(key: string, value: object)`|Output debugging information in the upper left corner of the screen. You need to enable **[Script Debug Overlay](../../articles/script_debug_overlay.md)** in JCM Settings to display it.<br>`key` is the name of the value<br>`value` is the content (`value` will be converted to string for display, except for GraphicsTexture which will display the entire texture image on the screen).|
|`EyeCandyScriptContext.renderManager(): RenderManager`|Obtain a [RenderManager](../../rendering.md#rendermanager) instance, which can be used to render stuff onto the Minecraft World.<br>The base position are set to the block's position + translated position.|
|`EyeCandyScriptContext.soundManager(): SoundManager`|Obtain a [SoundManager](../../sounds.md) instance, which can be used to play sound onto the Minecraft World.<br>The base position are set to the block's position.|
|`EyecandyScriptContext.events(): EyecandyEvents`|Returns [EyecandyEvents](#eyecandyevents) for checking events.|
|`EyeCandyScriptContext.setOutlineShape(shape: VoxelShape)`|Set the outline shape (The visual hitbox) of the eyecandy to a corresponding [VoxelShape](../../mc.md#voxelshape)<br>No effect if player is holding a brush.|
|`EyeCandyScriptContext.setCollisionShape(shape: VoxelShape)`|Set the collision shape (The physical hitbox) of the eyecandy to a corresponding [VoxelShape](../../mc.md#voxelshape).<br>No effect if player is holding a brush.|

#### EyecandyBlockEntity
|Functions And Objects|Description|
|:--------------------|:----------|
|`EyecandyBlockEntity.getModelId(): string`|Return the model/prefab that is currently assigned to this block.<br>`null` if no model is selected.|
|`EyecandyBlockEntity.getTranslateX(): number`|The value in **meters** on how much the Decoration Object is translated on the X-axis, configured via GUI.|
|`EyecandyBlockEntity.getTranslateY(): number`|The value in **meters** on how much the Decoration Object is translated on the Y-axis, configured via GUI.|
|`EyecandyBlockEntity.getTranslateZ(): number`|The value in **meters** on how much the Decoration Object is translated on the Z-axis, configured via GUI.|
|`EyecandyBlockEntity.getRotateX(): number`|The value in **radians** on how much the Decoration Object is rotated on the X-axis, configured via GUI.|
|`EyecandyBlockEntity.getRotateY(): number`|The value in **radians** on how much the Decoration Object is rotated on the Y-axis, configured via GUI.|
|`EyecandyBlockEntity.getRotateZ(): number`|The value in **radians** on how much the Decoration Object is rotated on the Z-axis, configured via GUI.|
|`blockEntity.getFullBrightness(): boolean`|Return whether the Decoration Object is marked as "Full Light", configured via GUI.|

#### EyecandyEvents
|Functions And Objects|Description|
|:--------------------|:----------|
|`EyecandyEvents.onBlockUse: BlockUseEvent`|Event triggered when the block is right-clicked on. (Excluding brush)|
|`EyecandyEvents.handled()`|Reset the event. Should be called after you have checked the `onBlockUse` event in your code.|

#### BlockUseEvent
|Functions And Objects|Description|
|:--------------------|:----------|
|`BlockUseEvent.occurred(): boolean`|Whether the event has been triggered/initiated.|
|`BlockUseEvent.detail().player(): PlayerEntity`|Returns the [PlayerEntity](../../mc.md#playerentity) who used the block.|
|`BlockUseEvent.detail().item(): ItemStack`|Returns the [ItemStack](../../mc.md#itemstack) the player used when right clicked the block.|