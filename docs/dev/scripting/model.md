# 3D Model API

This API allows the loading of OBJ models from resource packs, as well as performing basic processing of the model data, and uploading them to the GPU for rendering purpose.

The API consists of the following 6 primary types:

- **ModelManager**: Provide functions to read model data (RawModel) from resource packs & upload the model in the Loading/Parsing stage.
- **RawMesh**: Represents the raw mesh data (Vertices location/faces/materials etc.)
- **RawModel**: A holder for multiple meshes combined together. Provide functions for basic manipulation such as translation/rotation etc.
- **Model**: A `RawModel` that is uploaded to the GPU memory, which can be used for rendering.
- **RawMeshBuilder**: Allow using code to form a model by specifying vertices location.
- **DynamicModelHolder**: A class containing functions that allows uploading a **RawModel** during the Runtime stage.

## ModelManager

|Functions|Description|
|:--------|:----------|
|`static ModelManager.loadModel(id: Identifier, flipV: boolean = true): RawModel`|Load a full OBJ model located in `id`.<br>Returns a [RawModel](#rawmodel).<br>If `flipV` is true, the texture's V axis will be mirrored. (Required for OBJ exported from commonly used modelling software like blender)|
|`static ModelManager.loadModelParts(id: Identifier, flipV: boolean = true): Map<String, RawModel>`|Load a OBJ model located in `id`.<br>Returns a map of String & [RawModel](#rawmodel), each entry corresponding to an object group (or parts) in the OBJ file.<br>This allows selectively picking individual objects out for processing/rendering.<br>If `flipV` is true, the texture's V axis will be mirrored. (Required for OBJ exported from commonly used modelling software like blender)|
|`static ModelManager.upload(rawModel: RawModel): Model`|Upload the model data to the GPU so it can be effectively rendered.<br>Returns a [Model](#model-aka-modelcluster).<br>**Note: This should only be invoked during the Loading/Parsing stage of scripts. Use DynamicModelHolder if you need to upload the model at runtime.**|

??? info "Show deprecated fields/functions"
    These are the functions implemented in JCM for backward compatibility with scripts made for MTR-NTE.  
    Newer scripts should not utilize these functions anymore.

    |Functions|Description|
    |:--------|:----------|
    |`static ModelManager.loadRawModel(null, id: Identifier, null): RawModel?`|Equivalent to `ModelManager.loadModel` with the `flipV` parameter set to false.<br>Null if the model loading failed.|
    |`static ModelManager.loadPartedRawModel(null, id: Identifier, null): Map<String, RawModel>`|Equivalent to `ModelManager.loadModelParts`.|
    |`static ModelManager.uploadVertArrays(rawModel: RawModel): Model`|Equivalent to `ModelManager.upload`.|

## RawModel

??? note "RawModel vs Model"
    - **RawModel** only represents the static data of a model, such as it's vertices locations, UVs, object groups, how faces are mapped etc.
    - **RawModel** itself cannot be used for rendering. Instead, you must upload the model via `ModelManager.upload()`.
    - A **Model** represents an instance of a RawModel that has been uploaded to the GPU for rendering.

|Functions|Description|
|:--------|:----------|
|`new RawModel(): RawModel`|Create a new empty RawModel.|
|`RawModel.append(other: RawMesh): RawModel`|Append/combine another **RawMesh** to the current **RawModel**, and return the current RawModel.|
|`RawModel.append(other: RawModel): RawModel`|Append/combine another **RawModel** to the current **RawModel**, and return the current RawModel.|
|`RawModel.applyTranslation(x: float, y: float, z: float): void`|Translate all vertices in the model by `x`, `y` and `z`.|
|`RawModel.applyRotation(direction: Vector3f, angle: float): void`|Apply rotation to all vertices in a direction specified by a [Vector3f](./math.md#vector3f).<br>Transformation is applied relative to the model's origin.<br>`angle` is the angle to rotate in degree.|
|`RawModel.applyScale(x: float, y: float, z: float): void`|Scale the model.<br>Transformation is applied relative to the model's origin.|
|`RawModel.applyMirror(x: boolean, y: boolean, z: boolean): void`|Mirror the model for the respective axis which are set to `true`.<br>Both the vertices's Position and Normals are mirrored for the respective axis.|
|`RawModel.applyUVMirror(u: boolean, v: boolean): void`|Set whether the respective UV axis should be mirrored.<br>A value of `(false, true)` is identical to the result of `flipV` in MTR.|
|`RawModel.setAllRenderType(renderType: String): void`|Set the render type for all object to `renderType`. Supported values:<br>- `EXTERIOR`<br>- `exteriortranslucent`<br>- `INTERIOR`<br>- `INTERIOR_TRANSLUCENT` / `interiortranslucent`<br>- `ALWAYS_ON_LIGHT` / `lighttranslucent`<br>- `LIGHT`|
|`RawModel.copy(): RawModel`|Copy all vertices and material data and return a new instance of RawModel.|
|`RawModel.replaceTexture(fileName: string, id: Identifier): void`|Replace all texture ending with `fileName` to `id`.|
|`RawModel.replaceAllTexture(id: Identifier): void`|Replace all texture of this RawModel with `id`.|

## Model (a.k.a. ModelCluster)

This represents a model with all vertices data uploaded to the GPU, therefore at this stage you can no longer change the vertices data.

However texture replacing operation is still possible.

|Functions|Description|
|:--------|:----------|
|`Model.replaceTexture(fileName: string, id: Identifier): void`|Replace all texture ending with `fileName` to `id`.|
|`Model.replaceAllTexture(id: Identifier): void`|Replace all texture of this Model with `id`.|
|`Model.copyForMaterialChanges(): Model`|Returns an instance of Model with the material copied. This allows you to replace textures on the newly created copy, without affecting the existing instance.|
|`Model.close(): void`|Close this Model instance and free-up resources.|

### Rendering
You may either:

- Construct a [ModelDrawCall](./rendering.md#modeldrawcall), and pass the uploaded model as a parameter to `.modelObject` and use [RenderManager](./rendering.md#rendermanager) to render it out.
- Or pass in the model to the draw model functions in [VehicleScriptContext](./type/vehicle/index.md#vehiclescriptcontext) and [EyecandyScriptContext](./type/eyecandy/index.md#eyecandyscriptcontext)

## RawMeshBuilder

The RawMeshBuilder allows forming a RawMesh using code.

|Functions|Description|
|:--------|:----------|
|`new RawMeshBuilder(faceSize: int, renderType: String, texture: Identifier): RawMeshBuilder`|Forms a new RawMeshBuilder.<br>`faceSize` is to specify the amount of vertices required to form a face.<br>`renderType` is one of the following:<br>- `EXTERIOR` / `exterior`<br>- `exteriortranslucent`<br>- `INTERIOR`<br>- `INTERIOR_TRANSLUCENT` / `interiortranslucent`<br>- `ALWAYS_ON_LIGHT` / `lighttranslucent`<br>- `LIGHT`<br>`texture` is the [Identifier](./resources.md#identifier-aka-resourcelocation) pointing to the texture image.|
|`RawMeshBuilder.vertex(pos: Vector3f): RawMeshBuilder`|Start building a vertex with the position set to `pos`.|
|`RawMeshBuilder.vertex(x: double, y: double, z: double): RawMeshBuilder`|Start building a vertex with the position set to `x`, `y` and `z`.|
|`RawMeshBuilder.normal(x: double, y: double, z: double): RawMeshBuilder`|Set the normal vector of the currently-building vertex.|
|`RawMeshBuilder.uv(x: float, y: float): RawMeshBuilder`|Set the UV value of the currently-building vertex.|
|`RawMeshBuilder.endVertex(): RawMeshBuilder`|Finish building the current vertex. This will add the vertices to the mesh, and form a face if necessary.|
|`RawMeshBuilder.color(r: int, g: int, b: int, a: int): RawMeshBuilder`|Set the color of the mesh in rgba format.<br>Each channel is an int value from 0 - 255.|
|`RawMeshBuilder.getMesh(): RawMesh`|Obtain the RawMesh, which can be used to be appended to a [RawModel](#rawmodel)|

### Example
```js title="example.js" linenums="1"

// Create RawMeshBuilder, use method chaining to build vertices
const rawMeshBuilder = new RawMeshBuilder(4, "exterior", Resources.idr("wordmark.png"))
.vertex(0, 0, -2).normal(0, 0, 0).uv(1, 1).endVertex()
.vertex(0, 1, -2).normal(0, 0, 0).uv(1, 0).endVertex()
.vertex(0, 1, 2).normal(0, 0, 0).uv(0, 0).endVertex()
.vertex(0, 0, 2).normal(0, 0, 0).uv(0, 1).endVertex();

const wordmarkRawModel = new RawModel(); // Create an empty RawModel
wordmarkRawModel.append(rawMeshBuilder.getMesh()) // Append the mesh to RawModel
wordmarkRawModel.triangulate();
wordmarkRawModel.generateNormals();

let wordmarkModel = ModelManager.upload(wordmarkRawModel); // Upload the model to GPU

function render(ctx, state, vehicle) {
    for(let carIndex of ctx.getMyCars()) {
        ctx.drawCarModel(wordmarkModel, carIndex, null); // Draw the model out
    }
}
```

## DynamicModelHolder
The `ModelManager.upload()` can only be invoked when it is executed in the render thread, which is true during the initial **Loading/Parsing stage**.

But afterwards when the script's function is invoked during the Runtime stage, it will be executed in one of the Background Script Worker thread, preventing the ability to use `ModelManager.upload()` to upload the model.

If you need the ability to upload a model during the runtime stage (e.g. Lazy loading / Dynamic manipulation of [RawModel](#rawmodel)), you can do so with this class.

|Functions|Description|
|:--------|:----------|
|`new DynamicModelHolder(): DynamicModelHolder`|Create a new instance of DynamicModelHolder.|
|`DynamicModelHolder.uploadLater(rawModel: RawModel): void`|Request a model upload. This will schedule a task so that when the next frame comes around, JCM will perform the relevant task to get your model uploaded to the GPU.|
|`DynamicModelHolder.getUploadedModel(): RawModel?`|Obtain the uploaded GPU model, or null if either `uploadLater` has never been invoked, or `uploadLater` has just been invoked and the model has not been uploaded yet.|
|`DynamicModelHolder.close(): void`|Close the model and free-up resources. You should run this after finish using the model in DynamicModelHolder.<br>Note: If multiple `uploadLater` has been invoked, the previous model would be closed automatically without the execution of this function.|

??? tip "Use Matrices for dynamic transformation in runtime"
    While it is possible to use `RawModel.applyTranslation` / `RawModel.applyRotation` and re-upload the model with DynamicModelHolder for every frame, it is very heavy in performance. For simple transformation, what you likely want to do is to use [Matrices](./math.md#matrices) to perform the transformation and pass that to [ModelDrawCall.matrices](./rendering.md#modeldrawcall) in runtime.