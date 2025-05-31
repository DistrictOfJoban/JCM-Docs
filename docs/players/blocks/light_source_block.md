---
block_ids:
- jsblock:light_block
since: 1.0.0
image: JCM_light_block.png
image_desc: A Light Source Block, with icon displayed when holding the item
item_group: JCM Blocks
creator: LX86
transparent: true
light_level: 0 - 15
---

A **Light Source Block** is a block that does not have a visual appearance nor a collision hitbox, and can emit lights from 0 - 15.

When the player is holding the Light Source Block Item, all Light Blocks around the player will display a Light Icon.

This behavior is almost the same as the light block introduced in Minecraft 1.17, with the exception that player can still see the visual hitbox without holding the item.

## Usage
You may right click the block while holding the block item to cycle the light level from 0 - 15

## Crafting Recipe
!!! info
    This block is a creative-only block and does not have a crafting recipe.

## Block states
| level |
|:------|
| 0     |
| 1     |
| 2     |
| 3     |
| 4     |
| 5     |
| 6     |
| 7     |
| 8     |
| 9     |
| 10    |
| 11    |
| 12    |
| 13    |
| 14    |
| 15    |

## History
| Version | Changes Made                                                                                                                  |
|:--------|:------------------------------------------------------------------------------------------------------------------------------|
| v1.0.0  | Added Light Source Block.                                                                                                     |
| v1.1.0  | Added Block Entity to Light Source Block.                                                                                     |
| v1.1.2  | Light Source Block's Light Level can now be configured.<br>Light Source Block now displays an particle when holding the item. |
| v1.1.4  | Removed Block Entity from Light Source Block.                                                                                 |
| v1.1.6  | Light Source Block can now be replaced by another block when right clicked on it.                                             |