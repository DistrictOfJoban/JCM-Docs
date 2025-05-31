**PIDS** blocks in the Joban Client Mod behaves mostly similarly to the PIDS in MTR mod, however it has several extra features which are listed belows.

## PIDS Preset
A **PIDS Preset** (Or **PIDS Layout** if you prefer that) is a set of configuration which defines how a PIDS should look.

For instance, the [RV PIDS](../blocks/rv_pids.md) by default looks different from the [LCD PIDS](../blocks/lcd_pids.md). That's because they are both using different preset.  
A PIDS Preset can be chosen by right clicking a PIDS block provided by Joban Client Mod with the **Brush** item provided by the MTR mod.

Custom PIDS Preset can be created through the use of resource packs, you can head over to the [Developer Documentation](../../dev/pids/index.md) if you want to learn more about creating your own PIDS Preset.

Alternatively you may explore the [various resource packs](https://modrinth.com/resourcepacks?q=pids) published online which adds extra PIDS preset to the game.

## PIDS Variable
PIDS in Joban Client Mod also allows you to enter a dynamic variable in the PIDS's **Custom Message** section.

A variable is essentially a text formatted in a specific way, in which it will be replaced with a dynamic value when displaying.  
You can add any of the following variable by inserting the variable name into your custom message.

|Variable Name|Description|Version Added
|:------------|:----------|:----------:|
|`{weather}`|The weather of the current world, possible values are:<br>"Sunny", "Raining", "Thundering"|v1.1.2|
|`{time}`|The current world time, returns "HH:MM"|v1.1.2|
|`{time_period}`|The current time period, possible values are:<br>"Morning", "Afternoon", "Night"|v1.1.2|
|`{weatherChin}`|The weather of the current world in chinese.<br>Possible values are: "晴天", "下雨", "雷暴"|v1.1.4|
|`{worldPlayer}`|Current amount of player on the current world|v1.1.4|
|`{day}`|The day elapsed (Same as the one shown in F3 Screen)|v1.1.5|