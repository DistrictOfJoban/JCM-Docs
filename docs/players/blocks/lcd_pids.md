---
block_ids:
- jsblock:lcd_pids
since: 1.0.6
image: JCM_lcd_pids.png
item_group: JCM Blocks - PIDS
creator: AmberFrost
transparent: false
light_level: 5
recipes:
- jsblock:lcd_pids
---

A **Old Tsueng Kwan O Line PIDS** is a block in Joban Client Mod which replicates the PIDS display seen along stations of the **MTR Tsueng Kwan O Line**, before being replaced with the Railway Vision PIDS display.

This block is a part of [JCM PIDS](../features/jcm-pids.md), which includes extra features such as PIDS Preset and more.

## Usage
1. Place this block down
1. 1. If near a platform, the PIDS will show the scheduled arrival for that platform.
1. 2. If away from any platform, you may manually specify platform(s) to show if the PIDS is located inside a MTR station.

## Configuring
The PIDS can be configured by right clicking the block with the **Brush** item provided by the MTR mod.

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Glowstone_dust.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="8">
        <img src="../crafting/JCM_Item_Lcd_pids.png">
    </div>
</div>

## Block states
| facing |
|:-------|
| north  |
| east   |
| south  |
| west   |

## History
| Version | Changes Made                                  |
|:--------|:----------------------------------------------|
| v1.0.6  | Added Old TKL PIDS                            |
| v1.1.2  | Support Variables                             |
| v1.1.4  | Support PIDS Preset                           |
| v1.1.8  | Support multi-platform selecting              |
| v2.0.0  | Rename `jsblock:pids_4` to `jsblock:lcd_pids` |