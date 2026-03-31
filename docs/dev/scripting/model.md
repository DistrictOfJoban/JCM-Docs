# 3D Model API

This API allows the loading of OBJ models from resource packs, as well as performing basic processing of the model data, and uploading them to the GPU for rendering purpose.

The API is split into the following 3 classes:

- **ModelManager**: Provide functions to read model data from resource packs & uploading the model.
- **ModelData**: Represent the raw model data (Vertices location/faces etc.). Provide functions for basic manipulation such as translation/rotation etc.
- **Model**: An uploaded model that can be used for rendering.

## ModelManager
|Functions|Description|
|:--------|:----------|
|`static ModelManager.loadModel(id: Identifier, flipV: boolean): ModelData`|Load a full OBJ model located in `id`.<br>Returns a [ModelData](#modeldata).<br>If `flipV` is provided, the texture's V axis will be mirrored.|
|`static ModelManager.loadModelParts(id: Identifier): Map<String, ModelData>`|Load a OBJ model located in `id`.<br>Returns a map of String & [ModelData](#modeldata), each entry corresponding to an object group (or parts) in the OBJ file.<br>This allows selectively picking individual objects out for processing/rendering. |
|`static ModelManager.upload(modelData: ModelData): Model`|Upload the model data to the GPU so it can be effectively rendered.<br>Returns a [Model](#model)|

??? info "Show deprecated functions (For MTR-NTE)"
    These are the functions implemented in JCM for backward compatibility with scripts made for MTR-NTE.  
    Newer scripts should not utilize these functions anymore.

    |Functions|Description|
    |:--------|:----------|
    |`static ModelManager.loadRawModel(null, id: Identifier, null): ModelData`|Equivalent to `ModelManager.loadModel` with the `flipV` parameter set to false.|
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