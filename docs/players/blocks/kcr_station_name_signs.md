---
block_ids:
- jsblock:kcr_name_sign
- jsblock:kcr_name_sign_station_color
since: 1.0.4
image: JCM_kcr_station_name_signs.png
image_desc: "Top: Normal variant<br>Bottom: Station-colored variant"
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 10
---

**KCR Station Name Signs** is a series of decoration block in Joban Client Mod, replicating the hanging signs seen in KCR East Rail before the merger between KCR and MTR (Mass Transit Railway) in the real world.

Both the **normal** variant and **station-color** variant is available.

## Usage
Place the sign below a block, the station name will be shown if the placed position is within a station area.  
For the **station-color** variant, the color of the sign will also change to the color of the station, if one exists.

## Crafting Recipes
### KCR Station Name Sign
{{Crafting 3x3|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Lapis lazuli.png|Minecraft Iron ingot.png|Minecraft Lapis lazuli.png|res=JCM Item Kcr name sign.png|Cres=3}}

### KCR Station Name Sign (Station Color)
Note: The **blue dye** in this crafting grid refers to **any dye**

{{Crafting 3x3|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Iron ingot.png|Minecraft Glowstone dust.png|Minecraft Blue dye.png|Minecraft Glowstone dust.png|res=JCM Item Kcr name sign station color.png|Cres=3}}

## Block states
| facing | exit_on_left |
|:-------|:-------------|
| north  | false        |
| east   | true         |
| south  |              |
| west   |              |

## Block entities
These blocks have a block entity, but does not store any data and are solely used for rendering.

## History
| Version | Changes Made                                         |
|:--------|:-----------------------------------------------------|
| v1.0.4  | Added KCR Station Name Sign                          |
| v1.0.6  | Raised the block model                               |
| v1.1.5  | The "font" property is added to the block entity     |
| v2.0.0  | The "font" property in block entity has been removed |
