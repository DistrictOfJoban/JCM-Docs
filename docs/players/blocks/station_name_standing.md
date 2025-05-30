---
block_ids:
- jsblock:station_name_standing
since: 1.0.0
image: JCM_station_name_standing.png
item_group: JCM Blocks
creator: LX86
transparent: true
deprecated: true
light_level: 0
---
!!! warning "Block deprecated"
    This block has been [merged to the main MTR mod](https://github.com/Minecraft-Transit-Railway/Minecraft-Transit-Railway/pull/1106) since MTR 4.0.

    Thus, this block is no longer obtainable as an item, and you should use the standing station name block from the MTR mod.

    For backward compatibility, existing blocks will continue to work for now.

A **Standing Station Name Sign** is a decoration block in Joban Client Mod, replicating standing station name sign seen in the **Tuen Ma Line (Tuen Mun <-> Kam Sheung Road)** section after the KCR and MTR merger.

## Configuring
You can right click the block with the **Brush** item provided by the MTR mod to change the text color.

## Crafting Recipe
!!! warning "Deprecated in v2"
    This block has been deprecated and the corresponding item is removed, along with the following recipe.

<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div></div>
        <div><img src="../crafting/MTR_Station_name_tall_wall.png"></div>
        <div></div>
        <!-- row 2 -->
        <div></div>
        <div><img src="../crafting/Minecraft_Stick.png"></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div><img src="../crafting/Minecraft_Stick.png"></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="4">
        <img src="../crafting/JCM_Item_Station_name_standing.png">
    </div>
</div>

## Block states
| facing | metal | third  | color     |
|:-------|:------|:-------|:----------|
| north  | true  | lower  | 0 (White) |
| east   | false | middle | 1 (Gray)  |
| south  |       | upper  | 2 (Black) |
| west   |       |        |           |

## Block entity
This block has a block entity, but does not store any data and is solely used for rendering.

## History
| Version | Changes Made                           |
|:--------|:---------------------------------------|
| v1.0.0  | Added Standing Station Name Sign       |
| v1.1.3  | Text are now drawn with Dynamic Images |
| v2.0.0  | Rename `jsblock:station_name_tall_stand` to `station_name_standing`<br>Deprecate block as merged into MTR 4. |