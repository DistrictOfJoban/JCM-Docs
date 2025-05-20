---
block_ids:
- jsblock:station_ceiling_wrl_pole
- jsblock:station_ceiling_wrl_single_pole
since: 1.1.2
image: JCM_station_ceiling_wrl_poles.png
item_group: JCM Blocks
creator: LX86
assets_creator: 1081MTR
transparent: true
light_level: 0
---

!!! warning "To be done"
    Fill in crafting recipe

**Station Ceiling Poles** refers to a series of poles in Joban Client Mod that extends [Station Ceilings (2009)](./station_ceilings_wrl.md) blocks.

## Block states
### Double Pane variant
| facing | left  | is_slab |
|:-------|:------|:--------|
| north  | true  | true    |
| east   | false | false   |
| south  |       |         |
| west   |       |         |

### Single Pane variant
| facing | is_slab |
|:-------|:--------|
| north  | true    |
| east   | false   |
| south  |         |
| west   |         |

## History
| Version | Changes Made                                          |
|:--------|:------------------------------------------------------|
| v1.1.2  | Added Station Ceiling                                 |
| v2.0.0  | Added **Single Pane** variant<br>Rename `jsblock:station_ceiling_1` to `jsblock:station_ceiling_wrl` |