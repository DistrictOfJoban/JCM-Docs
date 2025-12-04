# Scripted PIDS Preset

**Scripted PIDS Preset** is a new experimental feature introduced in **JCM 2.0.0**. It allows content developer to make new PIDS Preset using Javascript. The system is inspired by the **Nemo Transit Expansion** mod in MTR mod 3.x.

!!! note "Important note!"
    There have been multiple attempts regarding PIDS Customization with the MTR Mod.  
    This system is **not compatible** with any of the following:

    - PIDS Layout Editor / PIDS Modularization / PIDS JSON by EpicPuppy
    - PIDS text customization seen in early betas of MTR 4.

    You are **not able** to import any data from the above to this system, and the way it works is fundamentally different.  
    Therefore, this can be seen as a replacement to the above systems which supports the latest/official MTR mod releases, but not a drop-in replacement. The barrier to entry is higher, though it also means that more complex PIDS displays can benefit from this.

## Motivation
The most common questions I have received regarding PIDS Preset is *Can I replicate X PIDS from this Metro?*. Unfortunately the answer that had to be given is usually a **no**.

This is due to the **JSON PIDS Preset** always following a fixed-layout consisted of a Header Bar (Weather & Time), and 4 rows of arrivals.  
However metros around the world have different approaches to how they want to display their information, and given the combination it's not really feasible to just "add a toggle" for each layout seen around the world.

Therefore, it is decided that building a platform that allows players around the world to express their creativity is the way forward.

## Why not use JSON format to express custom logic?
While many content developer are more familiar with JSON than JavaScript, the JSON format is too verbose to write conditional logic by plain text, and requires a GUI Editor to achieve anything functional in a productive manner (Which again, takes longer development time).

A component/module based system is an option [Which is actually what is internally used in JCM](https://github.com/DistrictOfJoban/Joban-Client-Mod/tree/c11496cf73134d494673d37faca67745d24b051c/fabric/src/main/java/com/lx862/jcm/mod/data/pids/preset/components), however the component itself also needs to be configurable enough to allow all sorts of combinations, which sort of goes back to the "add a toggle to everything", just in a smaller scale. Whereas JS allows user to express their own custom logic, implemented in the way they wish.

(And if custom logic are to be implemented in JSON anyway, it might be better to just go with an established programming language)

This is also partially done to assess scripting in a larger-scale and the feasibility of porting scripting to future MTR mod versions.

## Will the JSON Format stay available?
Don't worry, the JSON Format will remain available as a simplified form of customizing PIDS, and will not be removed anytime soon. It's just another type of preset that is available alongside Scripted PIDS Preset.

## Is JS the recommended way of making PIDS Preset from now on?
Please keep in mind that scripting is introduced as an experiment and we need your voice to tell whether it should be the way forward, so nothing is set in stone yet!

## Do I need to learn JavaScript to make this?
Learning the syntax of the JavaScript Language is usually enough to get by. As JS is predominantly used on Websites and Server (Node.js), many tutorials covers those APIs specifically. However most of them are not available in JCM's scripting implementation.

If you are unsure, you can also check out the following tutorial.

## Getting started
For a practical tutorial, see [Building a Scripted PIDS Preset](../../scripting/type/pids/tut/pids_tut.md).

For documentation, please read the [Documentation](../../scripting/type/pids/index.md).

If instead you would like to learn by example, you can download the [Example Scripted Preset Resource Pack](./files/JCM_JS_PIDS_RP.zip) and inspect the scripts.
