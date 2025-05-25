---
block_ids:
- jsblock:operator_button
since: 1.0.4
image: JCM_operator_button.png
item_group: JCM Blocks
creator: LX86
transparent: true
light_level: 8
---

!!! warning "To be done"
    Fill in crafting recipe

An **Operator Button** is a wall-attached block in Joban Client Mod, designed to only activate when players hold an authorized driver key.

## Usage
If the player right clicks the operator button with an accepted train driver key (Configurable, see below) in the MTR mod, the button will emit a redstone signal lasting **40 ticks (2 seconds)**.

This block can be placed besides an iron door, in which only player with the appropriate train driver key may get in.

## Configuring
Since MTR 4.0, multiple types of train driver key are offered.  
You may right click the block with the **MTR Brush item** to configure which driver keys are allowed to activate the block. By default, all train driver keys are accepted.

## Block states
| facing | powered |
|:-------|:--------|
| north  | true    |
| east   | false   |
| south  |         |
| west   |         |

## History
| Version | Changes Made                                              |
|:--------|:----------------------------------------------------------|
| v1.0.4  | Added Operator Only Button                                |
| v1.0.5  | Reshaped Operator Only Button                             |
| v1.1.5  | Operator Only button now emits redstone signal            |
| v1.1.6  | Light Level reduced from 15 -> 8, texture has been dimmed |
| v2.0.0  | Multiple driver keys may now be accepted<br>Rename `jsblock:op_button` to `jsblock:operator_button` |