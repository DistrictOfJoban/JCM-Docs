---
block_ids:
- jsblock:apg_door_drl
- jsblock:apg_glass_drl
- jsblock:apg_glass_end_drl
since: 1.1.6
image: JCM_drl_apgs.png
image_desc: A set of Disneyland Resorts Line Automatic Platform Gates placed together
item_group: JCM Blocks
creator: AozoraSky/LX86
assets_creator: 1081MTR
transparent: true
light_level: 0
recipes:
- jsblock:apg_door_drl_1
- jsblock:apg_door_drl_2
- jsblock:apg_glass_drl
- jsblock:apg_glass_end_drl
---

An **APG (Disneyland Resorts Line Variants)** is a series of blocks in Joban Client Mod that replicates the Automatic Platform Gates (APG) used in the MTR Disneyland Resorts Line.

They are slightly lower than the APG seen in other MTR Routes.

## Crafting Recipes

### DRL APG Door
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Redstone_block.png"></div>
        <div data-count="5"><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Glowstone_dust.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Glass_pane.png"></div>
        <div></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="8">
        <img src="../crafting/JCM_Item_Apg_door_drl.png">
    </div>
</div>

<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Apg_glass_end_drl.png"></div>
        <div></div>
        <div></div>
        <!-- row 2 -->
        <div></div>
        <div></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result">
        <img src="../crafting/JCM_Item_Apg_door_drl.png">
    </div>
</div>

### DRL APG Glass
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Apg_door_drl.png"></div>
        <div></div>
        <div></div>
        <!-- row 2 -->
        <div></div>
        <div></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result">
        <img src="../crafting/JCM_Item_Apg_glass_drl.png">
    </div>
</div>

### DRL APG Glass End
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Apg_glass_drl.png"></div>
        <div></div>
        <div></div>
        <!-- row 2 -->
        <div></div>
        <div></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result">
        <img src="../crafting/JCM_Item_Apg_glass_end_drl.png">
    </div>
</div>

## Block states

### DRL APG Door
| facing | half  | side   | unlocked | end   |
|:-------|:------|:-------|:---------|:------|
| north  | lower | single | true     | true  |
| east   | upper | left   | false    | false |
| south  |       | right  |          |       |
| west   |       | middle |          |       |

### DRL APG Glass
| facing | half  | side   | propagate_property |
|:-------|:------|:-------|:-------------------|
| north  | lower | single | 0                  |
| east   | upper | left   | 1                  |
| south  |       | right  | 2                  |
| west   |       | middle | 3                  |

### DRL APG Glass End
| facing | half  | side   | touching_left | touching_right |
|:-------|:------|:-------|:--------------|:---------------|
| north  | lower | single | air           | air            |
| east   | upper | left   | door          | door           |
| south  |       | right  | none          | none           |
| west   |       | middle |               |                |

## Block entity
The **DRL APG Door** has a block entity, but does not store any persistent data.

## History
| Version | Changes Made                                |
|:--------|:--------------------------------------------|
| v1.1.6  | Added APG (Disneyland Resort Line Variants) |
