# Scripting Documentation
JCM Scripting is a feature introduced in **JCM v2.0.0**, it serves as a testbed for scripting in MTR 4.  
One may consider this as an unofficial continuation of the scripting feature in [Nemo Transit Expansion](https://modrinth.com/mod/mtr-nte).

!!! warning "Work In Progress"
    Please note that feature parity with NTE is still not complete.

## Introduction
### What is Scripting in JCM?
Essentially it allows you to use JavaScript to insert custom logic into the game, which will be executed and widens the possibilities of the MTR Mod.

To understand scripting in JCM, we should understand **Script Type** first.

### Script Type
#### Understand Script Type by Analogy
To better understand **Script Type**, let's imagine the following:

- Script Type = **Booth**
- Scripting Engine = **Venue**
- JCM Scripting = **Exhibiton Event**
- JCM = **Exhibiton Organizer**

Within the exhibition **(JCM Scripting)**, there are multiple booths **(Script Type)**. There are no "one way" to interact with a booth **(Script Type)** as each booth is setup different. However each booth still have a predefined plot size and a specific entrance direction that the visitor expects **(Common function calls)**.

All booths **(Script Type)** may take advantage of the common facilities provided by the venue **(Scripting Engine)** such as air-con & lighting **(Base JavaScript API)**, and anything that an exhibition organizer provides **(Some shared script APIs/Utilities provided by JCM)**.

#### Understand Script Type by example
As an example, here's a snippet of 2 types of script: **Eyecandy Scripting** and **PIDS Scripting**:

=== "Eyecandy Scripting"
    ```js
    const poleModel = ModelManager.loadModel(Resources.id("mtr:example/pole.obj"), true);

    function render(ctx, state, eyecandyBlockEntity) {
        // Define draw call to submit
        let modelDrawCall = ModelDrawCall.create()
            .modelObject(poleModel)

        // Render pole model
        ctx.renderManager().queue(modelDrawCall);
    }
    ```

=== "PIDS Scripting"
    ```js
    function render(ctx, state, pidsBlockEntity) {
        // Render Hello World text to PIDS
        Text.create()
        .text("Hello World!")
        .color(0xFFFFFF)
        .draw(ctx);
    }
    ```

    !!! note
        The **Text** in this instance is only made available for PIDS Scripting, this does not exist in Eyecandy Scripting!

You'll notice that function name (and number of parameters) are the same across script types (The `render` function), however the parameter values passed to them are different (`pidsBlockEntity` vs `eyecandyBlockEntity`).

Different types of script can also expose different classes/objects to them (e.g. PIDS Scripting's **Text** class), and they may impose their own design paradigm.

??? info "TLDR (Too long to read :D)"
    JCM Scripting is a foundation to serve different types of scripting. The use case and possibilities of scripts is defined by the different type of scripting available.

### Available Script Types
JCM currently provides 2 (functional) script types out of the box.

If you are looking to *get started* on scripting, check out the script types below to see more details.  
*Otherwise if you would like to learn more about how scripting in JCM works, keep on reading!*

|Type|Description|Source|
|-|-|-|
|[Eyecandy Scripting](./type/eyecandy/index.md)|This allows scripts to render 3d models/quads, as well as playing sounds on an MTR Decoration Object|MTR (via JCM)|
|[PIDS Scripting](./type/pids/index.md)|This allows scripts to draw custom text/texture, as well as playing sounds for a JCM PIDS in the form of a PIDS Preset|JCM|

??? info "Third party Script Types"
    Note that additional script types can be registered by 3rd party mod developers. In that case, they should be responsible for documenting how their specific type of scripting works, and how developers may make use of them. Those won't be covered in this documentation.

### What is JavaScript?
JavaScript is a programming language that... in very simple terms, instructs computer to do stuff :D

It can describe logic, an example would be:  
<u>If</u> there's pineapple on top of the pizza, <u>then</u> remove the pineapple and eat the pizza, <u>otherwise</u> eat the pizza.

This rest of this article assumes that you have a basic understanding of JavaScript and JavaScript types, so it won't delve into the basic syntax and other aspects of it here.

You can learn JavaScript from resources on the web, such as [here](https://javascript.info/).

### The Nature of Scripting in JCM
While JavaScript is commonly associated with webpages or even server applications (via Node.js), JCM's implementation of JavaScript only utilize the base language itself.

As such, this means that you only really need to care about the syntax (e.g. Variable & Function Declaration, conditional logic) as well as base object such as [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date). Other stuff such as HTML/CSS/DOM manipulation <u>does not apply</u> to JCM Scripting.

Keep that in mind, as IDE (Such as Visual Studio Code) may assume you are developing for a webpage and provides suggestions that are not applicable to JCM/NTE scripting!

#### FAQs
??? question "Do I have to learn Java to write JavaScript?"
    JavaScript does not have anything, or not much to do with Java at all, even though they share "Java" in the name.

??? question "But can I use Java in JavaScript?"
    Under normal circumstances, no.

    *However* the JavaScript Engine that JCM/NTE uses, **Rhino**, *do* allow using classes from the standard Java library as `java.package.name`.

### Script Flow

#### Initial Parsing
Instead of each train or block having it's own script instance, your JS scripts are parsed (Or rather, executed) **once** during the resource pack loading.

Your script are expected to have functions with specific name (e.g. `create()`, `render()`, `dispose()`).

These functions will be invoked by JCM/NTE with the parameter corresponding to a specific train/eyecandy/object, including a parameter (**state**) where you can store variables to that specific train.

Consider the following example of scripting applied to a train:

``` js
let displaySpeed = 1;

function create(ctx, state, train) {
     state.displaySpeed = 0.75;
}

function render(ctx, state, train) {
     state.displaySpeed += 1; // Increment 1
     print("dp: " + state.displaySpeed);
}

function dispose(ctx, state, train) {
}

print(displaySpeed);
```
An example output would be:
```
1 // The print(displaySpeed) located at the bottom of the script, as the entire script is executed once during resource reload

/* Join games, Train A enters into view */

dp: 1.75 // Train A rendering
dp: 2.75 // Train A rendering

// Assume Train B now enters the view, alongside Train A

dp: 3.75 // Train A rendering
dp: 1.75 // Train B rendering

dp: 4.75 // Train A rendering
dp: 2.75 // Train B rendering
```

#### Execution
An example flow is available below. This chart assumes the player is running Minecraft at 13fps (For simplicity sake), which means 13 frames in 1 second.

![JCM Script Execution Example](img/JCM_Script_Execution_Example.png)

Immediately you may have noticed the following thing:

#### Scripts are executed asynchronously
This means that the script runs in the background and does not prevent the game from continue rendering (Therefore, less fps lag).

!!! warning
     This does not mean you can freely block script execution or run some `Thread.Sleep`, as you would then be blocking the script execution thread, making others (and your) script run slower!

#### Scripts are executed every frame
More precisely, the `render()` function is executed every frame.

If there's a lag spike (Seen in **Frame 8**), your script would be not be called until the next frame came around, which is 154ms later in the above example.

As such, you should not assume that your function will always be called "x times per second", or "xx ms after the last one".

This also means that if you increment a variable by a fixed amount for each frame, that increment speed won't be the same if the fps is higher/lower.

[Delta timing](https://en.wikipedia.org/wiki/Delta_timing) is used to solve this by obtaining the time since last frame, which can then be used to balance out the value.

#### Except they aren't always executed every frame!
While JCM *tries* to call the `render()` function for every frame, it is only made on a best-effort basis. If your script has not finished executing before the next frame came around, then your function won't be called again until it has finished execution.

### Errors

!!! note inline end
     Script errors are currently not displayed within the game (Like NTE had with debug mode), you need to check for errors in the game log, usually accessible by your launcher

If the script is executed incorrectly, an error will be reported in the Minecraft log (Starting with `[Scripting] Error executing script!`).

The error message will indicate which line of code in which script file the error occurred. Most launchers have the ability to display logs in a separate window in real time.

The script execution engine will then pause the entire script for 4 seconds before trying to execute the function again.

### How to read this document
As you know, values ​​in JS have different types. When calling a function, you must pass parameters of the appropriate type, and the result it returns will also have a type. In this article, all of the functions have their parameter and return types stated.

This scripting documentation will follow the following example:

```
static Resources.id(idStr: string): Identifier
```

- `static` means that you don't need to create an object to use this function, you can call `Resources.id("aaa:bbb")` directly.
- `idStr: string` means that the `idStr` parameter accepts a string.
- `: Identifier` means that a function call will return a value of type `Identifier`.

And here's another example:
```
Matrices.rotateX(radian: float): void
```

- The lack of `static` means that an object instance is required to execute the function. For example, if `a` is an object of Matrices type, then the function can be called as `a.rotateX(Math.PI)`.
- `radian: float` means that the parameter takes a numeric argument. Although JS does not distinguish between integers and fractional numbers, this article will specify a specific type - `int`, `long`, `float` or `double` - to make it clear whether a parameter can accept decimal parts and to what precision.
- `: void` means that the function has no return value.

### Tips & Notes

See [Tips & Notes](./articles/tips.md)

### Including Other Scripts
By calling the function below, you can include and execute other JavaScript files.

|Functions|Description|
|:--------|:----------|
|`static include(relPath: String): void`|Loads and runs another JS file relative to the current JS file.|
|`static include(path: Identifier): void`|Loads and runs the JS file by location in the resource pack.<br>For example: `include(Resources.id(“mtr:path/absolute.js”))`.|