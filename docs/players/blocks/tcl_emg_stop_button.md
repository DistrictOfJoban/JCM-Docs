---
block_ids:
- jsblock:tcl_emg_stop_button
since: 1.0.0
image: JCM_tcl_emg_stop_button.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 0
---

An **Emergency Stop Button** is a decoration block, replicating the Emergency Stop Button seen in Tung Chung Line stations.  
This block is meant to be attached to a wall.

## Usage
Right clicking the block would emit a redstone signal for 20 in-game ticks (or 1 second).

## Crafting Recipe
{{Crafting 3x3|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Redstone.png|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Cres=4|res=JCM Item Emg stop 1.png}}

## Block states
| facing | unpowered |
|:-------|:----------|
| north  | true      |
| east   | false     |
| south  |           |
| west   |           |

## History
| Version | Changes Made                                                                                               |
|:--------|:-----------------------------------------------------------------------------------------------------------|
| v1.0.0  | Added Emergency Stop Button (TCL)                                                                          |
| v2.0.0  | Right clicking now emits a redstone signal<br>Rename `jsblock:emg_stop_1` to `jsblock:tcl_emg_stop_button` |