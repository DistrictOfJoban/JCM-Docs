# 3D Model API

This API allows the loading of OBJ models from resource packs, as well as performing basic processing of the model data, and uploading them to the GPU for rendering purpose.

The API consists of the following 4 classes:

- **ModelManager**: Provide functions to read model data from resource packs & upload the model in the Loading/Parsing stage.
- **ModelData**: Represent the raw model data (Vertices location/faces etc.). Provide functions for basic manipulation such as translation/rotation etc.
- **Model**: An uploaded model that can be used for rendering.
- **DynamicModelHolder**: A class containing functions that allows uploading a **ModelData** during the Runtime stage.

## ModelManager
|Functions|Description|
|:--------|:----------|
|`static ModelManager.loadModel(id: Identifier, flipV: boolean): ModelData`|Load a full OBJ model located in `id`.<br>Returns a [ModelData](#modeldata).<br>If `flipV` is provided, the texture's V axis will be mirrored.|
|`static ModelManager.loadModelParts(id: Identifier): Map<String, ModelData>`|Load a OBJ model located in `id`.<br>Returns a map of String & [ModelData](#modeldata), each entry corresponding to an object group (or parts) in the OBJ file.<br>This allows selectively picking individual objects out for processing/rendering. |
|`static ModelManager.upload(modelData: ModelData): Model`|Upload the model data to the GPU so it can be effectively rendered.<br>Returns a [Model](#model).<br>**Note: This should only be invoked during the Loading/Parsing stage of scripts. Use DynamicModelHolder if you need to upload the model at runtime.**|

??? info "Show deprecated fields/functions"
    These are the functions implemented in JCM for backward compatibility with scripts made for MTR-NTE.  
    Newer scripts should not utilize these functions anymore.

    |Functions|Description|
    |:--------|:----------|
    |`static ModelManager.loadRawModel(null, id: Identifier, null): ModelData?`|Equivalent to `ModelManager.loadModel` with the `flipV` parameter set to false.<br>Null if the model loading failed.|
    |`static ModelManager.loadPartedRawModel(id: Identifier): Map<String, ModelData>`|Equivalent to `ModelManager.loadModelParts`.|
    |`static ModelManager.uploadVertArrays(modelData: ModelData): Model`|Equivalent to `ModelManager.upload`.|

## ModelData (a.k.a. RawModel)

??? note "ModelData vs Model"
    - **ModelData** only represents the static data of a model, such as it's vertices locations, UVs, object groups, how faces are mapped etc.
    - **ModelData** itself cannot be used for rendering. Instead, you must upload the model via `ModelManager.upload()`.
    - A **Model** represents an instance of a ModelData that has been uploaded to the GPU for rendering.

|Functions|Description|
|:--------|:----------|
|`ModelData.append(other: ModelData): ModelData`|Append/combine another **ModelData** to the current **ModelData**, and return the current ModelData.|
|`ModelData.applyTranslation(x: float, y: float, z: float): void`|Translate all vertices in the model by `x`, `y` and `z`.|
|`ModelData.applyRotation(direction: Vector3f, angle: float): void`|Apply rotation to all vertices in a direction specified by a [Vector3f](./math.md#vector3f).<br>Transformation is applied relative to the model's origin.<br>`angle` is the angle to rotate in degree.|
|`ModelData.applyScale(x: float, y: float, z: float): void`|Scale the model.<br>Transformation is applied relative to the model's origin.|
|`ModelData.applyMirror(x: boolean, y: boolean, z: boolean): void`|Mirror the model for the respective axis which are set to `true`.<br>Both the vertices's Position and Normals are mirrored for the respective axis.|
|`ModelData.applyUVMirror(u: boolean, v: boolean): void`|Set whether the respective UV axis should be mirrored.<br>A value of `(false, true)` is identical to the result of `flipV` in MTR.|
|`ModelData.setAllRenderType(renderType: String): void`|Set the render type for all object to `renderType`. Supported values:<br>- `EXTERIOR`<br>- `exteriortranslucent`<br>- `INTERIOR`<br>- `INTERIOR_TRANSLUCENT` / `interiortranslucent`<br>- `ALWAYS_ON_LIGHT` / `lighttranslucent`<br>- `LIGHT`|

## Model (a.k.a. ModelCluster)
|Functions|Description|
|:--------|:----------|
|`Model.close(): void`|Close this Model instance and free-up resources.<br>Note: This does nothing for now as MTR 4 does not provide a way to close a model, but script developers should still invoke this when they finished using the model.|

### Rendering
You can construct a [ModelDrawCall](./rendering.md#modeldrawcall), and pass the uploaded model as a parameter to `.modelObject`.

## DynamicModelHolder
The `ModelManager.upload()` can only be invoked when it is executed in the render thread, which is true during the initial **Loading/Parsing phase**.

But afterwards when the script's function is invoked during the Runtime stage, it will be executed in one of the Background Script Worker thread, preventing the ability to use `ModelManager.upload()` to upload the model.

If you need the ability to upload a model during the runtime stage (e.g. Lazy loading / Dynamic manipulation of [ModelData](#modeldata-aka-rawmodel)), you can do so with this class.

|Functions|Description|
|:--------|:----------|
|`new DynamicModelHolder(): ModelData`|Create a new instance of DynamicModelHolder.|
|`DynamicModelHolder.uploadLater(modelData: ModelData): void`|Request a model upload. This will schedule a task so that when the next frame comes around, JCM will perform the relevant task to get your model uploaded to the GPU.|
|`DynamicModelHolder.getUploadedModel(): ModelData?`|Obtain the uploaded GPU model, or null if either `uploadLater` has never been invoked, or `uploadLater` has just been invoked and the model has not been uploaded yet.|
|`DynamicModelHolder.close(): void`|Close the model and free-up resources. You should run this after finish using the model in DynamicModelHolder.<br>**Note: Does nothing for now, however script developers should still invoke this as usual to prepare for future implementation change.**|