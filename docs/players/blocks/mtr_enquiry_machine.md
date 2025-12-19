---
block_ids:
- jsblock:mtr_enquiry_machine
since: 1.0.0
image: JCM_mtr_enquiry_machine.png
item_group: JCM Blocks
creator: AmberFrost
transparent: true
light_level: 0
recipes:
- jsblock:mtr_enquiry_machine
---

An **Enquiry Machine** is a block in Joban Client Mod that replicates the older-generation enquiry machine seen in the MTR railway network.

## Usage
Right clicking on the block will show a screen depicting the historic record of your journey.  
These journey records are saved in-game whenever you exit a station through the Exit Barrier block or the ticket processor.

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
        <div><img src="../crafting/Minecraft_Iron_ingot.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="4">
        <img src="../crafting/JCM_Item_Mtr_enquiry_machine.png">
    </div>
</div>

## Block states
| facing | half  |
|:-------|:------|
| north  | lower |
| east   | upper |
| south  |       |
| west   |       |

## History
| Version | Changes Made                                                                                                 |
|:--------|:-------------------------------------------------------------------------------------------------------------|
| v1.0.0  | Added Enquiry Machine                                                                                        |
| v2.0.0  | Add GUI to display journey entry logs<br>Rename `jsblock:enquiry_machine_1` to `jsblock:mtr_enquiry_machine` |