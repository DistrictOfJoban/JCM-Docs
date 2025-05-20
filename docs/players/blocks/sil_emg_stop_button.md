---
block_ids:
- jsblock:sil_emg_stop_button
since: 1.1.1
image: JCM_sil_emg_stop_button.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 8
---

An **Emergency Train Stop Button (SIL)** is a decoration block in Joban Client Mod, replicating the emergency stop button seen in stations along the MTR South Island Line.

## Usage
Right clicking the block would emit a redstone signal for 20 in-game ticks (or 1 second).

## Crafting Recipe
{{Crafting 3x3|Minecraft Iron_ingot.png|Minecraft Redstone.png||Minecraft Iron_ingot.png|JCM Item Emg stop 1.png||Minecraft Iron_ingot.png|Minecraft Green_dye.png||C1=|res=JCM Item Helpline 6.png|Cres=4}}

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
| v1.1.1  | Added Emergency Train Stop Button (SIL)                                                                    |
| v1.1.5  | Now extends ThirdBlockBase, no longer replace blocks above                                                 |
| v2.0.0  | Right clicking now emits a redstone signal<br>Rename `jsblock:helpline_6` to `jsblock:sil_emg_stop_button` |