---
block_ids:
- jsblock:departure_timer
since: 1.0.0
image: JCM_departure_timer.png
image_desc: Departure Timer with Butterfly Light on top, paired with Departure Pole behind
item_group: JCM Blocks
creator: AmberFrost
transparent: false
light_level: 0
recipes:
- jsblock:departure_timer
---

A **Departure Timer** is a block that displays the remaining time until the train departs, it is modelled after the departure timer seen in the MTR East Rail Line.

## Usage
1. Place the block near a platform. (A configuration replicating real-life would be to place it at the end of the platform rail node)
2. After the train arrives, the block will start showing the time remaining until the train's departure.

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Clock.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result">
        <img src="../crafting/JCM_Item_Departure_timer.png">
    </div>
</div>

## Block states
| facing |
|:-------|
| north  |
| east   |
| south  |
| west   |


## Block entity
This block has a block entity, but does not store any persistent data.

## History
| Version | Changes Made                                                                                                 |
|:--------|:-------------------------------------------------------------------------------------------------------------|
| v1.0.0  | Added Departure Timer                                                                                        |
| v1.1.5  | Departure Timer now extends Font Base, font can now be customized by manually changing the block entity data |
| v2.0.0  | Removed the (hidden) ability to configure font                                                               |