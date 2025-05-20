---
block_ids:
- jsblock:tml_emg_stop_button
since: 1.1.0
image: JCM_tml_emg_stop_button.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 15
---

An **Emergency Train Stop Button (Standing, TML)** is a decoration block in Joban Client Mod. The model is referenced from the new Tuen Ma Line platform of Hung Hom Station in Hong Kong.

## Usage
Right clicking the block would emit a redstone signal for 20 in-game ticks (or 1 second).

## Crafting Recipe
{{Crafting 3x3|Minecraft Iron_ingot.png|Minecraft Iron_ingot.png|4=Minecraft Iron_ingot.png|5=Minecraft Redstone.png|7=JCM Item Emg stop 1.png|8=Minecraft Redstone.png|res=JCM Item Helpline 5.png|Cres=4}}

## Block states
| facing | third  | unpowered |
|:-------|:-------|:----------|
| north  | upper  | true      |
| east   | middle | false     |
| south  | lower  |           |
| west   |        |           |

## History
| Version | Changes Made                                                                                               |
|:--------|:-----------------------------------------------------------------------------------------------------------|
| v1.1.0  | Added Emergency Stop Button (Standing, TML)                                                                |
| v1.1.5  | Now extends ThirdBlockBase, no longer replaces the block on top.                                           |
| v2.0.0  | Right clicking now emits a redstone signal<br>Rename `jsblock:helpline_5` to `jsblock:tml_emg_stop_button` |