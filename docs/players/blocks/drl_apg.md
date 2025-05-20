---
block_ids:
- jsblock:apg_door_drl
- jsblock:apg_glass_drl
- jsblock:apg_glass_end_drl
since: 1.1.6
image: JCM_DRL_APG.png
image_desc: A set of Disneyland Resorts Line Automatic Platform Gates placed together
item_group: JCM Blocks
creator: AozoraSky/LX86
assets_creator: 1081MTR
transparent: true
light_level: 0
---

An **APG (Disneyland Resorts Line Variants)** is a block in Joban Client Mod that replicates the Automatic Platform Gates (APG) used in the Disneyland Resorts Line.

They are slightly lower than the APG seen in other MTR Routes.

## Crafting Recipes

### DRL APG Door
{{Crafting 3x3|Minecraft Redstone block.png|Minecraft Iron ingot.png|Minecraft Glowstone dust.png|Minecraft Glass pane.png|C2=5|res=JCM Item Apg door drl.png|Cres=8}}{{Crafting 3x3|JCM Item Apg glass end drl.png|res=JCM Item Apg door drl.png}}

### DRL APG Glass
{{Crafting 3x3|JCM Item Apg door drl.png|res=JCM Item Apg glass drl.png}}

### DRL APG Glass End
{{Crafting 3x3|JCM Item Apg glass drl.png|res=JCM Item Apg glass end drl.png}}

## Block states

### DRL APG Door
| facing | half  | side   | unlocked | end   |
|:-------|:------|:-------|:---------|:------|
| north  | lower | single | true     | true  |
| east   | upper | left   | false    | false |
| south  |       | right  |          |       |
| west   |       | middle |          |       |

### DRL APG Glass
| facing | half  | side   | propagate_property |
|:-------|:------|:-------|:-------------------|
| north  | lower | single | 0                  |
| east   | upper | left   | 1                  |
| south  |       | right  | 2                  |
| west   |       | middle | 3                  |

### DRL APG Glass End
| facing | half  | side   | touching_left | touching_right |
|:-------|:------|:-------|:--------------|:---------------|
| north  | lower | single | air           | air            |
| east   | upper | left   | door          | door           |
| south  |       | right  | none          | none           |
| west   |       | middle |               |                |

## Block entity
The **DRL APG Door** has a block entity, but does not store any persistent data.

## History
| Version | Changes Made                                |
|:--------|:--------------------------------------------|
| v1.1.6  | Added APG (Disneyland Resort Line Variants) |
