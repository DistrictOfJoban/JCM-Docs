---
block_ids:
- jsblock:kcr_name_sign
- jsblock:kcr_name_sign_station_color
since: 1.0.4
image: JCM_kcr_station_name_signs.png
image_desc: "Top: Normal variant<br>Bottom: Station-colored variant"
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 10
recipes:
- jsblock:kcr_name_sign
- jsblock:kcr_name_sign_station_color
---

**KCR Station Name Signs** is a series of blocks in Joban Client Mod, replicating the hanging signs seen in KCR East Rail before the merger between KCR and MTR (Mass Transit Railway) in the real world.

Both the **normal** variant and **station-color** variant is available.

## Usage
Place the sign below a block, the station name will be shown if the placed position is within a station area.  
For the **station-color** variant, the color of the sign will also change to the color of the station, if one exists.

## Crafting Recipes
### KCR Station Name Sign
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Lapis_lazuli.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Lapis_lazuli.png"></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="3">
        <img src="../crafting/JCM_Item_Kcr_name_sign.png">
    </div>
</div>

### KCR Station Name Sign (Station Color)
!!! note 
    The **blue dye** in this crafting grid refers to **any dye**

<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Glowstone_dust.png"></div>
        <div><img src="../crafting/Minecraft_Blue_dye.png"></div>
        <div><img src="../crafting/Minecraft_Glowstone_dust.png"></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="3">
        <img src="../crafting/JCM_Item_Kcr_name_sign_station_color.png">
    </div>
</div>

## Block states
| facing | exit_on_left |
|:-------|:-------------|
| north  | false        |
| east   | true         |
| south  |              |
| west   |              |

## Block entities
These blocks have a block entity, but does not store any data and are solely used for rendering.

## History
| Version | Changes Made                                         |
|:--------|:-----------------------------------------------------|
| v1.0.4  | Added KCR Station Name Sign                          |
| v1.0.6  | Raised the block model                               |
| v1.1.5  | The "font" property is added to the block entity     |
| v2.0.0  | The "font" property in block entity has been removed |
