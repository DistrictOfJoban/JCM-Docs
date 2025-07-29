# Joban Client Mod v2

Joban Client Mod v2 is a complete rewrite of the Joban Client Mod, designed for MTR 4.0.  
This release contains a more sizeable amount of changes compared to a regular point release, however it's designed to be a step up from JCM v1, rather than an overhaul of the entire addon.

Note that this release is not compatible with MTR 3.x and there's no plan to do so as the architecture is completely different.

## Changelogs
### Additions
- Added support for Minecraft 1.20.1 and 1.20.4. (Same as the MTR Mod)
- Added single panel variants for **MTR 2009 Ceiling** and **Ceiling Pole**.
- Added [**Fire Alarm block**](./blocks/fire_alarm.md).
- Added [**PIDS Projector**](./blocks/pids_projector.md), project PIDS screen anywhere and scale it as you wish! (Thanks *Dooji*!)
- Added [**Wall-attached Helpline (Hong Kong West Kowloon Station Variant)**](./blocks/helpline_hkwk.md).
- **Water Machine** can now fill an empty buckets with water alongside glass bottle.
- **Light Lantern** and **Spot Lamp** can now be toggled on and off via brush. (Thanks *Dooji*!)
- **Classic MTR Enquiry Machines** now has a GUI when clicked! (Thanks *Dooji*!)
- - The screen would show transactions recorded by JCM after this update.
- - Transactions including "Add Value" via Ticket Machines and exiting ticket barrier.
- **JCM Circular Tunnnel** is now available as a Rail Model, check [here](./features/tunnel.md) for usage.
- Added **it_it (Italian)** translation! (Thanks *IlFed*!)
- Added **ja_jp (Japanese)** translation! (Thanks *CinderaceOTS*!)
- Added Scripted PIDS Preset - Create custom PIDS with JavaScript!
- - Documentation and Example Pack available at the [Scripted PIDS Preset Page](../dev/pids/scripted/index.md)
- **PIDS Preset Additions**
- - JSON PIDS Preset: You can now set textOverflowMode as a property (string), possible value are `STRETCH`, `SCALE`
- - All PIDS Preset: You can now set `name` as a property (String) to show a user-friendly name shown in the UI
- - All PIDS Preset: You can now set `blacklist` as a property (String JSON Array) to prevent your preset from being used in certain PIDS:
- - - Possible values for inclusions are `rv_pids`, `rv_pids_sil_1`, `rv_pids_sil_2`, `lcd_pids`, `pids_1a`, `pids_projector`
- Add English support for [Item Descriptions](https://modrinth.com/mod/item-descriptions), short descriptions of JCM blocks will now be shown when using the mod!

## Changes
- Modifying Light Block Level now shows a little text on your screen for the modified light level.
- **Static Signal Lights** now supports getting placed diagonally, just like the Signal Lights in MTR 4.
- All **Helplines**, **Emergency buttons** & **Fire Alarm** now emits a Redstone signal when right-clicked, so you now can use this to setup your own contraption!
- Currency ($) for **Fare Saver** can now be customized!
- - Configurable via brush.
- To adapt to the new train driver key changes in MTR 4, **Operator Button** now allows choosing which driver keys are allowed.
- - Configurable via brush.
- __Block now behaves more logically__
- - For example, blocks that are attached to the wall will destroy itself along with the attached block.
- - You can no longer place blocks that are suppose to be attached to ceiling/wall without them being attached.
- __Revamped GUI (Screen)__
- - The block name, position and the station it is is now displayed.
- - A list of PIDS Preset can now be displayed, along with a search box.
- - Textbox for number can now be scrolled with mouse wheel to increment/decrement, along with an up/down button.
- - In Sound Looper, you can now directly copy and paste a coordinates (For example `123 456 -789`) and it will automatically fill in the XYZ appropriately.
- __PIDS & PIDS Preset__
- - PIDS Preset are now always consistently displayed across different PIDS and can be mix and matched. (For example, you can use the LCD PIDS Preset on RV PIDS Block, and vice-versa)
- - A new variable `topPadding` is added to custom PIDS preset, can be set to `false` to render arrivals from the very top.
- - - This is used to compensate the difference between RV PIDS and LCD PIDS in JCM v1, as now the header bar are rendered regardless of PIDS block.
- - JSON PIDS Preset background now supports **.mcmeta** animation.
- - The weather icon for RV PIDS has been remade in accordance to real life, and the blue background of the icon has been made transparent to allow more customizability.
- - The **PIDS 1A** block now supports PIDS Preset.

## Bug fixes
- Fix 1 extra second delay for the Subsidy Machine cooldown.
- Fix incompatibility with ImmediatelyFast v1.2.
- Fix PIDS Preset not working on Forge 1.19.4 and above.
- Fix DRL APG not showing up in the inventory on Forge 1.19.4 and above.
- Fix a language issue where **Signal Light (Inverted, Red-Green)** is mislabelled as **Signal Light (Inverted, Blue-Green)**.
- Fix block with multiple parts still dropping item in creative when broken.
- Now [Open Source](https://github.com/DistrictOfJoban/Joban-Client-Mod) and licensed under the MIT License, contributions are welcomed!

## Deprecated/Removed
- The JCM **Standing Station Name Block** has been moved to the official MTR Mod!
- - The JCM variant will be kept for backward compatibility, but will no longer be obtainable in the inventory.
- JSON PIDS Preset: Car Colors are not implemented in JCM v2 yet.

## Note for players(!!!)
- **JCM v2 is only built for MTR 4.0, it will not work on MTR 3.x version**
- **Updating to JCM v2 is an irreversible process as many block ID got changed in this release. JCM v2 will try to migrate the old block IDs from v1, but the opposite cannot be done. Please only upgrade with an existing world if you have a backup with the assumption that you may need to restore the backup in the future.**
- To report bugs or crashes (Please do, otherwise I may not have known this!), I would suggest opening a [GitHub issue](https://github.com/DistrictOfJoban/Joban-Client-Mod/issues/new/choose) if you have a GitHub account. Otherwise, you can also report in **#jcm-discussion** on our [Discord Server](https://joban.org/jcmdc).