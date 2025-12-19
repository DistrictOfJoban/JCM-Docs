---
block_ids:
- jsblock:signal_light_red_1
- jsblock:signal_light_red_2
- jsblock:signal_light_green
- jsblock:signal_light_blue
since: 1.0.0
image: JCM_static_signal_lights.png
item_group: JCM Blocks
creator: AmberFrost
transparent: false
light_level: 0
recipes:
- jsblock:signal_light_red_1
- jsblock:signal_light_red_2
- jsblock:signal_light_green
- jsblock:signal_light_blue
---

**Static Signal Light** refers to a series of Signal Lights in Joban Client Mod where it's always lit in 1 color.

Its purpose is to provide a dummy decoration-only signal light.

## Crafting Recipes
### Static Signal Light (Red below)
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Red_dye.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="2">
        <img src="../crafting/JCM_Item_Signal_light_red_1.png">
    </div>
</div>

### Static Signal Light (Red above)
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Red_dye.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="2">
        <img src="../crafting/JCM_Item_Signal_light_red_2.png">
    </div>
</div>

### Static Signal Light (Blue)
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Blue_dye.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="2">
        <img src="../crafting/JCM_Item_Signal_light_blue.png">
    </div>
</div>

### Static Signal Light (Green)
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Lime_dye.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <!-- row 3 -->
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Blackstone.png"></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="2">
        <img src="../crafting/JCM_Item_Signal_light_green.png">
    </div>
</div>

## Block states
| facing | is_22_5 | is_45 |
|:-------|:--------|:------|
| north  | true    | true  |
| east   | false   | false |
| south  |         |       |
| west   |         |       |

## Block entities
These blocks have a block entity, but does not store any data and are solely used for rendering.

## History
| Version | Changes Made                                                      |
|:--------|:------------------------------------------------------------------|
| v1.0.0  | Added Static Signal Light                                         |
| v1.1.5  | Fix Blue Signal Light being located at the bottom rather than top |
| v2.0.0  | Allow signal lights to be placed in 22.5/45 degree increment.     |