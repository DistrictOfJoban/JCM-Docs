---
block_ids:
- jsblock:helpline_standing_eal
since: 1.0.0
image: JCM_helpline_standing_eal.png
item_group: JCM Blocks
creator: LX86
transparent: true
light_level: 0
recipes:
- jsblock:helpline_standing_eal
---

A **Helpline (East Rail Line Type)** is a block in Joban Client Mod acting as a machine to request assistance from station staff. 

This replicates the Help Line seen in stations along the MTR East Rail Line.

## Usage
Right clicking the block would emit a redstone signal for 20 in-game ticks (or 1 second).

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Yellow_dye.png"></div>
        <div><img src="../crafting/Minecraft_Yellow_dye.png"></div>
        <div></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Purple_dye.png"></div>
        <div><img src="../crafting/Minecraft_Purple_dye.png"></div>
        <div></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="4">
        <img src="../crafting/JCM_Item_Helpline_standing_eal.png">
    </div>
</div>

## Block states
| facing | half  | unpowered |
|:-------|:------|:----------|
| north  | lower | true      |
| east   | upper | false     |
| south  |       |           |
| west   |       |           |

## History
| Version | Changes Made                                                                                                 |
|:--------|:-------------------------------------------------------------------------------------------------------------|
| v1.0.0  | Added Helpline (East Rail Type)                                                                              |
| v1.1.5  | Hardness changed from 2.0 -> 5.0                                                                             |
| v2.0.0  | Right clicking now emits a redstone signal<br>Rename `jsblock:helpline_3` to `jsblock:helpline_standing_eal` |