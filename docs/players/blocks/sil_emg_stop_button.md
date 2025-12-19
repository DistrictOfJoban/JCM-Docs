---
block_ids:
- jsblock:sil_emg_stop_button
since: 1.1.1
image: JCM_sil_emg_stop_button.png
item_group: JCM Blocks
creator: AmberFrost
transparent: false
light_level: 8
recipes:
- jsblock:sil_emg_stop_button
---

An **Emergency Train Stop Button (SIL)** is a block in Joban Client Mod that replicates the emergency stop button seen in stations along the MTR South Island Line.

## Usage
Right clicking the block would emit a redstone signal for 20 in-game ticks (or 1 second).

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/JCM_Item_Tcl_emg_stop_button.png"></div>
        <div></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Green_dye.png"></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="4">
        <img src="../crafting/JCM_Item_Sil_emg_stop_button.png">
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
| v1.1.1  | Added Emergency Train Stop Button (SIL)                                                                    |
| v1.1.5  | Now extends ThirdBlockBase, no longer replace blocks above                                                 |
| v2.0.0  | Right clicking now emits a redstone signal<br>Rename `jsblock:helpline_6` to `jsblock:sil_emg_stop_button` |