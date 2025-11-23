As the scripting functionality is based on the **Nemo Transit Expansion** addon, a number of helper classes are inherited from NTE to provide information or to simplify code implementation.

## Printing debug information

```static print(params: Object...): void```

This function outputs a message to the Minecraft log (''the message is not displayed in the game''). Any number of arguments of any type can be passed to the function.

## Versions
Functions are provided where you can get the version number to ensure compatibility with different versions of mods (if any).

|Functions|Description|
|:--------|:----------|
|`static Resources.getAddonVersion(modId: string): string`|Obtain the version of a mod that is hooked to the scripting functionality.<br>Out of the box in JCM, the possible value of `modId` are:<br>- mtr<br>- jcm|

## TextUtil
The MTR mod uses the station naming format `Name in one language|Name in another language||EXTRA`, so TextUtil is implemented to provide functions to separate these parts.

|Functions|Description|
|:--------|:----------|
|`static TextUtil.cycleString(src: String): String`|Returns a text that cycles different languages. (Delimited by the pipe `|` character)|
|`static TextUtil.cycleString(src: String, duration: int): String`|Returns a text that cycles different languages. (Delimited by the pipe `|` character)<br>The cycle frequency is decided by the `duration` parameter, in Minecraft Tick.|
|`static TextUtil.getCjkParts(src: String): String`|Returns the CJK parts of the passed string.|
|`static TextUtil.getNonCjkParts(src: String): String`|Returns the non-CJK parts of the passed string.|
|`static TextUtil.getExtraParts(src: String): String`|Returns the extra part of the passed string.|
|`static TextUtil.getNonExtraParts(src: String): String`|Returns everything except the extra part.|
|`static TextUtil.getNonCjkAndExtraParts(src: String): String`|Returns everything except the CJK parts.|
|`static TextUtil.isCjk(src: String): boolean`|Checks whether the string contains CJK characters.|

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
|`StateTracker.stateLast(): object?`|Returns the previous state. If it does not exist, `null` is returned.|
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
|`CycleTracker.stateNow(): string`|Returns the current state.|
|`CycleTracker.stateLast(): string?`|Returns the previous state. If it does not exist, `null` is returned.|
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

## MTRClientData
Client data from MTR that can be used to read routes, transfers, etc. See the source code of [MinecraftClientData.java](https://github.com/Minecraft-Transit-Railway/Minecraft-Transit-Railway/blob/master/fabric/src/main/java/org/mtr/mod/client/MinecraftClientData.java) from MTR.