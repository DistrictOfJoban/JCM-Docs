---
block_ids:
- jsblock:rv_pids_sil_2
since: 1.1.0
image: JCM_rv_pids_sil_2.png
item_group: JCM Blocks - PIDS
creator: AmberFrost
transparent: true
light_level: 5
recipes:
- jsblock:rv_pids_sil_2
---

A **Railway Vision PIDS (SIL, Admiralty & South Horizons Station Variant)** is a block in Joban Client Mod which replicates the PIDS display seen in **Admiralty** and **South Horizons** station in the MTR South Island Line.

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
        <div><img src="../crafting/Minecraft_Black_concrete.png"></div>
        <div><img src="../crafting/Minecraft_Glowstone_dust.png"></div>
        <div><img src="../crafting/Minecraft_Black_concrete.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="8">
        <img src="../crafting/JCM_Item_Rv_pids_sil_2.png">
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
|Version|Changes Made|
|:------|:-----------|
|v1.1.2|Added Railway Vision PIDS (SIL 2)|
|v1.1.4|Added [PIDS Preset](../features/jcm-pids.md#pids-preset) Support|
|v1.1.8|Added Platform Selection Support|
|v2.0.0|Rename `jsblock:pids_rv_sil_2` to `jsblock:rv_pids_sil_2`|