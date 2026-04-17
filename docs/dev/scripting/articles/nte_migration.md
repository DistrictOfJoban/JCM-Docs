## Background
The **[Nemo Transit Expansion](https://modrinth.com/mod/mtr-nte)** is an addon mod for the Minecraft Transit Railway 3.x version, which adds high performance OBJ rendering as well as JS scripting for trains and decoration object. While the former feature is merged into MTR 4.x, the scripting feature remained a gap in MTR 4.

JCM Scripting is an attempt at re-implementing the NTE scripting functionality, inheriting the same script engine (Rhino) and design paradigm for it's API.

## Backward compatibility policy with NTE
!!! warning inline end "Important!"
    This policy does not apply to any NTE derivative fork, such as ANTE (Aphrodite's Nemo's Transit Expansion).  
    For ANTE specifically, see [Migrating from ANTE](#migrating-from-ante)

Backward compatibility with NTE scripts are made on a best-effort basis, in the sense that we won't go out of our way to intentionally break existing scripts, and we will add stub/redirect methods to retain existing script compatibility. However if a major redesign has occured for reasons outside of our variable (e.g. Internal workings of MTR 4), we are not able to provide full backward compatibility for scripts.

## Compatibility Overview
### Registration
- Both `mtr_custom_resources.json` and `mtr_custom_resources_pending_migration.json`, in both MTR 3 and MTR 4 format is supported.
- Eyecandy scripts registered in the old NTE format are also supported.
### API
- Most if not all functions/methods provided by NTE should continue working as-is.
    - Known Exception: `VehicleScriptContext.drawConnModel` / `VehicleScriptContext.drawConnStretchTexture` has not been re-added yet due to low demand.
- `DisplayHelper` is implemented, most DisplayHelper scripts should work out of the box without any issue.
- `DynamicModelHolder` is implemented.
- Partial misc. functions from ANTE has been added, though without backward compatibility. (New API)
- **(Important!)** Code accessing MTR 3's internal code may break. (e.g. Most common one being `route.lightRailRouteNumber` not being in MTR 4 anymore, causing instances of "undefined" in route displays.)
### Give me some statistics...
!!! note inline end "Take this with a grain of salt"
    - Test conducted in Apr 2026, before the first beta release of JCM v2.2.
    - Only versions with NTE Scripting are picked for the test, even if an updated version for MTR 4 is available.
    - Content enlisted in MTR Content DB is not representative of the work of the wider MTR community, who may choose to publish their work in other platform.
    - To prevent non-faithful comparisons between packs, the tested packs will not be listed out.

- **23** NTE (non-ANTE) packs from [MTR Content DB](https://addons.minecrafttransitrailway.com/) were tested against JCM Scripting, with the pack being unmodified.
    - **8 (~34%)** packs are able to work without any issue.
    - **6 (~26%)** packs are able to function, with minor issues. (Such as light rail route not showing)
    - **5 (~22%)** packs errored out during execution, requiring some level of migration by script developers.
    - **2 (~8%)** packs are heavily reliant on MTR 3's feature.
    - **2 (~8%)** packs are unloadable in MTR 4, thus scripting functionalities cannot be tested.

## Migration Checklist
Before continuing with the migration process, it is important to understand whether your script will have any chance of migrating to MTR 4 in the first place.

Listed below are several situations in which it may become a potential roadblocker to migrate your script to MTR 4.  
If you think any of the below suits the situation for your script, you should **expand it** to see the instructions.

If you managed to get pass all questions, it likely means that your script have a high feasibility of being able to migrate to JCM.

??? note "My script makes use of external Java classes (Anything outside of AWT/MTR)."
    JCM introduced a [Scripting Restriction feature](./scripting_restrictions.md) for security reasons.

    If the packages you use is not listed above, please check whether the newly introduced API like [**Networking**](../networking.md), [**Files**](../files.md), [**DataReader**](../data_reading.md#datareader) and [**BackgroundWorker**](../bgworker.md) replace your need?

    - **If yes:** You should migrate to use these new API. (*-Continue to next situation-*)
    - **If no:**
    - - If you think your use case should be included in the API, please open an [issue](https://github.com/DistrictOfJoban/Joban-Client-Mod/issues) for it to be added in JCM.
    - - Otherwise if you think your use case is special enough, you may need to turn off **Scripting Restrictions** in JCM Settings, as well as telling your player to do the same.

??? note "My script makes use of ANTE-specific features."
    Does your script make use of the eyecandy's custom config/GUI features in ANTE?

    - **If yes:** Unfortunately these features aren't available in JCM at the moment.
    - **If no:** Please check whether the features described in the [**ANTE section**](#migrating-from-ante) covers your use case?
    - - **If yes:** You will need to migrate your script to these methods/functions.
    - - **If no:** Unfortunately these features aren't available in JCM at the moment.

??? note "My script utilize advanced model processing techniques (MaterialProp / VertArrays etc.)"
    - Unfortunately these features aren't available in JCM at the moment.  
    `RawModel/RawMesh/RawMeshBuilder/ModelCluster` are currently already implemented, however there are no plan to expose other deeper classes like MaterialProperties / VertArrays. Please try working around them with the existing NTE model API.

??? note "My script make use of the BVE CSV/OpenBVE Animated models."
    You need to migrate to the OBJ model format as CSV/Animated is not supported in MTR 4.

??? note "My script access the internal of MTR Mod (e.g. Use of MTRClientData / Station / Route etc.)"
    You will need to look in the MTR 4 codebase to adapt the changes to your script.

    - For MTRClientData in MTR 4, see [MinecraftClientData](https://github.com/Minecraft-Transit-Railway/Minecraft-Transit-Railway/blob/master/fabric/src/main/java/org/mtr/mod/client/MinecraftClientData.java).
    - For `Route.lightRailRouteNumber`, they are no longer transferred as part of the route. Please see [VehicleExtraData](../tsc.md#vehicleextradata-stops-related) to obtain them.

Got through all of them? Great, below are some resources/tips to get started:

- Try your scripted resource pack in MTR 4 w/ JCM, enable [Script Debug Overlay](../aids/script_debug_overlay.md), and see which part it errors out, or if it works at all!
- Confused on the equivalent of `Station` and `Route` object in MTR 4? See the [Transport Simulation Core](../tsc.md) page for a type listing.
    - <sub>Note: Due to some irresistable force, Rhino is able to read protected fields for these types. Stuff such as `Station.name` will work, which incidentally make a lot of scripts compatible. Not implying it's a good practice to rely on it however...</sub>
- Data fetching mechanism is changed (Affecting `MTRClientData` and other scripts relying on client data). Please see [Data Obtaining / Fetching](../type/vehicle/index.md#data-obtaining-fetching) for more details.
- [Through conditional logic, you can support both MTR 3/NTE and MTR 4/JCM!](./mtr34scripts.md)
- [The NTE F3+5 quick reload is now Ctrl+R](../aids/script_quick_reload.md)

## Migrating from ANTE
**[Aphrodite's Nemo's Transit Expansion](https://modrinth.com/mod/mtr-ante)** (ANTE) is a fork of the Nemo Transit Expansion, which brings several new features such as rail tilting and some new scripting abilities.

Note that the additional features within ANTE is not considered (at least for now) within the scope of JCM scripting, and therefore we may not make any guarentee about backward compatibility with ANTE, and some features were delibrately not implemented as they aren't deemed fit in JCM. *That said* some features from ANTE were also recognized and adapted to JCM, which should make migration work just a tad bit easier.

### Scripting Engine
ANTE currently uses [GraalJS](https://www.graalvm.org/latest/reference-manual/js/) in place of the [Rhino](https://github.com/mozilla/rhino) JavaScript Engine, which provides support for more modern JS syntax, at the cost of some incompatibilities introduced. For compatibility reasons JCM will currently stay on the **Rhino** engine. If you make heavy use of modern JS syntax, unfortunately you may have to try your luck.

Rhino 1.9 (The current version used by JCM) makes a more marginal leap to modern JS features, though still arguably outdated in the rapidly changing environment of the web. See the [Rhino compatibility table](https://mozilla.github.io/rhino/compat/engines.html) for details.

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
    When using the MTR 4 Custom Resources Format, the corresponding field is `input` within the script object.

    ```diff title="mtr_custom_resources.json"
    {
        "objects": [
            {
                "id": "nte_lcd",
                "name": "NTE LCD Test",
                "scriptId": "nte_lcd"
            }
        ],
        "objectScripts": [
            {
                "id": "nte_lcd",
                "scriptLocations": ["mtrsteamloco:eyecandies/js/nte_lcd_test/main.js"],
    +           "input": {
    +               "name": "NTE LCD Test",
    +               "parameters": {
    +                  "stDay": "310",
    +                  "ksDay": "514"
    +               }
    +           }
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
In ANTE, you would invoke `BlockEyeCandy.setShape(shape: String)` and `BlockEyeCandy.setCollisionShape(shape: String)` to set the outline and collision shape of the eyecandy, and then invoke `BlockEyeCandy.sendUpdateC2S` to sync it to the server.

In JCM, the key differences are:

- JCM scripting is completely client-side, therefore custom collision shape is not supported as it would de-sync from the server.
- Shapes are now serialized with [VoxelShape](../mc.md#voxelshape) rather than string, which provides more intuitive API and better guard against errors.
- `BlockEyeCandy.setShape` has now moved to `EyeCandyScriptContext.setOutlineShape`
- When a player is holding a brush, it would always reset to the default outline block shape to ensure operators/admin can't be 'locked out' due to a block shape that is infeasible to right click on.

#### Migration example
```diff title="example.js" linenums="1"
function render(ctx, state, blockEyecandy) {
-   blockEyecandy.setShape("0,0,0,8,8,8/7,0,7,12,16,10");
-   blockEyecandy.sendUpdateC2S();
+   const shape1 = VoxelShape.create(0, 0, 0, 8, 8, 8, blockEyecandy.facing());
+   const shape2 = VoxelShape.create(7, 0, 7, 12,16,10, blockEyecandy.facing());
+   ctx.setOutlineShape(shape1.combine(shape2));
}
```

### Block Use Event
In ANTE, the `use` function would be invoked with 4 parameters: `ctx, state, blockEyecandy, player` when a player right click on it with anything other than an MTR Brush.

In JCM, you would have to check the event by yourself within the `render` function.

#### Migration Example
```diff title="example.js" linenums="1"
function render(ctx, state, blockEyecandy) {
+   if(ctx.events().onBlockUse.occurred()) {
+       let eventDetail = ctx.events().onBlockUse.detail();
+       print(`Player at ${eventDetail.player().pos().x()}, ${eventDetail.player().pos().z()} right clicked the block!`);
+   }
+   ctx.events().handled(); // Important, this resets the event state!
}

-   function use(ctx, state, blockEyecandy, player) {
-       print(`Player at ${player.getPosition().getX()}, ${player.getPosition().getZ()} right clicked the block!`);
-   }
```

### ComponentUtil
ANTE allows creating Raw Minecraft Text Component with the use of `ComponentUtil`. JCM instead creates a wrapper for the Component via [VanillaText](../mc.md#vanillatext).

#### Migration Example
```diff title="example.js" linenums="1"
function render(ctx, state, blockEyecandy) {
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
function render(ctx, state, blockEyecandy) {
    ...
-   let clientPlayer = MinecraftClient.getPlayer();
-   let playerPos = clientPlayer.getPosition();
+   let clientPlayer = MinecraftClient.localPlayer();
+   let playerPos = clientPlayer.pos();
}
```

### TickableSound
In ANTE, `TickableSound` is a sound instance where it's parameter (Such as volume/pitch) can be updated midway during playback.

The equivalent in JCM is [TickableSoundInstance](../sounds.md#tickablesoundinstance), which can be used together with [SoundManager](../sounds.md#soundmanager)

### UtilitiesClient

MTR 3 contains a `UtilitiesClient` class that is exposed by ANTE, which is no longer the case in MTR 4. Known equivalent methods can be found as follows:

|ANTE Scripting|JCM/MTR 4 Scripting|
|:--------------------|:----------|
|`static UtilitiesClient.getRenderDistance(): int`|`static MinecraftClient.renderDistance(): int`|
|`static UtilitiesClient.hasResource(resourceLocation: Identifier): boolean`|`static Resources.exist(id: Identifier): boolean`|