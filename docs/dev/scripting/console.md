# Console API
This allows access to `print()`, `console.log()`, `console.warn()` and other relevant logging functions to allow debugging for script developers.

## API Reference

### print() function
This is a globally available function for all scripts, which performs identically to `console.log`:

```js
static print(params: Object...): void
```

This was the only logging function available in NTE before the introduction of the JavaScript Console API in JCM.  
For compatibility and ease-of-use, this function will remain accessible, and script developers may use `print()` in place of `console.log()` if they feel like.

### Console
This is a class which replicates the JavaScript [Console API](https://developer.mozilla.org/en-US/docs/Web/API/Console_API) seen in web environment.

#### Unsupported features
- Functions that cannot be represented in plain text (e.g. `console.table`)
- Functions that are irrelevant to JCM Scripting/Minecraft (e.g. `console.profile`)
- Console string interpolation (Use ES6's backtick string should be enough in most cases)

#### API Reference

|Functions|Description|
|:--------|:----------|
|`static console.log(values: Object...): void`|Print out the values in the game console, separated by spaces.|
|`static console.warn(values: Object...): void`|Print out the values in the game console (In WARNING level), separated by spaces.|
|`static console.error(values: Object...): void`|Print out the values in the game console (In ERROR level), separated by spaces.|
|`static console.debug(values: Object...): void`|Print out the values in debug mode (Only if JCM's Script Debug Mode is enabled), separated by spaces.|
|`static console.count(label: String = "default"): void`|Increment 1 to a counter named as the label, as well as printing out the incremented counter value. Each label has a separate counter.|
|`static console.countReset(label: String = "default"): void`|Set 0 to a counter named as the label, as well as printing out the counter value. Each label has a separate counter.|
|`static console.time(label: String = "default"): void`|Start a timer named as the label. Each label has a separate timer.|
|`static console.timeLog(label: String = "default"): void`|Print out how many millisecond has elapsed since the timer is first started. Each label has a separate timer.|
|`static console.timeEnd(label: String = "default"): void`|Reset a timer named as the label, as well as printing out how many millisecond has elapsed since the timer is first started. Each label has a separate timer.|

### Example
```js title="example_log.js"
/* Logging */
print("Hello World");       // Output: [JCM Scripting] Hello World
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

## Printing an object
When printing a JavaScript object, you may find that it would only output `[object Object]`.

To also print all the fields within the object, you can use `JSON.stringify()` to convert it into a string first, before printing to the console.