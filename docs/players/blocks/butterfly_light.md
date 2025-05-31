---
block_ids:
- jsblock:butterfly_light
since: 1.0.0
image: JCM_butterfly_light.png
item_group: JCM Blocks
creator: LX86
transparent: false
light_level: 4
recipes:
- jsblock:butterfly_light
---

# Door Closing Indicator (Butterfly Light)

A **Door Closing Indicator** (Also known as **Butterfly Light**) is a block in Joban Client Mod that replicates a device in the **MTR East Rail Line** which reminds the train driver to close the train door and depart.

## Usage
1. Place the block near a platform. (A configuration replicating real-life would be to place it at the end of the platform rail node)
2. Some time before the train departs, the light will start flashing. (Default to 10 seconds, configurable).

## Configuring
You may configure the time when it starts flashing before departure by right clicking with the **Brush** item provided by the MTR mod.

## Crafting Recipe
<div class="crafting">
    <div class="crafting-table">
        <!-- row 1 -->
        <div><img src="../crafting/Minecraft_Black_concrete.png"></div>
        <div><img src="../crafting/Minecraft_Redstone.png"></div>
        <div><img src="../crafting/Minecraft_Black_concrete.png"></div>
        <!-- row 2 -->
        <div><img src="../crafting/Minecraft_Black_concrete.png"></div>
        <div><img src="../crafting/Minecraft_Lapis_lazuli.png"></div>
        <div><img src="../crafting/Minecraft_Black_concrete.png"></div>
        <!-- row 3 -->
        <div></div>
        <div></div>
        <div></div>
    </div>
    <div class="crafting-arrow"></div>
    <div class="crafting-result" data-count="4">
        <img src="../crafting/JCM_Item_Butterfly_light.png">
    </div>
</div>

## Block states
| facing | lit   |
|:-------|:------|
| north  | true  |
| east   | false |
| south  |       |
| west   |       |

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