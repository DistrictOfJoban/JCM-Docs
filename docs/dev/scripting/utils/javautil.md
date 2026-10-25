# Java (Util)

This class contains some methods for better interoperability with Java code.

It is made available under the name `Java`, globally for all scripts.

Currently it provides utilities for creating native Java array, which may be required by some method arguments. (Like those in AWT Graphics)


|Functions|Description|
|:--------|:----------|
|`Java.newArray(classType: Class<?>, length: int): String?`|Create a new java array of type `classType` with length `length`.|
|`Java.newArray(classType: Class<?>, multiDimensionalLength: int[]): String?`|Create a multi-dimensional java array of type `classType`.|
|`Java.toArray(classType: Class<?>, list: List<?>): String?`|Converts a Java List to an array of type `classType`.|

## Example
``` js
let fruits = Java.newArray(java.lang.String, 3); // String array
fruits[0] = "Apple";
fruits[1] = "Orange";
fruits[2] = "Banana";

let sizeArr = Java.newArray(java.lang.Integer, 3); // Int array
sizeArr[0] = 0;
sizeArr[1] = 1;
sizeArr[2] = 2;

let array2d = Java.newArray(java.lang.Double, [3, 2]); // 2D Double Array
print(array2d.length) // 3;
print(array2d[0].length) // 2;

let fruitArrFromList = Java.toArray(java.lang.String, ["Apple", "Orange", "Banana"]); // String array from list. (Here, JS array is converted to Java list by Rhino)
```