# Timing

This is a class which returns time-related information.
*Note: This does not help "track" time, it only returns static information, such as the current time, time elapsed, the time elapsed since last invocation etc.*

## API Reference

|Functions|Description|
|:--------|:----------|
|`static Timing.elapsed(): double`|Returns the running time of the game in seconds. It is constantly increasing, even when the game is paused.
|`static Timing.delta(): double`|The time difference between the current `render` call and the previous one.<br>This can be used, for example, to calculate the angle by which the wheel have turned during the elapsed time.|
|`static Timing.currentTimeMillis(): long`|Returns the current time in millisecond (Since 1970/1/1).<br>This is the same as Java's [System.currentTimeMillis()](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#currentTimeMillis--)|
|`static Timing.nanoTime(): long`|This is the same as Java's [System.nanoTime()](https://docs.oracle.com/javase/8/docs/api/java/lang/System.html#nanoTime--)|

## Example
```js
function render(ctx, state, eyecandy) {
    let floatingAnimationShiftY = Math.sin(Timing.elapsed()); // Sine-wave animation
    // ...
}
```