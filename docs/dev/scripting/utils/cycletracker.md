# CycleTracker
This is a [StateTracker](statetracker.md) that automatically switches on a cyclic basis by time.

Since each object should have its own tracker, you would probably want to store it in the script's `state` variable.

## API Reference

|Functions|Description|
|:--------|:----------|
|`new CycleTracker(params: Object[]): CycleTracker`|Create an instance of CycleTracker.<br>The parameters are the states it will switch through and the duration of each state in seconds.<br>Example: `new CycleTracker([“route”, 5, “nextStation”, 5])`.|
|`CycleTracker.tick(): void`|Updates the status based on the current time.|
|`CycleTracker.stateNow(): String`|Returns the current state.|
|`CycleTracker.stateLast(): String?`|Returns the previous state.<br>Null if the previous state does not exist.|
|`CycleTracker.stateNowDuration(): double`|Returns the amount of time the current state lasts.|
|`CycleTracker.stateNowFirst(): boolean`|Was the state just changed by the `setState` function in this loop or not?|