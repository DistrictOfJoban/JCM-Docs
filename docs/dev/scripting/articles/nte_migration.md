## Background
The **[Nemo Transit Expansion](https://modrinth.com/mod/mtr-nte)** is an addon mod for the Minecraft Transit Railway 3.x version, which adds high performance OBJ rendering as well as scripting ability. While the former is merged into MTR 4.x, the latter is not. The scripting ability in JCM *can be considered* as the successor to NTE's scripting ability, inheriting the same script engine (Rhino) and design paradigm for it's API.

The end goal is for the scripting feature to be made available for MTR 4's Vehicle and Eyecandy, while allowing other form of scripting to added by addon mods.

## Note on backward compatibility
!!! warning "Important!"
    This policy does not apply to any NTE derivative fork, such as ANTE (Aphrodite's Nemo's Transit Expansion).  
    For ANTE specifically, see [Migrating from ANTE](#migrating-from-ante)

Backward compatibility with NTE scripts are made on a best-effort basis, in the sense that we won't go out of our way to intentionally break existing scripts, and we will add stub/redirect methods to retain existing script compatibility. However if a major redesign has occured for reasons outside of our variable (e.g. Internal workings of MTR 4), we are not able to provide full backward compatibility for scripts.

## Eyecandy Migration
### Feasibility of migrating
Before continuing with the migration process, it is important to understand whether your script will have any chance of migrating to MTR 4 in the first place.

Listed below are several situations in which it may become a potential roadblocker to migrate your script to MTR 4.  
If you think any of the below suits the situation for your script, you should **expand it** to see the instructions.

If you managed to get pass all questions, it likely means that your script have a high feasibility of being able to migrate to JCM.

??? note "My script makes use of advanced Java classes (Anything outside of AWT/MTR)."
    Please check whether the newly introduced API like [**Networking**](../networking.md) and [**Files**](../files.md) replace your need?

    - **If yes:** You should migrate to use these new API. (*-Continue to next situation-*)
    - **If no:**
    - - If you think your use case should be included in the API, please open an [issue](https://github.com/DistrictOfJoban/Joban-Client-Mod/issues) for it to be added in JCM.
    - - Otherwise if you think your use case is special enough, you would need to turn off **Scripting Restrictions** in JCM Settings, as well as telling your player to do the same.

??? note "My script makes use of ANTE-specific features."
    Does your script make use of the eyecandy's custom config/GUI features in ANTE?

    - **If yes:** Unfortunately these features aren't available in JCM at the moment.
    - **If no:** Please check whether the features described in the [**ANTE section**](#migrating-from-ante) covers your use case?
    - - **If yes:** You will need to migrate your script to these methods/functions.
    - - **If no:** Unfortunately these features aren't available in JCM at the moment.

??? note "My script would process/manipulate model after loading them."
    Does your script only manipulates the `flipV` settings in the model / Replace a texture of a flat surface?

    - **If yes:**
    - - `flipV` is provided as a parameter when loading model via [ModelManager](../resources.md#model-loading).
    - - Replace texture isn't possible at the moment, *however* you can draw a quad in script and a bind a texture to it, which should achieve a similar effect and act as a substitute to replacing the texture of a flat face.
    - **If no:**
    - - Unfortunately these features aren't available in JCM at the moment. You may have to split your obj model into different parts instead of processing them directly in scripts.

??? note "My script make use of the BVE CSV/OpenBVE Animated models."
    You need to migrate to OBJ model as CSV/Animated are not supported in MTR 4.

??? note "My script access the internal of MTR Mod (e.g. Use of MTRClientData)."
    You will need to look in the MTR 4 codebase to adapt the changes to your script.  
    For MTRClientData in MTR 4, see [MinecraftClientData](https://github.com/Minecraft-Transit-Railway/Minecraft-Transit-Railway/blob/master/fabric/src/main/java/org/mtr/mod/client/MinecraftClientData.java).

### Eyecandy Script Registration
Existing NTE eyecandy registration will continue to work. (`scriptFiles`/`scriptTexts` within an NTE eyecandy json).

If you wish to migrate to the new MTR 4 format however, please note that there are some slight difference in registration, see below for comparisons:

=== "NTE Eyecandy JSON"
    ```json hl_lines="4-5" title="example.json" linenums="1"
    {
        "psd_door": {
            "name": "Platform Screen Door (TML)",
            "scriptTexts": ["const targetPlat = \"auto\""],
            "scriptFiles": ["mtr:custom_directory/js/eyecandy/psd/door.js"]
        }
    }
    ```

=== "MTR 4 Custom Resources"
    ```json title="mtr_custom_resources.json" hl_lines="7-10" linenums="1"
    {
        ...
        "objects": [
            {
                "id": "psd_door",
                "name": "Platform Screen Door (TML)",
                "scripting": {
                    "prependExpressions": ["const targetPlat = \"auto\""],
                    "scriptLocations": ["mtr:custom_directory/js/eyecandy/psd/door.js"]
                }
            }
        ]
    }
    ```

### DisplayHelper
Backward compatibility for DisplayHelper (`display_helper.js` / `mtrsteamloco:scripts/display_helper.js`) has been added since JCM v2.1.0.

Eyecandy scripts making use of DisplayHelper should just work out of the box without the need for any migration process. (Of course other parts of your script may still need updating)

If you wish to not rely on this compatibility layer (At this very moment you don't have to!), make the following changes to your code:
```diff title="example.js"
-   ctx.drawModel(state.dh.model, null);
+   for(let drawCall of state.dh.drawCalls()) {
+       ctx.renderManager().queue(drawCall);
+   }
```

## Vehicle Migration
### Feasibility of migrating
**Vehicle scripting is not yet ready at the moment.** Unfortunately you will have to wait a bit longer in the future.

## Migrating from ANTE
**[Aphrodite's Nemo's Transit Expansion](https://modrinth.com/mod/mtr-ante)** (ANTE) is a fork of the Nemo Transit Expansion, which brings several new features such as rail tilting and some new scripting abilities.

Note that the additional features within ANTE is not considered (at least for now) within the scope of JCM scripting, and therefore we may not make any guarentee about backward compatibility with ANTE, and some features were delibrately not implemented as they aren't deemed fit in JCM. *That said* some features from ANTE were also recognized and adapted to JCM, which should make migration work just a tad bit easier.

### Scripting Engine
ANTE currently uses [GraalJS](https://www.graalvm.org/latest/reference-manual/js/) in place of the [Rhino](https://github.com/mozilla/rhino) JavaScript Engine, which provides support for more modern JS syntax, at the cost of some incompatibilities introduced. For compatibility reasons (And the need to support 1.16), JCM will currently stay on the **Rhino** engine. If you make heavy use of modern JS syntax, unfortunately you may have to try your luck.

Newer version of Rhino (Namely 1.8 and above, employed for MC 1.17+) makes a more marginal leap to modern JS features, though still arguably outdated in the rapidly changing environment of the web. See the [Rhino compatibility table](https://mozilla.github.io/rhino/compat/engines.html) for details.

### Registry Access (CONFIG_INFO)
ANTE exposes the corresponding registry entry (i.e. The JSON object within a Train/Eyecandy entry) to scripts via the `CONFIG_INFO` variable.

JCM on the other hand exposes only the (`scriptInput` for NTE/`scripting`.`input` for MTR 4) field to scripts via the `SCRIPT_INPUT` variable.

??? question "Why not just expose the entire registry object?"
    While it may seem counterintuitive that you have to repeatedly specify a value at times, it's done this way to ensure that all the dependencies (fields) the script needs are in one place, anyone reading the json can immediately tell apart which variables may alter the script execution and which doesn't. You are also not imposed by any upstream format change or restrictions in your field's name.

#### Migration Example

=== "NTE Eyecandy Format"
    When using the NTE Eyecandy format (Individualized json file), put the necessary variables within `scriptInput`.

    ```diff title="eyecandy.json"
    {
        "nte_lcd": {
            "name": "NTE LCD Test",
            "scriptFiles": ["mtrsteamloco:eyecandies/js/nte_lcd_test/main.js"],
    -       "parameters": {
    -           "stDay": "310",
    -           "ksDay": "514"
    -       }
    +       "scriptInput": {
    +           "name": "NTE LCD Test",
    +           "parameters": {
    +              "stDay": "310",
    +              "ksDay": "514"
    +          }
    +       }
        }
    }
    ```

=== "MTR 4 Custom Resources Format"
    When using the MTR 4 Custom Resources Format, the corresponding field is `input` within `scripting`.

    ```diff title="mtr_custom_resources.json"
    {
        "objects": [
            {
                "id": "nte_lcd",
                "name": "NTE LCD Test",
                "scripting": {
                    "scriptLocations": ["mtrsteamloco:eyecandies/js/nte_lcd_test/main.js"],
    +               "input": {
    +                   "name": "NTE LCD Test",
    +                   "parameters": {
    +                      "stDay": "310",
    +                      "ksDay": "514"
    +                   }
    +               }
                }
            }
        ]
    }
    ```

Then rename `CONFIG_INFO` to `SCRIPT_INPUT` within the script.
```diff title="script.js"
- print(CONFIG_INFO.name); // NTE LCD Test
- print(CONFIG_INFO.parameters.stDay) // 310
- print(CONFIG_INFO.parameters.ksDay) // 514
+ print(SCRIPT_INPUT.name); // NTE LCD Test
+ print(SCRIPT_INPUT.parameters.stDay) // 310
+ print(SCRIPT_INPUT.parameters.ksDay) // 514
```

### Custom shapes for eyecandy
In ANTE, you would invoke `BlockEntityEyeCandy.setShape(shape: string)` and `BlockEntityEyeCandy.setCollisionShape(shape: string)` to set the outline and collision shape of the eyecandy, and then invoke `BlockEntityEyeCandy.sendUpdateC2S` to sync it to the server.

In JCM, the key differences are:

- JCM scripting is completely client-side, therefore custom collision shape is not supported as it would de-sync from the server.
- Shapes are now serialized with [VoxelShape](../mc.md#voxelshape) rather than string, which provides more intuitive API and better guard against errors.
- `BlockEntityEyeCandy.setShape` has now moved to `EyeCandyScriptContext.setOutlineShape`
- When a player is holding a brush, it would always reset to the default outline block shape to ensure operators/admin can't be 'locked out' due to a block shape that is infeasible to right click on.

#### Migration example
```diff title="example.js" linenums="1"
function render(ctx, state, eyeCandyBlockEntity) {
-   eyeCandyBlockEntity.setShape("0,0,0,8,8,8/7,0,7,12,16,10");
-   eyeCandyBlockEntity.sendUpdateC2S();
+   const shape1 = VoxelShape.create(0, 0, 0, 8, 8, 8, eyeCandyBlockEntity.facing());
+   const shape2 = VoxelShape.create(7, 0, 7, 12,16,10, eyeCandyBlockEntity.facing());
+   ctx.setOutlineShape(shape1.combine(shape2));
}
```

### Block Use Event
In ANTE, the `use` function would be invoked with 4 parameters: `ctx, state, eyecandyBlockEntity, player` when a player right click on it with anything other than an MTR Brush.

In JCM, you would have to check the event by yourself within the `render` function.

#### Migration Example
```diff title="example.js" linenums="1"
function render(ctx, state, eyeCandyBlockEntity) {
+   if(ctx.events().onBlockUse.occurred()) {
+       let eventDetail = ctx.events().onBlockUse.detail();
+       print(`Player at ${eventDetail.player().pos().x()}, ${eventDetail.player().pos().z()} right clicked the block!`);
+   }
+   ctx.events().handled(); // Important, this resets the event state!
}

-   function use(ctx, state, eyeCandyBlockEntity, player) {
-       print(`Player at ${player.getPosition().getX()}, ${player.getPosition().getZ()} right clicked the block!`);
-   }
```

### ComponentUtil
ANTE allows creating Raw Minecraft Text Component with the use of `ComponentUtil`. JCM instead creates a wrapper for the Component via [VanillaText](../mc.md#vanillatext).

#### Migration Example
```diff title="example.js" linenums="1"
function render(ctx, state, eyecandyBlockEntity) {
    ...
-   let component = ComponentUtil.translatable("text.aph.is", "A", "B");
-   let str = ComponentUtil.getString(component);
+   let component = VanillaText.translatable("text.aph.is", "A", "B");
+   let str = component.getString();
}
```

### WrappedEntity
ANTE uses WrappedEntity to represent a Minecraft entity, which is obtainable via the `use` event and `MinecraftClient.getPlayer()`.  
JCM provides [PlayerEntity](../mc.md#playerentity) as the wrapper to represent a Minecraft entity, which contains a couple more methods to obtain information. The client player can be obtained with `MinecraftClient.localPlayer()` instead of `MinecraftClient.getPlayer()`

#### Migration Example
```diff title="example.js" linenums="1"
function render(ctx, state, eyecandyBlockEntity) {
    ...
-   let clientPlayer = MinecraftClient.getPlayer();
-   let playerPos = clientPlayer.getPosition();
+   let clientPlayer = MinecraftClient.localPlayer();
+   let playerPos = clientPlayer.pos();
}
```