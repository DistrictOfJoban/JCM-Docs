---
block_ids:
- jsblock:faresaver
since: 1.1.4
image: JCM_fare_saver.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 15
---

A **Fare Saver** is a functional block in Joban Client Mod. This replicates the older variants of MTR Fare Saver in real life.

## Usage
1. Right click the machine
2. Next time you exit the station, you fare will be deducted by the amount as indicated on the machine.

## Configuration
The fare save amount and the displayed currency unit can be configured by **right clicking with an MTR brush item**.

## Crafting Recipe
{{Crafting 3x3|Minecraft Redstone.png|Minecraft Iron_ingot.png|4=Minecraft Redstone_lamp.png|5=Minecraft Iron_ingot.png|7=Minecraft emerald.png|8=Minecraft Iron_ingot.png|res=JCM Item Faresaver 1.png}}

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