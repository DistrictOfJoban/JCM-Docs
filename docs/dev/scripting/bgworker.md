# Background Worker
For more advanced scripts, it may be desirable to run a task in the background in order to not block the main thread. (e.g. Fetching data from the network)

This class allows you to submit a task to the single-thread background executor.

*Note: Since the Background Worker is single-threaded, you shouldn't over-rely on it. Other scripts may also need to submit tasks.*

## BackgroundWorker
|Functions|Description|
|:--------|:----------|
|`static BackgroundWorker.submit(task: Runnable): void`|Submit a lambda task to the background thread.<br>**Note: Exception handling (try/catch) for the task should be done within the lambda function.**|

## Example
```js

BackgroundWorker.submit(() => {
    // We do the network fetching in the background thread, so Minecraft's resource loading can continue without waiting specifically for our script.
    let resp = Networking.fetch("https://api.modrinth.com/v2/project/minecraft-transit-railway");
    if(resp.ok()) {
        let data = resp.getData();
        let str = data.asString();
        // Do further processing...
    }
});

function create(ctx, state, eyecandy) {
// ...
```