---
block_ids:
- jsblock:fare_saver
since: 1.1.4
image: JCM_fare_saver.png
item_group: JCM Blocks
creator: AmberFrost
transparent: false
light_level: 15
recipes:
- jsblock:fare_saver
---

A **Fare Saver** is a block in Joban Client Mod, replicating an older variants of a MTR Fare Saver machine.

## Usage
1. Right click the machine
2. Next time you exit the station, you fare will be deducted by the amount as indicated on the machine.

## Configuration
The fare save amount and the displayed currency unit can be configured by **right clicking with an MTR brush item**.

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Redstone_lamp.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Emerald.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result">
        <img src="../crafting/JCM_Item_Fare_saver.png">
    </div>
</div>

## Block states
| facing | third  |
|:-------|:-------|
| north  | lower  |
| east   | middle |
| south  | upper  |
| west   |        |

## Block entity
This block has a block entity, the data is as follows:

| Name     | Type    | Description                            | Default Value |
|:---------|:--------|:---------------------------------------|:--------------|
| prefix   | String  | The currency unit displayed            | $             |
| discount | Integer | The discount to apply (in MTR balance) | 2             |

## History
| Version | Changes Made                                          |
|:--------|:------------------------------------------------------|
| v1.1.4  | Added Fare Saver                                      |
| v1.1.5  | Improvement to Fare Saver Model                       |
| v2.0.0  | Rename `jsblock:fare_saver_1` to `jsblock:fare_saver` |