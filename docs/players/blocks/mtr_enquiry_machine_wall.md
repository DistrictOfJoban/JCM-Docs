---
block_ids:
- jsblock:mtr_enquiry_machine_wall
since: 1.1.1
image: JCM_mtr_enquiry_machine_wall.png
item_group: JCM Blocks
creator: AozoraSky
transparent: false
light_level: 4
recipes:
- jsblock:mtr_enquiry_machine_wall
---

A **Enquiry Machine (Wall Mounted)** is a block in Joban Client Mod, replicating enquiry machines that are mounted to the wall in the MTR Network.

## Usage
Right clicking on the block will show a screen depicting the historic record of your journey.  
These journey records are saved in-game whenever you exit a station through the Exit Barrier block or the ticket processor.

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div></div>
        <div></div>
        <div></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="4">
        <img src="../crafting/JCM_Item_Mtr_enquiry_machine_wall.png">
    </div>
</div>

## Block states
| facing |
|:-------|
| north  |
| east   |
| south  |
| west   |

| Version | Changes Made                                                                                                      |
|:--------|:------------------------------------------------------------------------------------------------------------------|
| v1.1.1  | Added Enquiry Machine (Wall Mounted)                                                                              |
| v1.1.5  | Change Light Level to 4, blocks model always fullbright                                                           |
| v2.0.0  | Add GUI to display journey entry logs<br>Rename `jsblock:enquiry_machine_3` to `jsblock:mtr_enquiry_machine_wall` |