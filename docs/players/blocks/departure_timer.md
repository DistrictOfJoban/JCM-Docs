---
block_ids:
- jsblock:departure_timer
since: 1.0.0
image: JCM_departure_timer.png
image_desc: Departure Timer with Butterfly Light on top, paired with Departure Pole behind
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 0
---

A **Departure Timer** is a block that displays the remaining time until the train departs. This block is modelled after the departure timer seen in the MTR East Rail Line.

## Usage
1. Place the block near a platform. (A configuration replicating real-life would be to place it at the end of the platform rail node)
2. After the train arrives, the block will start showing the time remaining until the train's departure.

## Crafting Recipe
{{Crafting 3x3|Minecraft Iron_ingot.png|Minecraft Iron_ingot.png|Minecraft Iron_ingot.png|Minecraft Redstone.png|Minecraft Clock.png|Minecraft Redstone.png|Minecraft Iron_ingot.png|Minecraft Iron_ingot.png|Minecraft Iron_ingot.png|res=JCM Item Departure timer.png}}

## Block states
| facing |
|:-------|
| north  |
| east   |
| south  |
| west   |


## Block entity
This block has a block entity, and stores the following data in JCM v1:

| Name | Type   | Description                                           | Default Value    |
|:-----|:-------|:------------------------------------------------------|:-----------------|
| font | String | The font ID used for rendering the station name text. | jsblock:deptimer |

In JCM v2, this block entity stores no data.

## History
| Version | Changes Made                                                                                                 |
|:--------|:-------------------------------------------------------------------------------------------------------------|
| v1.0.0  | Added Departure Timer                                                                                        |
| v1.1.5  | Departure Timer now extends Font Base, font can now be customized by manually changing the block entity data |
| v2.0.0  | Removed the (hidden) ability to configure font                                                               |