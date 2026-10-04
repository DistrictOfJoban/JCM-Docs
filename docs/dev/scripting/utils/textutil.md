# TextUtil
The MTR mod uses the station naming format `Name in one language|Name in another language||EXTRA`, so TextUtil is implemented to provide functions to separate these parts.

|Functions|Description|
|:--------|:----------|
|`static TextUtil.getCjkParts(src: String): String`|Returns the CJK parts of the passed string.|
|`static TextUtil.getNonCjkParts(src: String): String`|Returns the non-CJK parts of the passed string.|
|`static TextUtil.getExtraParts(src: String): String`|Returns the extra part of the passed string.<br>Empty string if an extra part does not exist.|
|`static TextUtil.getNonExtraParts(src: String): String`|Returns everything except the extra part.|
|`static TextUtil.getNonCjkAndExtraParts(src: String): String`|Returns everything except the CJK parts.|
|`static TextUtil.isCjk(src: String): boolean`|Checks whether the string contains CJK characters.|
|`static TextUtil.cycleString(src: String): String`|Returns a text that automatically cycles between different languages. (Delimited by the pipe `|` character)|
|`static TextUtil.cycleString(src: String, duration: int): String`|Same as above, with a specified cycle duration (In Minecraft Tick).|

## Example
```js
function render(ctx, state, pids) {
    let firstArrival = pids.arrivals().get(0);
    if(firstArrival == null) return;

    let routeName = firstArrival.routeName(); // Assume returned value is "港島綫|Island Line||UP|ToCHW"

    print(TextUtil.getCjkParts(routeName)); // 港島綫
    print(TextUtil.getNonCjkParts(routeName)); // Island Line
    print(TextUtil.getExtraParts(routeName)); // UP|ToCHW
    print(TextUtil.getNonExtraParts(routeName)); // 港島綫|Island Line
    print(TextUtil.getNonCjkAndExtraParts(routeName)); // Island Line||UP_ToCHW
    print(TextUtil.isCJK(routeName)); // true
}
```