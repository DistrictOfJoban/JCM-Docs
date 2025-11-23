At times it may be desirable to access and invoke Minecraft-specific methods within scripts (Whether it's to know more about the surrounding environment or you want to display a chat message). However because the Minecraft version JCM support all have obfuscation enabled, it means there's not an intuitive and cross-loader way to access it.

In JCM, we provide wrapper class to allow invoking certain Minecraft methods. You may also come across these classes in other places (e.g. `PlayerEntity`/`ItemStack` in eyecandy block use event) as it is the most natural and straightforward way to represent a Minecraft object.

## MinecraftClient
This has several utilities method related to the Minecraft Client.

|Functions|Description|
|:--------|:----------|
|`static MinecraftClient.worldIsRaining(): boolean`|Is it raining in the world?|
|`static MinecraftClient.worldIsThundering(): boolean`|Is it thundering in the world?|
|`static MinecraftClient.worldIsRainingAt(pos: Vector3f): boolean`|Is it raining and getting wet in a given chunk?|
|`static MinecraftClient.worldDayTime(): number`|Returns the in-game world time in ticks.|
|`static MinecraftClient.blockLightAt(pos: Vector3f): number`|Return the block light at the specified position.|
|`static MinecraftClient.skyLightAt(pos: Vector3f): number`|Return the sky light at the specified position.|
|`static MinecraftClient.lightLevelAt(pos: Vector3f): number`|Return the light level at the specified position.<br>Sourced from both sky light and block light, prefers the one which is lower.|
|`static MinecraftClient.narrate(message: string): void`|This calls the Minecraft narrator to narrate the message.|
|`static MinecraftClient.localPlayer(): PlayerEntity`|Obtain the [PlayerEntity](#playerentity) of the current player.|
|`static MinecraftClient.getScoreboardScore(objectiveName: string, playerName: string): void`|This obtain the player's scoreboard value on the specified scoreboard objective|
|`static MinecraftClient.displayMessage(message: String, actionBar: boolean): void`|This displays the message as an in-game chat message. If action bar is true, it will display on the action bar instead. (Above inventory hotbar)|
|`static MinecraftClient.displayMessage(message: VanillaText, actionBar: boolean): void`|This displays the corresponding [VanillaText](#vanillatext) as an in-game chat message. If action bar is true, it will display on the action bar instead. (Above inventory hotbar)|
|`static MinecraftClient.gamePaused(): boolean`|Returns whether the game is paused.<br>This may be used to pause rendering/texture update to reduce CPU usage when  paused.<br>**Note: MTR 4/TSC does not pause its simulation even when the game is paused!**|

## VanillaText
Minecraft employs it's own text format called the [Text Component Format](https://minecraft.wiki/w/Text_component_format). This provides access to create these components, which may then be used in `MinecraftClient#displayMessage` to produce formatted texts.

|Functions|Description|
|:--------|:----------|
|`static VanillaText.literal(str: string): VanillaText`|Creates a text component with the `str` parameter as the content|
|`static VanillaText.translatable(key: string, placeholders: objects...): VanillaText`|Creates a text component with the `key` being the translation key, which can be adapted to the user's current language. Any additional parameters for `placeholders` may be specified in case a translation supports string substitution|
|`VanillaText.append(other: VanillaText): VanillaText`|This append another VanillaText after the current VanillaText, the styles for each VanillaText are retained.|
|`VanillaText.withBold(): VanillaText`|Set the VanillaText text to bold|
|`VanillaText.withItalic(): VanillaText`|Set the VanillaText text to italic|
|`VanillaText.withFont(id: Identifier): VanillaText`|Set the VanillaText text to use a specific font id as the displayed font, which is registered by resource pack|
|`VanillaText.withColor(rgb: int): VanillaText`|This sets the corresponding RGB code as the color to display the text|
|`VanillaText.withColor(colorName: string): VanillaText`|This sets the color to display the text|
|`VanillaText.getString(): string`|This returns the literal text content of the VanillaText. Useful when paired with `VanillaText.translatable()` so you can access the string localized in the user's language.|

### Example
Displaying a chat message every 1.5s in an eyecandy script.

```js title="example.js"
function create(ctx, state, eyecandyBlockEntity) {
    state.outputInterval = new RateLimit(1.5); // Every 1.5s
}

function render(ctx, state, eyecandyBlockEntity) {
    if(state.outputInterval.shouldUpdate()) {
        // Create a standalone text
        let textILoveJs = VanillaText.literal(" I love JavaScript /s")
                            .withColor(0x00BBFF)
                            .withBold();

        // or we can append both text (Hello / World) inline
        let textHelloWorld = VanillaText.literal("Hello ")
            .withItalic()
            .withColor("RED")
            .append(
                VanillaText.literal("world!")
                .withItalic()
                .withColor(0x00FF00)
                .withFont(Resources.id("mtr:mtr"))
            );

        let textToSend = textHelloWorld.append(textILoveJs);
        MinecraftClient.displayMessage(textToSend, false);
    }
}
```

![](img/vanillatext_demo.png)

## VoxelShape
This allows you to construct the outline shape of a block, which can be used to allow setting a custom outline shape to an Eyecandy block.

|Functions|Description|
|:--------|:----------|
|`static VoxelShape.empty(): VoxelShape`|Returns an empty VoxelShape|
|`static VoxelShape.fullCube(): VoxelShape`|Returns a VoxelShape that is equivalent to a 16x16 rectangle block|
|`static VoxelShape.create(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number): VoxelShape`|Returns a VoxelShape with the specified size.<br>The `max[?]` parameter must always be equal/larger than the `min[?]` parameters.<br>Unit are 16x16 (16 = 1 full block)|
|`static VoxelShape.create(minX: number, minY: number, minZ: number, maxX: number, maxY: number, maxZ: number, facing: Direction): VoxelShape`|Returns a VoxelShape with the specified size, rotated according to `facing`.<br>The `max[?]` parameter must always be equal/larger than the `min[?]` parameters.<br>Unit are 16x16 (16 = 1 full block)|
|`VoxelShape.combine(other: VoxelShape): VoxelShape`|This returns a new VoxelShape where two different VoxelShape are merged together.|

### Example
Setting an outline shape for an eyecandy:

```js title="example.js"
function create(ctx, state, eyecandyBlockEntity) {
    const shape1 = VoxelShape.create(0, 0, 0, 8, 16, 8, eyecandyBlockEntity.facing());
    const shape2 = VoxelShape.create(7, 0, 7, 12, 16, 10, eyecandyBlockEntity.facing());
    const myShape = shape1.combine(shape2);
    ctx.setOutlineShape(myShape);
}
```

![](img/voxelshape_demo.png)


## ItemStack
An Item Stack (The thing that takes up your hotbar slot).

This is usually supplied/obtainable via events/code rather than something to be constructed by your script.

??? info "Note on Item vs ItemStack"
    In Minecraft, there's a distinction between an **Item** (An immutable representation of an item, with an id) and ItemStack (An instance of that item with a specific amount/durability/enchanting/custom names/Custom NBT which can be changed at any time).
    
    Currently this distinction is not made in the Scripting API.

|Functions|Description|
|:--------|:----------|
|`ItemStack.itemId(): string`|Obtain the item id (e.g. `mtr:rail`)`|
|`ItemStack.translationId(): string`|Obtain the translation key of the item|
|`ItemStack.empty(): boolean`|Whether the itemstack is considered empty (e.g. Air)<br>e.g. If this is true when trying to obtain the item the player is holding, this means the player isn't holding anything.|
|`ItemStack.count(): number`|Get the amount of the ItemStack|

## PlayerEntity
Represents a player entity in the game.

This is usually supplied/obtainable via events/code rather than something to be constructed by your script.

|Functions|Description|
|:--------|:----------|
|`PlayerEntity.uuid(): string`|Obtain the entity's uuid as a string|
|`PlayerEntity.hasPermissionLevel(level: number): boolean`|Whether the player has a certain "OP" level.<br>**Note: This is completely client-side only, do not use this for serious permission/authentication checking!**|
|`PlayerEntity.pos(): Vector3f`|Obtain the current position of the player, as a [Vector3f](./math.md#vector3f)|
|`PlayerEntity.blockPos(): Vector3f`|Obtain the current block position of the player, as a [Vector3f](./math.md#vector3f)|
|`PlayerEntity.playerName(): string`|Obtain the player's canonical name/username (Same as those registered in Mojang's/Microsoft server) |
|`PlayerEntity.isHoldingItem(id: Identifier): boolean`|Whether player is holding an item with the corresponding [Identifier](./resources.md#identifier-aka-resourcelocation) on either hand.|
|`PlayerEntity.mainHandItem(): ItemStack`|Obtain the [ItemStack](#itemstack) in the player's main hand|
|`PlayerEntity.offHandItem(): ItemStack`|Obtain the [ItemStack](#itemstack) in the player's secondary/offhand|
|`PlayerEntity.activeItem(): ItemStack`|Obtain the [ItemStack](#itemstack) in the player's hands, preferring main hand.|