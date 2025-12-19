---
block_ids:
- jsblock:helpline_2
since: 1.0.0
image: JCM_helpline_2.png
item_group: JCM Blocks
creator: AmberFrost
transparent: false
light_level: 0
recipes:
- jsblock:helpline_2
---

A **Help Line** is a wall-attached block in Joban Client Mod acting as a machine to request assistance from station staff.

This variant is seen in newer MTR Stations where the helpline sticker is separated from the helpline machine itself. For the variant with sticker attached, please see [Helpline (With Sticker)](./helpline_1.md)

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
        <div></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 3 -->
        <div></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="4">
        <img src="../crafting/JCM_Item_Helpline_2.png">
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
| Version | Changes Made                               |
|:--------|:-------------------------------------------|
| v1.0.0  | Added Helpline (No Sticker)                |
| v2.0.0  | Right clicking now emits a redstone signal |