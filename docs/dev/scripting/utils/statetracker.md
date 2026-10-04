# StateTracker
Sometimes it is necessary to take transition states into account. For example, to play an animation only once when a certain condition is reached (because `if (…distance < 300) ctx.play…` would be satisfied every frame after the condition was met, and then play every frame after that, which would result in hundreds of animations), or to play an animation in the first second after a page switch.

Since each object should have its own tracker, you would probably want to store it in the script's `state` variable.

## API Reference

|Functions|Description|
|:--------|:----------|
|`new StateTracker(): StateTracker`|Create an instance of StateTracker.|
|`StateTracker.setState(value: object?): void`|Sets the new state.|
|`StateTracker.stateNow(): object?`|Returns the current state.|
|`StateTracker.stateLast(): object?`|Returns the previous state.<br>Null if the previous state doesn't exist.|
|`StateTracker.stateNowDuration(): double`|Returns the amount of time the current state lasts.|
|`StateTracker.stateNowFirst(): boolean`|Was the state just changed by the `setState` function in this loop or not?|
|`StateTracker.changedTo(value: object?): boolean`|Whether the state just changed to the specified value.<br>This is mostly equivalent to `stateNowFirst() && stateNow() == value`<br>This uses Java's `Objects.equals` method for equality comparison.|
|`StateTracker.changedFromTo(oldValue: object?, value: object?): boolean`|Whether the state just changed from oldValue to value.<br>This is mostly equivalent to `stateNowFirst() && stateLast() == oldValue && stateNow() == value`<br>This uses Java's `Objects.equals` method for equality comparison.|