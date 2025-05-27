---
block_ids:
- jsblock:subsidy_machine
since: 1.0.0
image: JCM_subsidy_machine.png
item_group: JCM Blocks
creator: AozoraSky
transparent: false
light_level: 0
---

A **Subsidy Machine** is a functional block in Joban Client Mod.

## Usage
The configured balance of this block will be added to scoreboard objective `mtr_balance` when right clicked.

## Configuring

Right Click with brush
A GUI will be displayed, allowing configuration for the subsidy balance and timeout

## Crafting Recipe
{{Crafting 3x3|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Blue dye.png|Minecraft emerald.png|Minecraft Blue dye.png|Minecraft Redstone.png|Minecraft Redstone.png|Minecraft Redstone.png|Cres=2|res=JCM Item Subsidy machine 1.png}}

## Block states
| facing |
|:-------|
| north  |
| east   |
| south  |
| west   |

## Block entity
This block has a block entity, and stores the following data:

| Name            | Type    | Description                                                          | Default Value |
|:----------------|:--------|:---------------------------------------------------------------------|:--------------|
| timeout         | integer | How long the player need to wait after using this block (In Seconds) | 0             |
| price_per_click | integer | Amount of balance that will be added                                 | 10            |

## History
| Version | Changes Made                                                           |
|:--------|:-----------------------------------------------------------------------|
| v1.0.0  | Added Subsidy Machine                                                  |
| v1.1.4  | Subsidy Machine is now configurable, with timeout and price per click. |
| v2.0.0  | Rename `jsblock:subsidy_machine_1` to `jsblock:subsidy_machine`        |