# Script Guidelines

*With power comes great responsibilities.*

The scripting features in JCM/NTE allows the use of standard JavaScript API, as well as interoperability between Java and JS code, greatly improving the possibilities achievable by scripting. However there are a few things that you should be aware of before you go completely ham with it.

Note that this guideline only serves as a form of guidance. It is not possible to enforce the community to create scripts which behaves in a certain way. If you disagree or you do not wish to abide by these guidelines for any reason, you are free to do whatever you want. *You should however* be fully aware of the intention behind these guidelines and the consequence of doing so, as well as bearing the responsibilties that comes with it.

## 1. Recognize the scope of scripting
With the current scripting implementation, scripting may only be used on the client-side, which means scripts should not attempt to mutate anything on the server-side (e.g. Sending packet to update block entity data).

In addition to that, scripts should avoid doing anything that intentionally de-syncs the state shared between the server and the client. These manipulations may produce unpredictable or unreliable results which are not intended by mod developers, and they may break after a mod update (and are likely timing-sensitive as well).

Finally, scripting is a way to *enhance* the appearance, visual videlity and immersiveness of the MTR Mod. It should not be used as a platform to develop irrelevant tools & software. (For example, (ab)using eyecandy scripting to automatically download and update resource pack locally, serving as a Resource Pack Downloader). While these makes creative use of the scripting feature, it is out of scope and not considered a supported use case. You should always find substitute that are more fit for your purpose (e.g. A dedicated resource pack management mod/more generic scripting mod)

## 2. Do not use scripts as a security measure
Scripts are completely client-side (And they are intended to be client-only, at least for now), which means they can be changed by anyone locally to produce any results as they like.  
If access to a feature or information should be restricted to anyone in any shape or form, do not put the permission-checking responsibilities within the script. (e.g. Use of `PlayerEntity#hasPermissionLevel()` to check if a player have a certain OP level).

## 3. Have realistic expectations for computing performance
Minecraft (And Java for that matter) aren't necessarily known to be the fastest software on earth, and your user also very likely don't have the fastest computer either. Sometimes, it is necessary to make trade-off between computing speed and the quality you would like to achieve.

For example, simulating a 1920x540 on-train door display for an 8-car train with 5 doors on both sides (8x5x2 = 80 textures to manipulate every frame!) may cause servere performance issues, even though it is a valid configuration in real-life. (1)
{ .annotate }

1. (Reference: SP1900/SP1950 EMU train)

To meet an acceptable performance for both you and your player (If the scripts are to be distributed), you may need to downscale your texture, re-use textures across multiple doors/sides/carriages, or lower the frequency in which you update your texture. It means that the experience is going to be slightly degraded, but also computing (Especially when attempting to simulate the real-world) is all about compromises, you may often not be able to achieve a 1:1 replication, but only something that can be considered as "good enough" to get a pass.

## 4. Respect other scripts
Often times, the script that you created may not be the only script to be running in the game's environment or even within an instance (e.g. Mixing different scripts for an eyecandy object). Thus your script should also be considerate to other scripts which may be running, which generally boils down to the following:

- Be more conservative about the speed your script should run at.
- - For example, your script may take up to **16ms** to run and still be able to update in 60fps (1/60=~16.66ms). However you also need to consider that player may run other scripts, and often multiple instances of them, so 16ms may not be acceptable in this case.
- Prevent state variable collision
- - When mixing multiple scripts, the `create`/`render`/`dispose` are separately invoked, however the `state` variable is shared between all the scripts in the same instance. Because variables within the `state` object can be freely assigned by scripts, it may make it difficult to debug errors caused by it. To avoid collisions, you are suggested to add a prefix for the state variables in your script (e.g. `state.tgmt_hmi_ratelimit` instead of `state.ratelimit`)