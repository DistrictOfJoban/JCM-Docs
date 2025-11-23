## Declaring variables using let or var
Both JCM/NTE uses JavaScript's **strict mode**, which does not allow variables to be assigned without first declaring them.

This means you can't do `local = 1` and expect `local` to be automatically defined.

Instead, you have use syntax like `var glb;` or outside a function `var glb = 1;`. For local variables inside a function, use `let local;` or `let local = 1;`.

!!! note "Translator Note"
     In general, it is better to always try to use `let` and resort to using `var` as a last resort.

## Don't Block Or Infinitely Loop
The function you wrote are called once per frame by JCM, where  your function is expected to finish processing and return a value *as soon/fast as possible*. As such, there's no such concept as “*wait for a while before continue executing*”.

Instead, what you likely want is to "do a thing later on", in such case you will need to time it and then execute the appropriate action on a call made at the right time.

If you are trying to execute a long-running operation (e.g. Fetching data over the internet), you should submit it to another thread/executor.

If blocks or infinite loops did occur, then the entire script execution will stall as scripts are executed one at a time [*in the same thread*]. In such situation, you can reset it by pressing ++f3+t++ on your keyboard, which reloads the resource pack and resets the scripting thread.

## Interoperability between Java Classes/Methods
For common function types such as strings, Java and JavaScript have different class implementations, which causes there to be JavaScript strings as well as Java strings.

NTE/MTR functions and fields return Java string classes rather than JavaScript strings, but Rhino does some conversions automatically, so in most cases you can mix and match, but sometimes this can cause problems.

For example, here's an example of a problem caused by using `str.length()` from a Java string class and `str.length` from a JavaScript string class to get the length of a string:

``` js
var stationName = train.getThisRoutePlatforms().get(0).station.name;
print(stationName.length); // Error: stationName is a Java string, not a JavaScript string
print(stationName.length()); // Java strings get their length from the length() function, not the JavaScript length field
print((""+stationName).length) // Use ""+ to turn it into a JavaScript string.
```
Similarly, there is a `List<T>` type in Java. It does the same thing as arrays in JavaScript, but has a different type. Trying to call JavaScript array functions on it won't work, but Rhino adapts it so that you can take values with `list[0]` or loop through them with `for (a of list)`.

## What JavaScript features are supported?
The Rhino JavaScript Engine **does not support** all of the latest JavaScript features. See [Mozilla's documentation](https://mozilla.github.io/rhino/compat/engines.html) for details on what is supported.

- **For Minecraft 1.17+**, JCM uses Rhino **1.8.0** with the `VERSION_ES6` flag enabled.
- **For Minecraft 1.16.5**, JCM uses Rhino **1.7.15** with the `VERSION_ES6` flag enabled.

Note that Rhino 1.8 brings many improved JS capabilities. Unless you have a specific requirement to run your script on Minecraft 1.16.5, you shouldn't feel restrained/put off in making use of these new features in the name of compatibility.