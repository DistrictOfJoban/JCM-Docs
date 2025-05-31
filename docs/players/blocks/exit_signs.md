---
block_ids:
- jsblock:exit_sign_odd
- jsblock:exit_sign_even
since: 1.0.1
image: JCM_exit_signs.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 5
recipes:
- jsblock:exit_sign_odd
- jsblock:exit_sign_even
- jsblock:exit_sign_odd_by_even
---
**Exit Sign (Odd)** and **Exit Sign (Even)**  is a decorative block in Joban Client Mod, replicating an emergency exit sign seen in Hong Kong.

It is designed to be hanging/attached to the bottom of a block.

## Crafting Recipes

### Exit Sign (Odd)
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Glowstone_dust.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Glowstone_dust.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Glowstone_dust.png"></div>
        <div><img src="../crafting/Minecraft_Stone.png"></div>
        <div><img src="../crafting/Minecraft_Glowstone_dust.png"></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="8">
        <img src="../crafting/JCM_Item_Exit_sign_odd.png">
    </div>
</div>

<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Exit_sign_even.png"></div>
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
        <img src="../crafting/JCM_Item_Exit_sign_odd.png">
    </div>
</div>

### Exit Sign (Even)
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/JCM_Item_Exit_sign_odd.png"></div>
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
        <img src="../crafting/JCM_Item_Exit_sign_even.png">
    </div>
</div>

## Block states
### Exit Sign (Odd)
| facing |
|:-------|
| north  |
| east   |
| south  |
| west   |

### Exit Sign (Even)
| facing | left  |
|:-------|:------|
| north  | true  |
| east   | false |
| south  |       |
| west   |       |

## History
| Version | Changes Added                                                                                                        |
|:--------|:---------------------------------------------------------------------------------------------------------------------|
| v1.0.1  | Added Exit Signs                                                                                                     |
| v1.0.8  | Added Exit Signs (Even)                                                                                              |
| v1.1.5  | Light Level changed from 10 -> 5                                                                                     |
| v2.0.0  | Rename `jsblock:exit_sign_1` to `jsblock:exit_sign_odd`<br>Rename `jsblock:exit_sign_1e` to `jsblock:exit_sign_even` |