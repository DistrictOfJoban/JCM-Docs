# RateLimit
Some tasks do not require too frequent execution, for example, the display graphics may not be updated every frame, but only 10 times per second.  
Therefore, you can limit the frequency of their execution to improve performance.

The `RateLimit` class is designed exactly for this, providing an internal timer calculation so you don't have to time it yourself.

Since each script instance should have its own RateLimit, you would probably want to store it in the script's `state` variable.

## API Reference

|Functions|Description|
|:--------|:----------|
|`new RateLimit(interval: double): RateLimit`|Create a new RateLimit instance.<br>`interval` is the interval in seconds between two triggers.<br>For example, an interval of 0.1 means it should occur ten times per second.|
|`RateLimit.shouldUpdate(): boolean`|Has enough time elapsed between the last triggers?<br>Wrap the necessary code using<br>`if (rateLimit.shouldUpdate()) { … }`to limit its execution frequency.|
|`RateLimit.resetCoolDown(): void`|Resets the timer to go off as soon as possible.|

## Example
```js
function create(ctx, state, eyecandy) {
    state.count = 0;
    state.rateLimit = new RateLimit(1); // Every 1s
}

function render(ctx, state, eyecandy) {
    if(state.rateLimit.shouldUpdate()) { // Check against the RateLimit object
        print("This code is only executed every 1 second!");
        state.count++;
        print(`Printed ${state.count} times now.`);
    }
    // Everything outside is still invoked every frame
}
```