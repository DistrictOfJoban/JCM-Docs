## SoundManager

**SoundManager** is a class responsible for playing sound onto Minecraft. It can usually be accessed by the script's context (e.g. `ctx.getSoundManager()`), however specific implementation may differ between different types of scripting. For details, please check the script type you're trying to code against (e.g. [Eyecandy Scripting](./type/eyecandy/index.md)) and check how to obtain an instance of SoundManager.

|Functions|Description|
|:--------|:----------|
|`SoundManager.playLocalSound(id: Identifier, volume: float, pitch: float): void`|This plays a sound by it's id, in which the sound are *not* localized to a specific position in the world and are always played at a constant volume. This can be used in, for example train announcements.|
|`SoundManager.playSound(id: Identifier, pos: Vector3f, volume: float, pitch: float): void`|This plays a sound by it's id in the current Minecraft world at a [Vector3f](./math.md#vector3f) position relative to the current base position.|
|`SoundManager.play(soundInstance: TickableSoundInstance): void`|This begins playing a [TickableSoundInstance](#tickablesoundinstance) in the game.|
|`SoundManager.stop(soundInstance: TickableSoundInstance): void`|This stops a playing [TickableSoundInstance](#tickablesoundinstance) in the game.|

## TickableSoundInstance
For sound played with `SoundManager.playLocalSound()` and `SoundManager.playSound()`, they are considered "one-shot" sounds, meaning once you invoked the function, it is impossible to change or control anything related to the sound afterwards.

Sometimes you may want interim control of the sound (Such as changing it's volume/pitch midway), or to interrupt and stop the sound, a `TickableSoundInstance` represents a live instance of the sound, where it's parameters are continously updated, allowing for adjustments during the playback.

Some example use-cases:

- Complex on-board vehicle announcements (Dynamic volume / interruptable), on-board TV background audio
- Advanced recreation of vehicle motor sounds
- Eyecandy block with looping music to be played.

|Functions|Description|
|:--------|:----------|
|`static TickableSoundInstance.create(id: Identifier, soundCategory: String): TickableSoundInstance`|Creates a `TickableSoundInstance`.<br>`id` is the [Identifier](./resources.md#identifier-aka-resourcelocation) for the sound.<br>`soundCategory` is one of the following:<br>- **MASTER**<br>- **BLOCKS**<br>- **MUSIC**<br>- **RECORDS**<br>- **WEATHER**<br>- **HOSTILE**<br>- **NEUTRAL**<br>- **PLAYERS**<br>- **AMBIENT**<br>- **VOICE**|
|`TickableSoundInstance.setSoundVolume(volume: float): TickableSoundInstance`|This sets the volume of the sound instance.<br>A value of `1.0` represents the default sound volume.|
|`TickableSoundInstance.setSoundPitch(pitch: float): TickableSoundInstance`|This sets the pitch of the sound instance.<br>A value of `1.0` represents the default sound pitch.|
|`TickableSoundInstance.setLoopable(loopable: boolean): TickableSoundInstance`|Sets whether the sound will play again after the playback has finished.|
|`TickableSoundInstance.setLoopDelay(delayTick: int): TickableSoundInstance`|Set the delay (In Minecraft Tick) before the sound gets looped again (If sound is loopable)|
|`TickableSoundInstance.setRelative(relative: boolean): TickableSoundInstance`|If `relative` is true, it is always played relative to the player's position at a static volume.<br>Otherwise, it will be played in a position set by `TickableSoundInstance.setPos()`, with the appropriate attenuation distance applied.|
|`TickableSoundInstance.setPos(pos: Vector3f): TickableSoundInstance`|Set the sound position via a [Vector3f](./math.md#vector3f).|
|`TickableSoundInstance.isPlaying(): boolean`|Whether the sound is currently playing.|

!!! tips "Tips when using TickableSoundInstance"
    - Only invoke `SoundManager.play` once on the same instance.
    - If sound is loopable, always stop it via `SoundManager.stop` in `dispose()`.
    - If in a moving environment (e.g. Vehicle), always call `setPos` to update the position, since the instance is fully under the script control and will not be automatically updated by JCM.

### Example (Eyecandy)
```js title="example.js" linenums="1"
/* Eyecandy code to play a looping music. If anyone right-clicked the block, lower the volume for 5s before raising back up again. */

function create(ctx, state, eyecandy) {
    state.lower_vol_timer = 0;

    state.sound = TickableSoundInstance.create(Resources.id("minecraft:my.music_id"), "MASTER")
        .setPos(eyecandy.pos()) // Initialize position
        .setLoopable(true) // Repeat the music
        .setLoopDelay(80); // Have a 4 seconds (80 ticks) break before looping again
    ctx.getSoundManager().play(state.sound); // Play it
}

function render(ctx, state, eyecandy) {
    // Check if eyecandy is right-clicked
    if(ctx.events().onBlockUse.occurred()) {
        state.lower_vol_timer = 5; // Set lower volume timer to 5s
        ctx.events().handled(); // Acknowledge right-click event
    }

    if(state.lower_vol_timer > 0) { // Timer is not up
        state.lower_vol_timer -= Timing.delta(); // Countdown timer
        state.sound.setSoundVolume(0.25); // Lower our volume to 25%.
    } else {
        state.sound.setSoundVolume(1); // Time is up, set our volume back to 100%.
        state.lower_vol_timer = 0;
    }
}

function dispose(ctx, state, eyecandy) {
    ctx.getSoundManager().stop(state.sound); // IMPORTANT: Stop the sound! Since after this we won't have reference to `state.sound` anymore!
}
```