# Lift Scripting

Lift Scripting allows you to use [JavaScript](../../index.md) to control the rendering of a MTR **Lifts**.

## Concept
Your script will be associated as part of a Lift style (Texture) entry in the resource pack. Once the style is selected via **Lift Refresher**, your script will start to execute.

During the execution, you may request for one or more model to be rendered onto the world, as well as requesting for sounds to be played.

## Implementation

### Script Registration

You can define your script entry in the `lifts` array, and reference it with `scriptId` within your object:

``` json linenums="1" hl_lines="6 9-18" title="mtr_custom_resources.json"
{
    "lifts": [
        {
            "id": "lift",
            "name": "Custom Scripted Lift",
            "textureResource": "mtr:textures/vehicle/lift_1.png",
            "scriptId": "my_lift_entry",
            "isScriptRendered": false
        }
    ],
    "liftScripts": [
        {
            "id": "my_lift_entry",
            "prependExpressions": ["print('Hello world')"],
            "scriptLocations": ["mtr:js/lift_display_test/main.js"],
            "input": {
                "ksDay": "514"
            }
        }
    ]
}
```

Field description within the script entry (entries within `liftScripts`) are listed as follows:

|Field name|Description|Equivalence in MTR 3/NTE format|
|----------|-------|--------------------|
|scriptLocations|An array containing the locations of .js scripts, multiple scripts can be specified.|scriptFiles|
|prependExpressions|Allows you to directly write JS inside, which will be executed before the scripts in **scriptLocations**|scriptTexts|
|input|Allows you to specify arbitary JSON object. which is then made accessible to the **.js** scripts via the variable `SCRIPT_INPUT`|scriptInput|
|isScriptRendered|If `true`, this will hide the original lift model, so that JS can take over rendering. (Useful for fallback without JCM)|

All fields are optional and could be omitted. However in order for script to load, either the `scriptLocation` or `prependExpressions` should be filled.

### Called Functions
Your script *can* include the following functions that JCM will call as needed:
``` js
function create(ctx, state, lift) { ... }
function render(ctx, state, lift) { ... }
function dispose(ctx, state, lift) { ... }
```

|Functions|Description|
|:--------|:----------|
|`create`|It is called when a Decoration Object block is rendered for the first time and can be used to perform some initialization operations, for example, to create dynamic textures.|
|`render` |This function is called at-most once per frame. It is used to render contents. In practice however, the code is executed in a separate thread so as not to slow down FPS. If it takes too long to execute the code, it may be called once every few frames instead of every frame.|
|`dispose`|Called when the Decoration Object block goes out of sight. Can be used for things like releasing the dynamic textures to free up memory.|

*Note: Any of the above functions are optional and may be omitted if you don't find it useful for your script.*

The parameters (`ctx, state, lift`) are described below:

|Parameter|Description|
|:--------|:----------|
|First (`ctx`)|Used to pass rendering actions to JCM. Type — [LiftScriptContext](#liftscriptcontext).|
|Second (`state`)|A JavaScript object associated with a single Decoration Object block.<br>The initial value is {}, and its content can be set arbitrarily to store what should be different for each block.|
|Third (`lift`)|This returns the block entity of the placed Decoration Object block. Type — [LiftWrapper](#liftwrapper)|

### API Reference

#### LiftScriptContext
This is the `ctx` parameter passed to the create/render/dispose functions.

Script may invoke one of the following methods to control rendering and sounds, as well as setting debug info overlay.

|Functions And Objects|Description|
|:--------------------|:----------|
|`LiftScriptContext.setDebugInfo(key: String, value: object): void`|Output debugging information in the upper left corner of the screen. You need to enable **[Script Debug Overlay](../../aids/script_debug_overlay.md)** in JCM Settings to display it.<br>`key` is the name of the value<br>`value` is the content (`value` will be converted to string for display, except for GraphicsTexture which will display the entire texture image on the screen).|
|`LiftScriptContext.setDebugInfo(value: object): void`|Same as above, but the key is set to `<Untitled>`. Useful for temporary debugging/output of a single variable.|
|`LiftScriptContext.getRenderManager(): RenderManager`|Obtain a [RenderManager](../../rendering.md#rendermanager) instance, which can be used to render stuff onto the Minecraft World.<br>Base transformation is set to the **lift's base position + offset position**, with respect to the rotation of the lift.|
|`LiftScriptContext.getSoundManager(): SoundManager`|Obtain a [SoundManager](../../sounds.md) instance, which can be used to play sound onto the Minecraft World.<br>Base position are set to the lift's base position + offset position.|

#### LiftWrapper
This is a helper object for easy obtaining of the Lift's information by scripts.

|Functions And Objects|Description|
|:--------------------|:----------|
|`LiftWrapper.getMtrLift(): Lift`|Returns the underlying MTR [Lift](../../tsc.md#lift) object.|
|`LiftWrapper.shouldRender(): boolean`|Whether the lift should be rendered. (i.e. Passed the occlusion culling check)|
|`LiftWrapper.getId(): long`|Returns the unique id assigned to the Lift.|
|`LiftWrapper.getWidth(): double`|The value in **meters** on the width of the lift. This is configured via Lift Refresher.|
|`LiftWrapper.getHeight(): double`|The value in **meters** on the height of the lift. This is configured via Lift Refresher.|
|`LiftWrapper.getDepth(): double`|The value in **meters** on the depth of the lift. This is configured via Lift Refresher.|
|`LiftWrapper.getOffset(): Vector3f`|The offset position of the lift, that is added on top of the base lift position.|
|`LiftWrapper.getAngleDegrees(): float`|The rotation of the lift in degrees. (From north)|
|`LiftWrapper.getAngleRadians(): double`|The rotation of the lift in radian. (From north)|
|`LiftWrapper.isDoubleSided(): boolean`|Whether there should be doors on both side of the lift.|
|`LiftWrapper.getDoorValue(): float`|The door value of the lift, from 0 (Closed) to 1 (Opened)|
|`LiftWrapper.getDirection(): int`|The direction the lift.<br>**-1** is going down<br>**0** is stale/no direction<br>**1** is going up.|
|`LiftWrapper.getPos(): Vector3f`|The base lift position + configured offset.|
|`LiftWrapper.getRawPos(): Vector3f`|The base lift position.|
|`LiftWrapper.isClientPlayerRiding(): boolean`|Whether the client player is mounted onto the lift.|
|`LiftWrapper.getFloors(): List<Floor>`|All floors the lift stops at.<br>Returns a list of [Floor](#floor).|

#### Floor
This is a representation of a floor level a lift stops at.

|Functions And Objects|Description|
|:--------------------|:----------|
|`Floor.getIndex(): int`|The index of the floor. 0 is the bottom-most.|
|`Floor.getNumber(): String`|The floor number code, as configured via brush on a Floor Track.|
|`Floor.getDescription(): String`|The floor description, as configured via brush on a Floor Track.|
|`Floor.getPos(): Vector3f`|The floor track position.|
|`Floor.isCurrentFloor(): boolean`|Whether the lift is stopped at the current floor.|
|`Floor.isTargetFloor(): boolean`|Whether the lift is instructed to stop at the current floor.|