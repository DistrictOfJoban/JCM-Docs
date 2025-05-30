---
block_ids:
- jsblock:tcl_emg_stop_button
since: 1.0.0
image: JCM_tcl_emg_stop_button.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 0
recipes:
- jsblock:tcl_emg_stop_button
---

An **Emergency Stop Button** is a wall-attached block, replicating the Emergency Stop Button seen in Tung Chung Line stations.

## Usage
Right clicking the block would emit a redstone signal for 20 in-game ticks (or 1 second).

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="4">
        <img src="../crafting/JCM_Item_Tcl_emg_stop_button.png">
    </div>
</div>

## Block states
| facing | unpowered |
|:-------|:----------|
| north  | true      |
| east   | false     |
| south  |           |
| west   |           |

## History
| Version | Changes Made                                                                                               |
|:--------|:-----------------------------------------------------------------------------------------------------------|
| v1.0.0  | Added Emergency Stop Button (TCL)                                                                          |
| v2.0.0  | Right clicking now emits a redstone signal<br>Rename `jsblock:emg_stop_1` to `jsblock:tcl_emg_stop_button` |