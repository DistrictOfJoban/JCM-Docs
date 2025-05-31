---
block_ids:
- jsblock:station_ceiling_wrl_pole
- jsblock:station_ceiling_wrl_single_pole
since: 1.1.2
image: JCM_station_ceiling_wrl_poles.png
item_group: JCM Blocks
creator: LX86
assets_creator: 1081MTR
transparent: true
light_level: 0
recipes:
- jsblock:station_ceiling_wrl_pole
---

**Station Ceiling Poles** refers to a series of poles in Joban Client Mod that extends the [Station Ceilings (2009)](./station_ceilings_wrl.md) blocks.

## Crafting Recipes
### Double Pane variant
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Light_lantern.png"></div>
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
    <div class="crafting-result" data-count="32">
        <img src="../crafting/JCM_Item_Station_ceiling_wrl_pole.png">
    </div>
</div>

### Single Pane variant
No crafting recipe available for Single Pane variant yet!

## Block states
### Double Pane variant
| facing | left  | is_slab |
|:-------|:------|:--------|
| north  | true  | true    |
| east   | false | false   |
| south  |       |         |
| west   |       |         |

### Single Pane variant
| facing | is_slab |
|:-------|:--------|
| north  | true    |
| east   | false   |
| south  |         |
| west   |         |

## History
| Version | Changes Made                                          |
|:--------|:------------------------------------------------------|
| v1.1.2  | Added Station Ceiling                                 |
| v2.0.0  | Added **Single Pane** variant<br>Rename `jsblock:station_ceiling_pole` to `jsblock:station_ceiling_wrl_pole` |