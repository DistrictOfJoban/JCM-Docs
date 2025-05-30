---
block_ids:
- jsblock:water_machine
since: 1.0.0
image: JCM_Water_Machine.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 0
recipes:
- jsblock:water_machine
---

A **Water Machine** is a block in Joban Client Mod, modelled after water supply machines in MTR stations.

## Usage
You may refill a water bottle/bucket by right clicking on the water machine with the corresponding item (Empty Bottle/Empty Bucket).

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Water_bucket.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="3">
        <img src="../crafting/JCM_Item_Water_machine.png">
    </div>
</div>

## Block states
| facing | half  |
|:-------|:------|
| north  | lower |
| east   | upper |
| south  |       |
| west   |       |

## History
| Version | Changes Made                                                                                    |
|:--------|:------------------------------------------------------------------------------------------------|
| v1.0.0  | Added Water Machines                                                                            |
| v2.0.0  | Allow water bucket to be filled<br>Renamed `jsblock:water_machine_1` to `jsblock:water_machine` |
