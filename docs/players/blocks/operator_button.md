---
block_ids:
- jsblock:op_button
since: 1.0.4
image: JCM_operator_button.png
item_group: JCM Blocks
creator: LX86
transparent: true
light_level: 8
recipes:
- jsblock:operator_button
---

An **Operator Button** is a wall-attached block in Joban Client Mod, designed to only activate when players hold a train driver key. It is modelled after a authorization lock seen in stations of the MTR West Rail Line section.

## Usage
If the player right clicks the operator button with a **train driver key** in the MTR mod, the button will emit a redstone signal lasting **40 ticks (2 seconds)**.

This block can be placed besides an iron door, in which only player right clicking with a train driver key may get in.

## Crafting Recipe
!!! note
    The **black concrete** in this crafting grid refers to **any concrete**

<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Black_concrete.png"></div>
        <div><img src="../crafting/Minecraft_Black_concrete.png"></div>
        <div></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="6">
        <img src="../crafting/JCM_Item_Operator_button.png">
    </div>
</div>

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