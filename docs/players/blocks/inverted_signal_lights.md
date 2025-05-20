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
---

**Inverted Signal Lights** refers to a series of Signal Light Block that have signal aspects which are the opposite of what they are suppose to be.

When a section is clear, it will display red, otherwise green/blue.

## Usage
Same as MTR Mod's Signal Lights.

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