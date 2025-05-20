---
block_ids:
- jsblock:signal_light_red_1
- jsblock:signal_light_red_2
- jsblock:signal_light_green
- jsblock:signal_light_blue
since: 1.0.0
image: JCM_static_signal_lights.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 0
---

!!! warning "To be done"
    Fill in crafting recipe

**Static Signal Light** refers to a series of Signal Light Block in Joban Client Mod where it's always lit.

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
| v2.0.0  | Adapt to diagonal signal light.                                   |