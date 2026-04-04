As the scripting functionality is based on the **Nemo Transit Expansion** addon, a number of helper classes are inherited from NTE to provide information or to simplify code implementation.

## Globally-available functions / fields

### print()
```static print(params: Object...): void```

This prints a message out to the console. It is identical to the `console.log` method in the [Console API](./console.md), and was historically the only way to log a message to the console, before the Console API existed.

## Versions Querying
Functions are provided where you can get the version number to ensure compatibility with different versions of mods (if any).

|Functions|Description|
|:--------|:----------|
|`static Resources.getAddonVersion(modId: String): String`|Obtain the version of a mod that is hooked to the scripting functionality.<br>Out of the box in JCM, the possible value of `modId` are:<br>- mtr<br>- jcm|

??? info "Show deprecated fields/functions"
    These functions are kept for backward compatibility with NTE/ANTE. You are advised to avoid using these functions for newly created scripts.

    |Functions|Description|
    |:--------|:----------|
    |`static Resources.getMTRVersion(): String`|Returns the version of the MTR mod in String. (e.g. `4.0.3`)<br>Use `Resources.getAddonVersion()` instead.|
    |`static Resources.getNTEVersion(): String`|Obtain the version of NTE in String.<br>As NTE did not get ported to MTR 4, it always returns `0.5.2+1.19.2` for backward compatibility.|
    |`static Resources.getNTEVersionInt(): int`|Obtain the version of NTE in integer.<br>As NTE did not get ported to MTR 4, it always returns `502` for backward compatibility.|
    |`static Resources.getNTEProtoVersion(): int`|Obtain the version of NTE's protocol version in integer.<br>As NTE did not get ported to MTR 4, it always returns `2` for backward compatibility.|
    
## TextUtil
The MTR mod uses the station naming format `Name in one language|Name in another language||EXTRA`, so TextUtil is implemented to provide functions to separate these parts.

|Functions|Description|
|:--------|:----------|
|`static TextUtil.getCjkParts(src: String): String`|Returns the CJK parts of the passed string.|
|`static TextUtil.getNonCjkParts(src: String): String`|Returns the non-CJK parts of the passed string.|
|`static TextUtil.getExtraParts(src: String): String`|Returns the extra part of the passed string.|
|`static TextUtil.getNonExtraParts(src: String): String`|Returns everything except the extra part.|
|`static TextUtil.getNonCjkAndExtraParts(src: String): String`|Returns everything except the CJK parts.|
|`static TextUtil.isCjk(src: String): boolean`|Checks whether the string contains CJK characters.|
|`static TextUtil.cycleString(src: String): String`|Returns a text that automatically cycles between different languages. (Delimited by the pipe `|` character)|
|`static TextUtil.cycleString(src: String, duration: int): String`|Same as above, with a specified cycle duration (In Minecraft Tick).|

## Timing
|Functions|Description|
|:--------|:----------|
|`static Timing.elapsed(): double`|Returns the running time of the game in seconds. It is constantly increasing, even when the game is paused.
|`static Timing.delta(): double`|The time difference between the current `render` call and the previous one.<br>This can be used, for example, to calculate the angle by which the wheel have turned during the elapsed time.|
|`static Timing.currentTimeMillis(): long`|Returns the current time in millisecond (Since 1970/1/1).<br>This is the same as Java's [System.currentTimeMillis()](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#currentTimeMillis--)|
|`static Timing.nanoTime(): long`|This is the same as Java's [System.nanoTime()](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#nanoTime--)|

## StateTracker
Sometimes it is necessary to take transition states into account. For example, to play an animation only once when a certain condition is reached (because `if (…distance < 300) ctx.play…` would be satisfied every frame after the condition was met, and then play every frame after that, which would result in hundreds of animations), or to play an animation in the first second after a page switch.

Since each object should have its own tracker, you would probably want to store it in the script's `state` variable.

|Functions|Description|
|:--------|:----------|
|`new StateTracker()`|Creates StateTracker.|
|`StateTracker.setState(value: object?): void`|Sets the new state.|
|`StateTracker.stateNow(): object?`|Returns the current state.|
|`StateTracker.stateLast(): object?`|Returns the previous state.<br>Null if the previous state doesn't exist.|
|`StateTracker.stateNowDuration(): double`|Returns the amount of time the current state lasts.|
|`StateTracker.stateNowFirst(): boolean`|Was the state just changed by the `setState` function in this loop or not?|
|`StateTracker.changedTo(value: object?): boolean`|Whether the state just changed to the specified value.<br>This is mostly equivalent to `stateNowFirst() && stateNow() == value`<br>This uses Java's `Objects.equals` method for equality comparison.|
|`StateTracker.changedFromTo(oldValue: object?, value: object?): boolean`|Whether the state just changed from oldValue to value.<br>This is mostly equivalent to `stateNowFirst() && stateLast() == oldValue && stateNow() == value`<br>This uses Java's `Objects.equals` method for equality comparison.|

## CycleTracker
This is a `StateTracker` that automatically switches on a cyclic basis by time.

Since each object should have its own tracker, you would probably want to store it in the script's `state` variable.

|Functions|Description|
|:--------|:----------|
|`new CycleTracker(params: Object[])`|Creates a CycleTracker.<br>The parameters are the states it will switch through and the duration of each state in seconds.<br>Example: `new CycleTracker([“route”, 5, “nextStation”, 5])`.|
|`CycleTracker.tick(): void`|Updates the status based on the current time.|
|`CycleTracker.stateNow(): String`|Returns the current state.|
|`CycleTracker.stateLast(): String?`|Returns the previous state.<br>Null if the previous state does not exist.|
|`CycleTracker.stateNowDuration(): double`|Returns the amount of time the current state lasts.|
|`CycleTracker.stateNowFirst(): boolean`|Was the state just changed by the `setState` function in this loop or not?|

## RateLimit
Some tasks do not require too frequent execution, for example, the display may not be updated every frame, but only 10 times per second. Therefore, you can limit the frequency of their execution to improve performance.

Since each object should have its own tracker, you would probably want to store it in the script's `state` variable.

|Functions|Description|
|:--------|:----------|
|`new RateLimit(params: Object[])`|Creates a RateLimit.<br>`interval` is the interval in seconds between two triggers.<br>For example, an interval of 0.1 means it should occur ten times per second.|
|`RateLimit.shouldUpdate(): boolean`|Has enough time elapsed between the last triggers?<br>Wrap the necessary code using<br>`if (state.rateLimitXXX.shouldUpdate()) { … }`to limit its execution frequency.|
|`RateLimit.resetCoolDown(): void`|Resets the timer to go off as soon as possible.|