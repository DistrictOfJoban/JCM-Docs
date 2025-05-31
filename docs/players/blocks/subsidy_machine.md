---
block_ids:
- jsblock:subsidy_machine_1
since: 1.0.0
image: JCM_subsidy_machine.png
item_group: JCM Blocks
creator: AozoraSky
transparent: false
light_level: 0
recipes:
- jsblock:subsidy_machine
---

A **Subsidy Machine** is a functional block in Joban Client Mod, modelled after the *Subsidy Collection Point* seen in MTR premises.

## Usage
The balance amount set for this block will be added to your MTR balance when right clicked.

Depending on how the block is configured, there may be a cooldown period before you can continue filling your balance.

## Configuring

You may configure the balance amount provided by the machine and cooldown period by right clicking with the **Brush** item provided by the MTR mod.

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Blue_dye.png"></div>
        <div><img src="../crafting/Minecraft_Emerald.png"></div>
        <div><img src="../crafting/Minecraft_Blue_dye.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="2">
        <img src="../crafting/JCM_Item_Subsidy_machine.png">
    </div>
</div>

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