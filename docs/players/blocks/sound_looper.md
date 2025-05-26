---
block_ids:
- jsblock:sound_looper
since: 1.0.8
image: JCM_sound_looper.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 0
---

A **Sound Looper** is a block that plays in-game sound repeatedly at a configurable interval, either for all player or for those in a certain block range.

## Configuring
Configuration such as **Repeating Interval**, **Sound ID**, **Limited Block Range** can be configured by right clicking with a **MTR Brush item**.

## Crafting Recipe
{{Crafting 3x3|Minecraft Smooth stone.png|Minecraft Redstone.png|C2=2|res=JCM Sound Looper.png}}

## Block entity
This block has a block entity, and stores the following data:

| Name        | Type    | Description                                               | Default Value |
|:------------|:--------|:----------------------------------------------------------|:--------------|
| pos1        | long    | The first set of positions encoded in Long                | 0L            |
| pos2        | long    | The second set of positions encoded in Long               | 0L            |
| limit_range | boolean | Whether the range should be limited between pos1 and pos2 | 0b            |
| sound_id    | string  | The Sound ID to play                                      | ""            |
| volume      | float   | The volume where the sound will play                      | 1.0f          |

## History
| Version | Changes Made                               |
|:--------|:-------------------------------------------|
| v1.0.8  | Added Sound Looper                         |
| v1.1.2  | Sound looper may now be limited in a range |
