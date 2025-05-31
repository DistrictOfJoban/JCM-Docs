---
block_ids:
- jsblock:helpline_5
since: 1.1.0
image: JCM_tml_emg_stop_button.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 15
recipes:
- jsblock:tml_emg_stop_button
---

An **Emergency Train Stop Button (Standing, TML)** is a block in Joban Client Mod, modelled after the emergency train stop facility in the new MTR Hung Hom platforms.

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div></div>
        <!-- row 3 -->
        <div><img src="../crafting/JCM_Item_Tcl_emg_stop_button.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="2">
        <img src="../crafting/JCM_Item_Tml_emg_stop_button.png">
    </div>
</div>

## Block states
| facing | third  | unpowered |
|:-------|:-------|:----------|
| north  | upper  | true      |
| east   | middle | false     |
| south  | lower  |           |
| west   |        |           |

## History
| Version | Changes Made                                                                                               |
|:--------|:-----------------------------------------------------------------------------------------------------------|
| v1.1.0  | Added Emergency Stop Button (Standing, TML)                                                                |
| v1.1.5  | Now extends ThirdBlockBase, no longer replaces the block on top.                                           |