---
block_ids:
- jsblock:helpline_standing_eal
since: 1.0.0
image: JCM_helpline_standing_eal.png
item_group: JCM Blocks
creator: LX86
transparent: true
light_level: 0
---

A **Helpline (East Rail Line Type)** is a block in Joban Client Mod acting as a machine to request assistance from station staff. 

This replicates the Help Line seen in stations along the MTR East Rail Line.

## Usage
Right clicking the block would emit a redstone signal for 20 in-game ticks (or 1 second).

## Crafting Recipe
{{Crafting 3x3|Minecraft Yellow dye.png|Minecraft Yellow dye.png|4=Minecraft Purple dye.png|5=Minecraft Purple dye.png|7=Minecraft Iron ingot.png|8=Minecraft Iron ingot.png|res=JCM Item Helpline 3.png|Cres=4}}

## Block states
| facing | half  | unpowered |
|:-------|:------|:----------|
| north  | lower | true      |
| east   | upper | false     |
| south  |       |           |
| west   |       |           |

## History
| Version | Changes Made                                                                                                 |
|:--------|:-------------------------------------------------------------------------------------------------------------|
| v1.0.0  | Added Helpline (East Rail Type)                                                                              |
| v1.1.5  | Hardness changed from 2.0 -> 5.0                                                                             |
| v2.0.0  | Right clicking now emits a redstone signal<br>Rename `jsblock:helpline_3` to `jsblock:helpline_standing_eal` |