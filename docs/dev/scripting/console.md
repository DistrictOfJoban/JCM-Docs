The console API aims to replicate the JavaScript [Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console_API) seen in web environment.

This allows access to `console.log`, `console.warn` and other timing-related function to improve the debugging experience, as well as providing familiarity to developers with a basic web development background.

### Unsupported features
- Functions that cannot be represented in plain text (e.g. `console.table`)
- Functions that are irrelevant to JCM Scripting/Minecraft (e.g. `console.profile`)
- Console string interpolation (Use ES6's backtick string should be enough in most cases)

### API Reference
|Functions|Description|
|:--------|:----------|
|`static console.log(values: string...): void`|Print out the values in the game console, separated by spaces.|
|`static console.warn(values: string...): void`|Print out the values in the game console (In WARNING level), separated by spaces.|
|`static console.error(values: string...): void`|Print out the values in the game console (In ERROR level), separated by spaces.|
|`static console.debug(values: string...): void`|Print out the values in debug mode (Only if JCM's Script Debug Mode is enabled), separated by spaces.|
|`static console.count(label: string = "default"): void`|Increment 1 to a counter named as the label, as well as printing out the incremented counter value. Each label has a separate counter.|
|`static console.countReset(label: string = "default"): void`|Set 0 to a counter named as the label, as well as printing out the counter value. Each label has a separate counter.|
|`static console.time(label: string = "default"): void`|Start a timer named as the label. Each label has a separate timer.|
|`static console.timeLog(label: string = "default"): void`|Print out how many millisecond has elapsed since the timer is first started. Each label has a separate timer.|
|`static console.timeEnd(label: string = "default"): void`|Reset a timer named as the label, as well as printing out how many millisecond has elapsed since the timer is first started. Each label has a separate timer.|

### Example
```js title="example_log.js"
/* Logging */
console.log("Hello World"); // Output: [JCM Scripting] Hello World

/* Counters */
console.count("counter1"); // Output: counter1: 1
console.count("counter1"); // Output: counter1: 2

console.count("counter2"); // Output: counter2: 1
console.countReset("counter1"); // Output: counter1: 0

/* Timers */
console.time("timer1"); // Output: (None)
console.time("timer1"); // Output: Timer "timer1" already exists.

console.timeLog("timer1") // Output: timer1: [millisecond elapsed]ms
console.timeEnd("timer1") // Output: timer1: [millisecond elapsed]ms - timer ended
```