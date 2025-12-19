---
block_ids:
- jsblock:helpline_standing
since: 1.0.6
image: JCM_helpline_standing.png
item_group: JCM Blocks
creator: AmberFrost
transparent: false
light_level: 15
recipes:
- jsblock:helpline_standing
---

A **Helpline (Standing)** is a block in Joban Client Mod acting as a machine to request assistance from station staff.

This variant is seen in MTR stations.

## Usage
Right clicking the block would emit a redstone signal for 20 in-game ticks (or 1 second).

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/JCM_Item_Helpline_1.png"></div>
        <div></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="4">
        <img src="../crafting/JCM_Item_Helpline_standing.png">
    </div>
</div>

## Block states
| facing | third  | unpowered |
|:-------|:-------|:----------|
| north  | lower  | true      |
| east   | middle | false     |
| south  | upper  |           |
| west   |        |           |

## History
| Version | Changes Made                                                                                             |
|:--------|:---------------------------------------------------------------------------------------------------------|
| v1.0.6  | Added Helpline (Standing)                                                                                |
| v1.1.4  | Improved Helpline (Standing) texture                                                                     |
| v2.0.0  | Right clicking now emits a redstone signal<br>Rename `jsblock:helpline_4` to `jsblock:helpline_standing` |