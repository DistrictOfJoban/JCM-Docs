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

## Calling Java Class Methods
### Introducing overloading in Java
In Java, a class can have several methods with different parameter types sharing the same identifier/name; this is known as overloading. Usually, they were designed to achieve the same result. The method to call is determined by the types of the arguments passed.

Upon calling a Java class method in JavaScript, Rhino will convert the arguments from JavaScript types into Java types according to the declaration of the preferred methods.

To be a preferred method, it must...

1.  Have the same number of parameters as the number of arguments given
2.  Have all the parameters type convertible from the arguments given
3.  Have a higher order of preference for its parameters compared to other methods

??? warning "Order of preference may become ambiguous"
    The order of preference of two or more methods may level out. For example, 
    ```java
    /*1.*/ g(java.lang.String, int)
    /*2.*/ g(int, java.lang.String)
    ```
    ```js
    g(3, 4)  // Type signature (number, number)
    ```
    Since neither method is closer to the argument types than the other, Rhino will throw an error.

The order of preference is specified. Since numbers are often causing problems, an order of preference of number is attached here.

??? info "Java argument type in decreasing order of preference"
    1. double
    2. java.lang.Double
    3. float
    4. long
    5. int
    6. short
    7. char
    8. byte
    9. java.lang.String
    10. java.lang.Object

Sometimes, arguments may not be converted as expected. For example, a number `11` is converted into double regardless of whether a decimal place is not provided. End up referring to a different method, which may raise an error. Developers should take extra care with argument conversion.

You may refer to...

- [Rhino's Tutorials #Calling Overloaded Methods](https://rhino.github.io/tutorials/scripting_java/#calling-overloaded-methods) for the details of Rhino's runtime overload resolution.
- [Java Method Overloading and LiveConnect 3](https://web.archive.org/web/20110623074154/http://www.mozilla.org/js/liveconnect/lc3_method_overloading.html) for a more precise definition of overloading semantics.

### Example
The Java AWT class [`Color`](https://docs.oracle.com/javase/8/docs/api/java/awt/Color.html) has the following constructors.

``` java
/*1.*/ Color(ColorSpace cspace, float[] components, float alpha)
/*2.*/ Color(float r, float g, float b)
/*3.*/ Color(float r, float g, float b, float a)
/*4.*/ Color(int rgb)
/*5.*/ Color(int rgba, boolean hasalpha)
/*6.*/ Color(int r, int g, int b)
/*7.*/ Color(int r, int g, int b, int a)
```

Calling Java constructors in JavaScript:

```js
let colorFromConstructor4 = new Color(2638978); // Type signature (number) pairs with 4. (int)
let colorFromConstructor5 = new Color(0x7FFFFFFF, true); // Type signature (number, boolean) pairs with 5. (int, boolean)
let colorAutoConverted = new Color("0x80B846"); // String is converted to integer for constructor 4, as it has 1 parameter, matched the no. of arguments given
let colorFromConstructor2 = new Color(1, 1, 1); // Number is converted to float, as float has higher order of perference than intger, regardless of whether a decimal place is not provided.

let colorFromNoConstructor = new Color(); // It does not pair with any constructor
// Error! com.lx862.mtrscripting.lib.org.mozilla.javascript.EvaluatorException: Java constructor for "java.awt.Color" with arguments "" not found.
```

!!! warning "Possible misunderstanding while reading error messages"
    Developers **should** also consider of **wrong arguments type** when encountering any method not found errors. As instead of directly indicating that the argument types are incorrect, Rhino report that the required method with the specific type signature is not found. (...with arguments XXX **not found**.) 

### Explicit Method Specification
From the example of calling the constructor 2 above, you may already see that, JavaScript number may not be converted to a Java type as expected. So, alternatively, Rhino/LiveConnect3 provided a way to specific the method to use, bypassing the resolution process.

To specify the method, call it as a key of an object, with the type signature suffixed.

```js
let colorFromConstructor6 = new Color["(int,int,int)"](40, 68, 130); // No identifer for constructors
graphics["drawString(java.lang.String,int,int)"]("Overload resolution", 15, 60);
```

!!! note
    1. Methods/Constructors identifier are case-sensitive
    2. Leave the identifier blank for a constructor
    3. Only fully qualified name (`java.lang.String`) is accepted, simple name (String) is not accepted

At least, good luck on avoiding "method not found" error! ^_^

## What JavaScript features are supported?
The Rhino JavaScript Engine **does not support** all of the latest JavaScript features. See [Mozilla's documentation](https://mozilla.github.io/rhino/compat/engines.html) for details on what is supported.

- **For Minecraft 1.17+**, JCM uses Rhino **1.8.0** with the `VERSION_ES6` flag enabled.
- **For Minecraft 1.16.5**, JCM uses Rhino **1.7.15** with the `VERSION_ES6` flag enabled.

Note that Rhino 1.8 brings many improved JS capabilities. Unless you have a specific requirement to run your script on Minecraft 1.16.5, you shouldn't feel restrained/put off in making use of these new features in the name of compatibility.