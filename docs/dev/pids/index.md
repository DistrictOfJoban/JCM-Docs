# PIDS Preset

Joban Client Mod supports creating a custom PIDS Preset through the use of Resource Packs.  

!!! note "Important note!"
    There have been multiple attempts regarding PIDS Customization with the MTR Mod.  
    This system is **not compatible** with any of the following:

    - PIDS Layout Editor / PIDS Modularization / PIDS JSON by EpicPuppy
    - PIDS text customization seen in early betas of MTR 4.

    You are **not able** to import any data from the above to this system, and the way it works is fundamentally different.  
    Therefore, this can be seen as a replacement to the above systems which supports the latest/official MTR mod releases, but not a drop-in replacement. The barrier to entry is higher, though it also means that more complex PIDS displays can benefit from this.

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

## Type of Preset
There are 2 types of PIDS Preset:

- **JSON PIDS Preset** - Basic & easy configuration
- **Scripted PIDS Preset** - Very customizable, but more difficult.

All PIDS Preset are treated as a **JSON PIDS Preset** by default. For example, you can insert keys (`showWeather` and `showClock` in above) to configure the look of JSON PIDS Preset.

As for **Scripted PIDS Preset**, all we need to do is to pass a `scriptFiles` string array, pointing to the script files. To learn more, please check out the [Scripted PIDS Preset](./scripted/index.md) page.

For the convenience, the chart below lists all available property within a PIDS Preset JSON object:

|Property Name|Description|Possible values|Default|Version Added|Preset Type|
|:------------|:----------|:--------------|:------|:------------|:----------|
|`id`|The unique ID for the preset|Any string|No default, **must be filled**|v1.1.4+|All|
|`name`|The displayed name for the preset|Any string|The `id` property|v2.0.0+|All|
|`thumbnail`|The thumbnail image for the preset, shown in UI|Any string pointing to the texture|**JSON:** `background` property<br>**Scripted:** `"textures/gui/pids_preview_js.png"`|v2.0.0+|All|
|`blacklist`|The type of PIDS that are blacklisted from selecting this preset|String JSON Array of any of the following:<br>`"rv_pids"`<br>`"rv_pids_sil_1"`<br>`"rv_pids_sil_2"`<br>`"lcd_pids"`<br>`"pids_projector"`<br>`"pids_1a"`|`[]`|v2.0.0+|All|
|`background`|The background image of the preset|Any string pointing to the texture|No default, **must be filled for JSON PIDS Preset**|v1.1.4+|JSON|
|`color`|The color of the text|Color hex code string, i.e.<br>`"FFFFFF"`|`"000000"`|v1.1.4+|JSON|
|`fonts`|The font used for text|Any string pointing to the font|`"mtr:mtr"`|v1.1.4+|JSON|
|`showWeather`|Whether to show the weather icon|`true` / `false`|`false`|v1.1.4+|JSON|
|`showClock`|Whether to show clock text|`true` / `false`|`false`|v1.1.4+|JSON|
|`hidePlatform`|Whether platform number should be hidden (Override Hide Platform in per-block PIDS Config)|`true` / `false`|`false`|v1.1.4+|JSON|
|`hideRow`|Which row should be hidden (Override Hide Arrivals in per-block PIDS Config)|Boolean JSON Array(Length: 4)|`[false, false, false, false]`|v1.1.5+|JSON|
|`topPadding`|Whether arrival should be pushed downwards for RV PIDS's top bar.|`true` / `false`|`true`|v2.0.0+|JSON|
|`textOverflowMode`|Display mode when text exceeds its boundary|`STRETCH` - Scale in the overflowing Axis`SCALE` - Scale in both axis|`"STRETCH"`|v2.0.0+|JSON|
|`scriptFiles`|The script files to load|String JSON Array, pointing to the scripts to load.|No default, must be filled to be considered Scripted PIDS Preset.|v2.0.0+|Scripted|