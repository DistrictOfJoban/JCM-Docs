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
MTR uses the station naming format `Name in one language|Name in another language||EXTRA`, so TextUtil is implemented to provide functions to separate these parts.

|Functions|Description|
|:--------|:----------|
|`static TextUtil.cycleString(src: String): String`|Returns a text that cycles different languages. (Delimited by the pipe `<nowiki>|</nowiki>` character)|
|`static TextUtil.cycleString(src: String, duration: int): String`|Returns a text that cycles different languages. (Delimited by the pipe `<nowiki>|</nowiki>` character)<br>The cycle frequency is decided by the `duration` parameter, in Minecraft Tick.|
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
|`StateTracker.setState(value: string): void`|Sets the new state.|
|`StateTracker.stateNow(): string`|Returns the current state.|
|`StateTracker.stateLast(): string?`|Returns the previous state. If it does not exist, `null` is returned.|
|`StateTracker.stateNowDuration(): double`|Returns the amount of time the current state lasts.|
|`StateTracker.stateNowFirst(): boolean`|Was the state just changed by the `setState` function in this loop or not?|

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

## MinecraftClient
Due to obfuscation, there is no way to directly provide a client class for use. Therefore, several helper methods are created:

|Functions|Description|
|:--------|:----------|
|`static MinecraftClient.worldIsRaining(): boolean`|Is it raining in the world?|
|`static MinecraftClient.worldIsThundering(): boolean`|Is it thundering in the world?|
|`static MinecraftClient.worldIsRainingAt(pos: Vector3f): boolean`|Is it raining and getting wet in a given chunk?|
|`static MinecraftClient.worldDayTime(): int`|Returns the in-game world time in ticks.|
|`static MinecraftClient.narrate(message: string): void`|This calls the Minecraft narrator to narrate the message.|
|`static MinecraftClient.displayMessage(message: String, actionBar: boolean): void`|This displays the message as an in-game chat message. If action bar is true, it will display on the action bar instead. (Above inventory hotbar)|

## Networking
The `Networking` class allows scripts to send HTTP requests to fetch plain text content/images over the internet.

Calling any function within this class will return a **NetworkResponse**, which is described below.

If the HTTP request fails, an error will be thrown. Consider using `try/catch` block to handle script errors. **(This behaviour may change in the future!)**

|Functions|Description|
|:--------|:----------|
|`static Networking.fetchString(url: string): NetworkResponse<String>`|Fetch plain text content from the corresponding URL|
|`static Networking.fetchString(url: string, requestOption: RequestOption): NetworkResponse<String>`|Fetch plain text content from the corresponding URL, with the request option applied. (See below for RequestOption)|
|`static Networking.fetchImage(url: string): NetworkResponse<BufferedImage>`|Fetch image from the corresponding URL|
|`static Networking.fetchImage(url: string, requestOption: RequestOption): NetworkResponse<BufferedImage>`|Fetch image from the corresponding URL, with the request option applied. (See below for RequestOption)|

### RequestOption
This is a **JavaScript Object** that specifies connection-related details.

|Field Name|Type|Description|
|:---------|:---|:----------|
|`method`|string|The [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) used. Default to `GET`|
|`connectionTimeout`|number|Specify the max timeout in millisecond when sending the HTTP request.|
|`readTimeout`|number|Specify the max timeout in millisecond when retrieving data from an HTTP request.|
|`headers`|object|A JavaScript object which contains the HTTP header to apply when sending the request.|
|`body`|string|The request body to send. This is typically used for HTTP `POST` request.<br>**Note:** The <u>Content-Length</u> header will be automatically set if this field is supplied.|

### NetworkResponse
|Functions|Description|
|:--------|:----------|
|`NetworkResponse.getResponseCode(): int`|Get the HTTP Response Code, a list can be found [here](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).|
|`NetworkResponse.getData(): ?`|Obtain the fetched data. This could be either a string, or an AWT BufferedImage depending on what function you invoke in HttpUtil.|
|`NetworkResponse.getHeaders(): Map<String, List<String>>`|Obtain the headers in the HTTP response|

### Example
``` js
/* GET request */
let dataResponse = HttpUtil.fetchString("https://api.modrinth.com/v2/project/minecraft-transit-railway");

if(dataResponse.getResponseCode() == 200) {
    let mtrProjectStr = dataResponse.getData();
    let mtrProject = JSON.parse(mtrProjectStr);
    print(`The MTR Mod is last updated on ${mtrProject.updated}`);
}

/* POST request */
let dataResponse = Networking.fetchString("https://localhost:7171", {
    method: "POST",
    connectTimeout: 1000, // in millisecond
    readTimeout: 1000, // in millisecond
    headers: {
        Accept: "application/json"
    },
    body: JSON.stringify(
        {
            key: "value"
        }
   )
});

/* GET request (image) */
let onlineImageResp = Networking.fetchImage("https://wiki.minecrafttransitrailway.com/_media/wiki:logo.png");
let onlineImage = onlineImageResp.getData();

... (AWT code)
g.drawImage(onlineImage, 0, 0, null);
```
### Further Note
Currently the **User-Agent** header is always overriden to `Joban Client Mod (https://joban.org/jcm)`.

## Files
The **Files** class allows saving/reading files with scripts to a limited degree. It is intended for scripts to use it as a config file as well as storing persistent/cache data. This is usually only useful for scripts requiring advanced functionalities.

### Scope

- Scripts can perform **Read/Write/Delete** operation under the **.minecraft/data/mtrscripting** directory. This directory is reserved for scripts to store data.
- Scripts can perform **Read** operation under **.minecraft**. This is intended to migrate existing scripts to MTR 4, which previously contains file residing on another directory. (And also to detect and provide mod compatibility for *really advanced* scripts)
- Scripts are not allowed to access anything outside the **.minecraft** directory.

|Functions|Description|
|:--------|:----------|
|`static Files.read(path: string...): string`|Read a file based on the specified path and returns the content in string (null if the file don't exist).<br>This function always resolves relatively starting from '''.minecraft'''.|
|`static Files.readData(path: string...): string`|Read a file based on the specified path and returns the content in string (null if the file don't exist).<br>**Note:** It is strongly recommended to store your file in a sub-directory with a unique name to avoid collision<br>This function always resolves relatively starting from **.minecraft/data/mtrscripting**.|
|`static Files.saveData(content: string, path: string...): void`|Create a file with the specified content in the specified path. The filename should be included in the path already.<br>All parent directory in the path will be automatically generated if it doesn't exists.<br>This function always resolves relatively starting from '''.minecraft/data/mtrscripting'''.|
|`static Files.deleteData(path: string...): void`|Delete the file from the specified path.This function always resolves relatively starting from '''.minecraft/data/mtrscripting'''.|
|`static Files.hasData(path: string...): boolean`|Returns whether the specified file/directory exists.This function always resolves relatively starting from '''.minecraft/data/mtrscripting'''.|

### Example
``` js
// Notice that we don't use forward slash (/) or backslash (\) to specify path, but instead pass them onto multiple arguments (e.g. ("config", "mtr.json") instead of ("config/mtr.json")
let mtrConfigStr = Files.read("config", "mtr.json");
let mtrConfig = JSON.parse(mtrConfigStr);
let mtrChatAnnouncementEnabled = mtrConfig.chatAnnouncements;

let nonExistentFile = Files.read("1234567890");
print(nonExistentFile); // null

/* Data reading */
let haveCompanyName = Files.hasData("tut_script", "company_name.txt");
let companyName = haveCompanyName ? "Unnamed Company" : Files.readData("tut_script", "company_name.txt"); // Of course this is an extreme example. Since readData returns null if non-existent anyway, you can just check whether it's null instead of calling hasData separately.

/* Data Saving */
Files.saveData("grass_has_been_touched", "tut_script", "stage.txt");
```
