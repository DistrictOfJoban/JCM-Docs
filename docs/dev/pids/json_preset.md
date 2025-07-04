A JSON PIDS Preset provides simple tweak over the default MTR Railway Vision PIDS preset, using JSON property to modify the *basic* appearance of the PIDS.

Things you can change:

- Visibility of Weather/Time
- Font used
- Font Color
- Background Images
- Hide arrival override (Since v1.1.5)
- Push arrival down even without hiding the arrivals (Since v1.1.5)

For more detail of the implementation, you may download the [Example Pack](./files/Joban_Custom_Resources.zip) to learn more.

Simply put the **Variable Name** mentioned above in your PIDS as custom text, and it will work.

### Unique properties for JSON PIDS Preset
|Property Name|Description|Possible values|Default|Version Added|
|:------------|:----------|:--------------|:------|:------------|
|`background`|The background image of the preset|Any string pointing to the texture|No default, **must be filled**|v1.1.4+|
|`color`|The color of the text|Color hex code string, i.e.<br>`"FFFFFF"`|`"000000"`|v1.1.4+|
|`fonts`|The font used for text|Any string pointing to the font|`"mtr:mtr"`|v1.1.4+|
|`showWeather`|Whether to show the weather icon|`true` / `false`|`false`|v1.1.4+|
|`showClock`|Whether to show clock text|`true` / `false`|`false`|v1.1.4+|
|`hidePlatform`|Whether platform number should be hidden (Override Hide Platform in per-block PIDS Config)|`true` / `false`|`false`|v1.1.4+|
|`hideRow`|Which row should be hidden (Override Hide Arrivals in per-block PIDS Config)|Boolean JSON Array(Length: 4)|`[false, false, false, false]`|v1.1.5+|
|`topPadding`|Whether arrival should be pushed downwards for RV PIDS's top bar.|`true` / `false`|`true`|v2.0.0+|
|`textOverflowMode`|Display mode when text exceeds its boundary|`STRETCH` - Scale in the overflowing Axis`SCALE` - Scale in both axis|`"STRETCH"`|v2.0.0+|
