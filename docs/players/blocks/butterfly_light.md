---
block_ids:
- jsblock:butterfly_light
since: 1.0.0
image: JCM_butterfly_light.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 0
---

# Door Closing Indicator (Butterfly Light)

A Door Closing Indicator (Also known as Butterfly Light) is a block in Joban Client Mod. This replicates a device in the MTR East Rail Line reminding the train driver to close the door and depart.

## Usage
1. Place the block near a platform. (A configuration replicating real-life would be to place it at the end of the platform rail node)
2. Some time before the train departs, the light will start flashing. (Default to 10 seconds, configurable).

## Configuring
You may configure the time when it starts flashing before departure by **right clicking with the MTR Brush item**.

## Crafting Recipe
{{Crafting 3x3|Minecraft Black concrete.png|Minecraft Redstone.png|Minecraft Black concrete.png|Minecraft Black concrete.png|Minecraft Lapis lazuli.png|Minecraft Black concrete.png|res=JCM Item Butterfly light.png|Cres=4}}

## Block states
| facing |
|:-------|
| north  |
| east   |
| south  |
| west   |

## Block entity
This block has a block entity, and stores the following data:

| Name             | Type    | Description                                           | Default Value |
|:-----------------|:--------|:------------------------------------------------------|:--------------|
| seconds_to_blink | Integer | The dwell time (seconds) left when it starts blinking | 10            |

## History
| Version | Changes Made                                                                                |
|:--------|:--------------------------------------------------------------------------------------------|
| v1.0.0  | Added Butterfly Light.                                                                      |
| v1.0.3  | Butterfly Light now works properly without doDaylightCycle on.                              |
| v1.1.4  | The flashing state has been changed to an animated texture.                                 |
| v1.1.6  | The time until it blinks can now be configured.                                             |
| v2.0.0  | Removed LIT state and light level to 0, butterfly light are now fully rendered client-side. |
