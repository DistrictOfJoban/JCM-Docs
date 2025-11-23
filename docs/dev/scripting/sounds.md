## SoundManager

**SoundManager** is a class responsible for playing sound onto Minecraft. It can usually be accessed by the script's context (e.g. `ctx.soundManager()`), however specific implementation may differ between different types of scripting. For details, please check the script type you're trying to code against (e.g. [Eyecandy Scripting](./type/eyecandy/index.md)) and check how to obtain an instance of SoundManager.

|Functions|Description|
|:--------|:----------|
|`SoundManager.playLocalSound(id: Identifier, volume: number, pitch: number): void`|This plays a sound by it's id, in which the sound are *not* localized to a specific position in the world and are always played at a constant volume. This can be used in, for example train announcements.|
|`SoundManager.playSound(id: Identifier, pos: Vector3f, volume: number, pitch: number): void`|This plays a sound by it's id in the current Minecraft world at a specified [Vector3f](./math.md#vector3f) position|