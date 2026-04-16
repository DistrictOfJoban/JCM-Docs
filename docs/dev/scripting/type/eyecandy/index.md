# Eyecandy Scripting

Eyecandy Scripting allows you to use [JavaScript](../../index.md) to control the rendering of a MTR Decoration Object.

## Concept
Your script will be associated as part of a Decoration Object model entry in the resource pack. When the model is assigned to a Decoration Object block, your script will start to execute.

During the execution, you may request for one or more model to be drawn onto the world, as well as requesting for sounds to be played.

## Implementation

### Script Registration

=== "MTR 4 Custom Resources"

    You can define your script entry in the `objectScripts` array, and reference it with `scriptId` within your object:

    ``` json linenums="1" hl_lines="6 9-18" title="mtr_custom_resources.json"
    {
        "objects": [
            {
                "id": "nte_lcd",
                "name": "NTE LCD Test",
                "scriptId": "my_script_entry_1"
            }
        ],
        "objectScripts": [
            {
                "id": "my_script_entry_1",
                "prependExpressions": ["print('Hello world')"],
                "scriptLocations": ["mtrsteamloco:eyecandies/js/nte_lcd_test/main.js"],
                "input": {
                    "ksDay": "514"
                }
            }
        ]
    }
    ```

    Field description within the script entry (entries within `objectScripts`) are listed as follows:

    |Field name|Description|Equivalence in MTR 3/NTE format|
    |----------|-------|--------------------|
    |scriptLocations|An array containing the locations of .js scripts, multiple scripts can be specified.|scriptFiles|
    |prependExpressions|Allows you to directly write JS inside, which will be executed before the scripts in **scriptLocations**|scriptTexts|
    |input|Allows you to specify arbitary JSON object. which is then made accessible to the **.js** scripts via the variable `SCRIPT_INPUT`|scriptInput|

    All fields are optional and could be omitted. However in order for script to load, either the `scriptLocation` or `prependExpressions` should be filled.

=== "MTR 3 / NTE Format"

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
Your script *can* include the following functions that JCM will call as needed:
``` js
function create(ctx, state, blockEyecandy) { ... }
function render(ctx, state, blockEyecandy) { ... }
function dispose(ctx, state, blockEyecandy) { ... }
```

|Functions|Description|
|:--------|:----------|
|`create`|It is called when a Decoration Object block is rendered for the first time and can be used to perform some initialization operations, for example, to create dynamic textures.|
|`render` |This function is called at-most once per frame. It is used to render contents. In practice however, the code is executed in a separate thread so as not to slow down FPS. If it takes too long to execute the code, it may be called once every few frames instead of every frame.|
|`dispose`|Called when the Decoration Object block goes out of sight. Can be used for things like releasing the dynamic textures to free up memory.|

*Note: Any of the above functions are optional and may be omitted if you don't find it useful for your script.*

The parameters (`ctx, state, blockEyecandy`) are described below:

|Parameter|Description|
|:--------|:----------|
|First (`ctx`)|Used to pass rendering actions to JCM. Type — [EyeCandyScriptContext](#eyecandyscriptcontext).|
|Second (`state`)|A JavaScript object associated with a single Decoration Object block.<br>The initial value is {}, and its content can be set arbitrarily to store what should be different for each block.|
|Third (`blockEyecandy`)|This returns the block entity of the placed Decoration Object block. Type — [BlockEyecandy](#blockeyecandy)|

### API Reference

#### EyeCandyScriptContext
This is the `ctx` parameter passed to the create/render/dispose functions.

Script may invoke one of the following methods to control rendering and sounds, modify eyecandy voxel shape, set debug info overlay, as well as checking for events (Such as block right-clicking).

|Functions And Objects|Description|
|:--------------------|:----------|
|`EyeCandyScriptContext.drawModel(model: ScriptedModel, matrices: Matrices?): void`| Requests JCM to render a model loaded via [ModelManager](../../model.md#modelmanager).<br>`matrices` is the transformation of model placement.<br>If `matrices` is null, the model will be placed in the center of the block without transformation.|
|`EyeCandyScriptContext.setDebugInfo(key: String, value: object): void`|Output debugging information in the upper left corner of the screen. You need to enable **[Script Debug Overlay](../../aids/script_debug_overlay.md)** in JCM Settings to display it.<br>`key` is the name of the value<br>`value` is the content (`value` will be converted to string for display, except for GraphicsTexture which will display the entire texture image on the screen).|
|`EyeCandyScriptContext.getRenderManager(): RenderManager`|Obtain a [RenderManager](../../rendering.md#rendermanager) instance, which can be used to render stuff onto the Minecraft World.<br>The base position are set to the block's position + translated position.|
|`EyeCandyScriptContext.getSoundManager(): SoundManager`|Obtain a [SoundManager](../../sounds.md) instance, which can be used to play sound onto the Minecraft World.<br>The base position are set to the block's position.|
|`EyecandyScriptContext.events(): EyecandyEvents`|Returns [EyecandyEvents](#eyecandyevents) for checking events.|
|`EyeCandyScriptContext.setOutlineShape(shape: VoxelShape): void`|Set the outline shape (The visual hitbox) of the eyecandy to a corresponding [VoxelShape](../../mc.md#voxelshape)<br>No effect if player is holding a brush.|
|`EyeCandyScriptContext.setCollisionShape(shape: VoxelShape): void`|Set the collision shape (The physical hitbox) of the eyecandy to a corresponding [VoxelShape](../../mc.md#voxelshape).<br>No effect if player is holding a brush.|

#### BlockEyecandy
Represents a Decoration Block in the world.

|Functions And Objects|Description|
|:--------------------|:----------|
|`BlockEyecandy.getModelId(): String?`|Return the model/prefab that is currently assigned to this block.<br>Null if no model is selected.|
|`BlockEyecandy.getTranslateX(): float`|The value in **meters** on how much the Decoration Object is translated on the X-axis, configured via GUI.|
|`BlockEyecandy.getTranslateY(): float`|The value in **meters** on how much the Decoration Object is translated on the Y-axis, configured via GUI.|
|`BlockEyecandy.getTranslateZ(): float`|The value in **meters** on how much the Decoration Object is translated on the Z-axis, configured via GUI.|
|`BlockEyecandy.getRotateX(): float`|The value in **radians** on how much the Decoration Object is rotated on the X-axis, configured via GUI.|
|`BlockEyecandy.getRotateY(): float`|The value in **radians** on how much the Decoration Object is rotated on the Y-axis, configured via GUI.|
|`BlockEyecandy.getRotateZ(): float`|The value in **radians** on how much the Decoration Object is rotated on the Z-axis, configured via GUI.|
|`BlockEyecandy.pos(): Vector3f`|Returns the position of the block + any translation added to the eyecandy model.|
|`BlockEyecandy.blockPos(): Vector3f`|Returns the position of the eyecandy block.|
|`BlockEyecandy.facing(): Direction`|Returns a Minecraft direction for which way the block is facing.<br>Used for constructing direction-dependent [VoxelShape](../../mc.md#voxelshape).|
|`BlockEyecandy.isCrosshairTarget(): boolean`|Returns whether the current block is player's crosshair target. (i.e. Selected block).<br>Can be used to show tooltips.|
|`BlockEyecandy.getFullBrightness(): boolean`|Return whether the Decoration Object is marked as "Full Light", configured via GUI.|
|`BlockEyecandy.redstoneLevel(): int`|Whether a redstone is powering the eyecandy.<br>Returns 0 (Unpowered) or 15 (Powered).<br>**Note: Scripts must treat the returned number as if 1-14 can be returned, as this behaviour may change in an upcoming version.**|

??? info "Show deprecated fields/functions"
    These functions are kept for backward compatibility with NTE/ANTE. You are advised to avoid using these functions for newly created scripts.

    |Functions|Description|
    |:--------|:----------|
    |`BlockEyecandy.prefabId: String?`|Same as `BlockEyecandy.getModelId()`.|
    |`BlockEyecandy.translateX: float`|Same as `BlockEyecandy.getTranslateX()`.|
    |`BlockEyecandy.translateY: float`|Same as `BlockEyecandy.getTranslateY()`.|
    |`BlockEyecandy.translateZ: float`|Same as `BlockEyecandy.getTranslateZ()`.|
    |`BlockEyecandy.rotateX: float`|Same as `BlockEyecandy.getRotateX()`.|
    |`BlockEyecandy.rotateY: float`|Same as `BlockEyecandy.getRotateY()`.|
    |`BlockEyecandy.rotateZ: float`|Same as `BlockEyecandy.getRotateZ()`.|
    |`BlockEyecandy.fullLight: boolean`|Same as `BlockEyecandy.getFullBrightness()`|
    |`BlockEyecandy.getWorldPosVector3f(): Vector3f`|Same as `BlockEyecandy.blockPos()`.|
    |`BlockEyecandy.getTransformPosVector3f(): Vector3f`|Same as `BlockEyecandy.pos()`.|

#### EyecandyEvents
|Functions And Objects|Description|
|:--------------------|:----------|
|`EyecandyEvents.onBlockUse: BlockUseEvent`|Event triggered when the block is right-clicked on. (Excluding brush)|
|`EyecandyEvents.handled(): void`|Reset the event. Should be called after you have checked the `onBlockUse` event in your code.|

#### BlockUseEvent
|Functions And Objects|Description|
|:--------------------|:----------|
|`BlockUseEvent.occurred(): boolean`|Whether the event has been triggered/initiated.|
|`BlockUseEvent.detail().player(): PlayerEntity`|Returns the [PlayerEntity](../../mc.md#playerentity) who used the block.|
|`BlockUseEvent.detail().item(): ItemStack`|Returns the [ItemStack](../../mc.md#itemstack) the player used when right clicked the block.|