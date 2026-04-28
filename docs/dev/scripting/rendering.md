## Fundamentals
As mentioned in the [Main Scripting Page](./index.md), for performance reasons scripting are executed on a background thread dedicated for scripting, rather than on the main Minecraft's render thread.

To meet this goal, rendering in JCM utilize the concept of **draw call**. To put it very simply, this is a set of instructions/command (Sort of a like a recipe) telling JCM how you want to render the element. You submit/hand over these instructions to JCM by invoking the `draw()` function in [RenderManager](#rendermanager) (Or `drawModel()` function when drawing model). Afterwards, JCM will memorize your calls, and render the element for you until your script gets executed again the next round.

Note that the old draw calls (from previous script execution) are cleared/discarded after the execution of your script, *as such you should keep submitting these calls within the `render()` function if you wish to keep rendering your element*. Though you do not need to be concerned with rendering issues caused by your script's execution speed, since JCM will hold on to the previous draw calls until your script finishes execution.

## RenderManager
**RenderManager** is a class responsible for storing and following the **draw calls** you constructed, and render them onto the Minecraft world. It can usually be accessed by the script's context (e.g. `ctx.getRenderManager()`), however specific implementation may differ between different types of scripting. For details, please check the script type you're trying to code against (e.g. [Eyecandy Scripting](./type/eyecandy/index.md)) and check how to obtain an instance of RenderManager.

### Base Transformation
A **RenderManager** is usually initialized with a "base transformation" (Position & Rotation), in which everything submitted to RenderManager will be rendered **relative** to the "base transformation". For example, the RenderManager provided by [Eyecandy Scripting](./type/eyecandy/index.md) will have their starting position as `(Eyecandy Block Position + Eyecandy XYZ Translation)`, as well as applying any rotation manually-configured in the block. Therefore when rendering for example a model, you do not need to do any transformation by yourself.

This is different for each script types, and may vary depending on where and how you obtained RenderManager in the first place.

|Functions|Description|
|:--------|:----------|
|`RenderManager.drawModel(model: Model, matrices: Matrices?): void`|Submit a [Model](./model.md#model-aka-modelcluster) to render manager, with an optional [Matrices](./math.md#matrices).|
|`RenderManager.drawModel(modelHolder: DynamicModelHolder, matrices: Matrices?): void`|Submit a [DynamicModelHolder](./model.md#dynamicmodelholder) to render manager, with an optional [Matrices](./math.md#matrices).|
|`RenderManager.draw(call: DrawCall): void`|Submit a raw draw call to RenderManager.|

## Draw Call Types
Note that for drawing models, it is recommended to simply use the `drawModel` function (which internally creates a model draw call) since it is less cumbersome to write. Thus this section won't go through the "Model Draw Calls", as `drawModel` already covered all parameters of a model draw call.

### QuadDrawCall
This creates a draw call which renders a single quad (A polygon with 4 vertices). You may optionally customize the color, lighting, UV or assign a texture to the quad.

This may be used to simulate digital screens/displays by assigning a dynamic texture in the draw call (via `texture()`).

|Functions|Description|
|:--------|:----------|
|`static QuadDrawCall.create(): QuadDrawCall`|Creates a QuadDrawCall|
|`static QuadDrawCall.create(comment: String): QuadDrawCall`|Creates a QuadDrawCall with a comment. The comment are not used and are purely for annotations/readability purpose in your code|
|`QuadDrawCall.quad(corner1: Vector3f, corner2: Vector3f, corner3: Vector3f, corner4: Vector3f): QuadDrawCall`|Specify the coordinate of the 4 corners/vertices.|
|`QuadDrawCall.corner1(pos: Vector3f): QuadDrawCall`|Specify the [Vector3f](./math.md#vector3f) coordinate of the first corners/vertices.|
|`QuadDrawCall.corner2(pos: Vector3f): QuadDrawCall`|Specify the [Vector3f](./math.md#vector3f) coordinate of the second corners/vertices.|
|`QuadDrawCall.corner3(pos: Vector3f): QuadDrawCall`|Specify the [Vector3f](./math.md#vector3f) coordinate of the third corners/vertices.|
|`QuadDrawCall.corner4(pos: Vector3f): QuadDrawCall`|Specify the [Vector3f](./math.md#vector3f) coordinate of the final corners/vertices.|
|`QuadDrawCall.renderType(renderType: String): QuadDrawCall`|Specify a render type to use.<br>- `EXTERIOR`: Same as the one used on train exterior, use the light level at the current position.<br>- `EXTERIOR_TRANSLUCENT`: Same as `EXTERIOR`, but supports translucency.<br>- `INTERIOR`: Same as the one used on train interiors, use full light level, normals/face shadings are applied.<br>- `INTERIOR_TRANSLUCENT`: Same as `INTERIOR`, but supports translucency.<br>- `LIGHT` (default): Full brightness without any shading, suitable for LCD screens.<br>- `LIGHT_TRANSLUCENT`: Same as `LIGHT`, supports translucency.|
|`QuadDrawCall.color(rgb: int): QuadDrawCall`|Specify the color tint of this quad in RGB.<br>e.g. `0xFF0000` for red|
|`QuadDrawCall.texture(id: Identifier): QuadDrawCall`|Assign a texture to the quad using the texture [Identifier](./resources.md#identifier-aka-resourcelocation).|
|`QuadDrawCall.uv(u1: float, v1: float, u2: float, v2: float): QuadDrawCall`|Specify the UV coordinates. (0-1)|
|`QuadDrawCall.uv(u2: float, v2: float): QuadDrawCall`|Specify the second pair of UV coordinates (0-1)|
|`QuadDrawCall.matrices(matrices: Matrices): QuadDrawCall`|Supply a [Matrices](./math.md#matrices) to transform the quad.|

#### Example
```js linenums="1"
function render(ctx, state, eyecandy) {
    let screenDrawCall = QuadDrawCall.create()
        .corner1(new Vector3f(-1, 3, 0))
        .corner2(new Vector3f(-1, 2, 0))
        .corner3(new Vector3f(1, 2, 0))
        .corner4(new Vector3f(1, 3, 0))
        .texture(Resources.id("mtr:your_texture_path_here.png"));

    ctx.getRenderManager().queue(screenDrawCall);
}
```