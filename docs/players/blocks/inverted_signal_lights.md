---
block_ids:
- jsblock:signal_light_inverted_1
- jsblock:signal_light_inverted_2
since: 1.0.0
image: JCM_static_signal_lights.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 0
recipes:
- jsblock:signal_light_inverted_1
- jsblock:signal_light_inverted_1_2
- jsblock:signal_light_inverted_2
---

**Inverted Signal Lights** refers to a series of Signal Light Block that have signal aspects which are the opposite of what they are suppose to be.

When a section is clear, it will display red, otherwise green/blue.

## Usage
Same as MTR mod's Signal Lights.

## Crafting Recipes
### Blue variant
!!! note
    The **red signal light** in this crafting grid refers to **any Signal Lights from the MTR mod**

<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Signal_light_red_1.png"></div>
        <div><img src="../crafting/Minecraft_Gold_ingot.png"></div>
        <div></div>
        <!-- row 2 -->
        <div></div>
        <div></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="2">
        <img src="../crafting/JCM_Item_Inverted_signal_1.png">
    </div>
</div>

<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Inverted_signal_2.png"></div>
        <div></div>
        <div></div>
        <!-- row 2 -->
        <div></div>
        <div></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result">
        <img src="../crafting/JCM_Item_Inverted_signal_1.png">
    </div>
</div>

## Green variant
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Inverted_signal_1.png"></div>
        <div></div>
        <div></div>
        <!-- row 2 -->
        <div></div>
        <div></div>
        <div></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result">
        <img src="../crafting/JCM_Item_Inverted_signal_2.png">
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
|Version|Changes Made|
|:------|:-----------|
|v1.0.0|Added Inverted Signal Lights|