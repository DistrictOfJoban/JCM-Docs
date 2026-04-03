# Including Other Scripts
By calling the function below in your scripts during the **Parsing/Loading Phase**, you can include and execute other JavaScript files.

|Functions|Description|
|:--------|:----------|
|`static include(relPath: String): void`|Loads and runs another JS file relative to the current JS file.|
|`static include(path: Identifier): void`|Loads and runs the JS file by an [Identifier](../resources.md#identifier-aka-resourcelocation) in the resource pack.<br>For example: `include(Resources.id(“mtr:path/absolute.js”))`.|

## Example
```js title="script.js" linenums="1"
include(Resources.id("mtrsteamloco:scripts/display_helper.js"));

function create(ctx, state, eyecandy) {
// ...

```