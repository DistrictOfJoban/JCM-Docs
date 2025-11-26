## Fundamentals
As mentioned in the [Main Scripting Page](./index.md), for performance reasons scripting are executed on a background thread dedicated for scripting, rather than on the main Minecraft's render thread.

To meet this goal, rendering in JCM utilize the concept of **DrawCall**. To put it very simply, this is a set of instructions (Sort of a like a recipe) telling JCM how you want to render the element. You submit/hand over these instructions to JCM by invoking the `queue()` function in [RenderManager](#rendermanager). Afterwards, JCM will memorize your calls, and render the element for you when the next rendering frame comes around.

Note that the old draw calls (from previous script execution) are cleared/discarded after the execution of your script, as such you should keep submitting these calls within the `render()` function if you wish to keep rendering your element. However in the case where a script is too slow to be executed every frame, then the old draw calls will be retained until your script gets invoked again. (Which means your content will continue to render even if your script is not actively invoking it)

## RenderManager
**RenderManager** is a class responsible for storing and following the **draw calls** you constructed, and render them onto the Minecraft world. It can usually be accessed by the script's context (e.g. `ctx.renderManager()`), however specific implementation may differ between different types of scripting. For details, please check the script type you're trying to code against (e.g. [Eyecandy Scripting](./type/eyecandy/index.md)) and check how to obtain an instance of RenderManager.

### Base Position
A RenderManager are usually already initialized with a "base" position, in which all calls you submit to RenderManager will be rendered **relative** to the base position. For example, the RenderManager provided by [Eyecandy Scripting](./type/eyecandy/index.md) has the base position set as `(Eyecandy Block Position + Eyecandy XYZ Translation)`. Therefore when rendering for example a model, you do not need to do any translation by yourself.

|Functions|Description|
|:--------|:----------|
|`RenderManager.queue(call: DrawCall): void`|Submit a draw call to RenderManager.|

## Available Draw Calls

### QuadDrawCall
This creates a draw call which renders a single quad (A polygon with 4 vertices). You may optionally customize the color, lighting, UV or assign a texture to the quad.

This may be used to simulate digital screens/displays by assigning a dynamic texture in the draw call (via `texture()`).

|Functions|Description|
|:--------|:----------|
|`static QuadDrawCall.create(): QuadDrawCall`|Creates a QuadDrawCall|
|`static QuadDrawCall.create(comment: string): QuadDrawCall`|Creates a QuadDrawCall with a comment. The comment are not used and are purely for annotations/readability purpose in your code|
|`QuadDrawCall.quad(corner1: Vector3f, corner2: Vector3f, corner3: Vector3f, corner4: Vector3f): QuadDrawCall`|Specify the coordinate of the 4 corners/vertices.|
|`QuadDrawCall.corner1(pos: Vector3f): QuadDrawCall`|Specify the [Vector3f](./math.md#vector3f) coordinate of the first corners/vertices.|
|`QuadDrawCall.corner2(pos: Vector3f): QuadDrawCall`|Specify the [Vector3f](./math.md#vector3f) coordinate of the second corners/vertices.|
|`QuadDrawCall.corner3(pos: Vector3f): QuadDrawCall`|Specify the [Vector3f](./math.md#vector3f) coordinate of the third corners/vertices.|
|`QuadDrawCall.corner4(pos: Vector3f): QuadDrawCall`|Specify the [Vector3f](./math.md#vector3f) coordinate of the final corners/vertices.|
|`QuadDrawCall.renderType(renderType: string): QuadDrawCall`|Specify a render type to use.<br>- `EXTERIOR`: Same as the one used on train exterior, use the light level at the current position.<br>- `EXTERIOR_TRANSLUCENT`: Same as `EXTERIOR`, but supports translucency.<br>- `INTERIOR`: Same as the one used on train interiors, use full light level, normals/face shadings are applied.<br>- `INTERIOR_TRANSLUCENT`: Same as `INTERIOR`, but supports translucency.<br>- `LIGHT` (default): Full brightness without any shading, suitable for LCD screens.<br>- `LIGHT_TRANSLUCENT`: Same as `LIGHT`, supports translucency.|
|`QuadDrawCall.color(rgb: number): QuadDrawCall`|Specify the color tint of this quad in RGB.<br>e.g. `0xFF0000` for red|
|`QuadDrawCall.texture(id: Identifier): QuadDrawCall`|Assign a texture to the quad using the texture [Identifier](./resources.md#identifier-aka-resourcelocation).|
|`QuadDrawCall.uv(u1: float, v1: float, u2: float, v2: float): QuadDrawCall`|Specify the UV coordinates. (0-1)|
|`QuadDrawCall.uv(u2: float, v2: float): QuadDrawCall`|Specify the second pair of UV coordinates (0-1)|
|`QuadDrawCall.matrices(matrices: Matrices): QuadDrawCall`|Supply a [Matrices](./math.md#matrices) to transform the quad.|

#### Example
```js linenums="1"
function render(ctx, state, train) {
    let screenDrawCall = QuadDrawCall.create()
        .corner1(new Vector3f(-1, 3, 0))
        .corner2(new Vector3f(-1, 2, 0))
        .corner3(new Vector3f(1, 2, 0))
        .corner4(new Vector3f(1, 3, 0))
        .texture(Resources.id("mtr:your_texture_path_here.png"));

    ctx.renderManager().queue(screenDrawCall);
}
```

### ModelDrawCall
This creates a draw call which renders a 3d model onto the world.

|Functions|Description|
|:--------|:----------|
|`static ModelDrawCall.create(): ModelDrawCall`|Creates a ModelDrawCall|
|`static ModelDrawCall.create(comment: string): ModelDrawCall`|Creates a ModelDrawCall with a comment. The comment are not used and are purely for annotations/readability purpose in your code.|
|`ModelDrawCall.modelObject(model: Model): ModelDrawCall`|Specify the model to render. See [Model Loading](./resources.md#model-loading) on obtaining a Model.|
|`ModelDrawCall.matrices(matrices: Matrices): ModelDrawCall`|Supply a [Matrices](./math.md#matrices) to transform the model.|