# PIDS Preset

Joban Client Mod supports creating a custom PIDS Preset through the use of Resource Packs.  

## Defining a PIDS Preset
To get started, first you need to create a Resource Pack that can be recognized by Minecraft.

This can be done by creating a folder within your `.minecraft/resourcepacks` directory, then create a `pack.mcmeta` file with the following content:
``` { .js .annotate }
{
    "pack_format": 13,// (1)!
    "description": "Your pack description here"// (2)!
}
```

1. `pack_format` refers to which Minecraft version this resource pack is designed for, see [Minecraft Wiki](https://minecraft.fandom.com/wiki/Pack_format) for a full list of numeric versions.
2. `description` is the text that will appear in the resource pack selection screen.

!!! note "Note on pack_format"
    Unless your pack also involves modifying other bits of Minecraft, the `pack_format` you filled in `pack.mcmeta` does not affect the functionalities as JCM resources works the same across all Minecraft versions.

Afterwards, create a new file named `joban_custom_resources.json` under `[Your Resource Pack Folder]/assets/jsblock`.  
You should create any folder in between if it doesn't exists. (So create `assets` in `[Your Resource Pack Folder]`, then create `jsblock` in `assets`)

Within the json, fill the following as a basis:

``` json
{
    "pids_images": [
        {
            "id": "change_me",
            "showWeather": false,
            "showClock": false,
            "background": "jsblock:change_me.png"
        }
    ]
}
```

As you can see, each PIDS Preset is defined as a JSON object within the `pids_images` array.  
You may insert keys (such as `showWeather` and `showClock` in above) to configure the look of JSON PIDS Preset.

For the convenience, the chart below lists all available property within a PIDS Preset JSON object:

|Property Name|Description|Possible values|Default|Version Added|
|:------------|:----------|:--------------|:------|:------------|
|`id`|The unique ID for the preset|Any string|No default, **must be filled**|v1.1.4+|
|`background`|The background image of the preset|Any string pointing to the texture|No default, **must be filled for JSON PIDS Preset**|v1.1.4+|
|`color`|The color of the text|Color hex code string, i.e.<br>`"FFFFFF"`|`"000000"`|v1.1.4+|
|`fonts`|The font used for text|Any string pointing to the font|`"mtr:mtr"`|v1.1.4+|
|`showWeather`|Whether to show the weather icon|`true` / `false`|`false`|v1.1.4+|
|`showClock`|Whether to show clock text|`true` / `false`|`false`|v1.1.4+|
|`hidePlatform`|Whether platform number should be hidden (Override Hide Platform in per-block PIDS Config)|`true` / `false`|`false`|v1.1.4+|
|`hideRow`|Which row should be hidden (Override Hide Arrivals in per-block PIDS Config)|Boolean JSON Array (Length: 4)|`[false, false, false, false]`|v1.1.5+|
|`carLengthColor`|The text color when the car number is shown in the PIDS. (Per car length)|String JSON Array containing the hex code string, i.e.`["FF0000", "00FFFF"]`|`[]`|**v1.2.2 only**|