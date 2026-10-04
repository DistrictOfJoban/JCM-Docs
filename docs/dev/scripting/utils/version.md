# Versions Querying

You may obtain the version number of different components (Like MTR Mod/JCM's version), so your script can cater for different conditional logic for different version if necessary.

## API Reference

!!! note inline end ""mtrscripting" vs "jcm""
    Currently the `mtrscripting` addon id is equivalent to `jcm`.
    
    This id is reserved for when scripting may be split to an individual addon from JCM.  
    If you are using Vehicle/Eyecandy scripting and requiring checking for API compatibility, use `mtrscripting` instead.  
    If you are using PIDS Scripting, continue checking `jcm`.

|Functions|Description|
|:--------|:----------|
|`static Resources.getAddonVersion(modId: String): String`|Obtain the version of a mod that is hooked to the scripting functionality.<br>Out of the box in JCM, the possible value of `modId` are:<br>- mtr<br>- jcm<br>- mtrscripting|

??? info "Show deprecated fields/functions"
    These functions are kept for backward compatibility with NTE/ANTE. You are advised to avoid using these functions for newly created scripts.

    |Functions|Description|
    |:--------|:----------|
    |`static Resources.getMTRVersion(): String`|Returns the version of the MTR mod in String. (e.g. `4.0.3`)<br>Use `Resources.getAddonVersion()` instead.|
    |`static Resources.getNTEVersion(): String`|Obtain the version of NTE in String.<br>As NTE did not get ported to MTR 4, it always returns `0.5.2+1.19.2` for backward compatibility.|
    |`static Resources.getNTEVersionInt(): int`|Obtain the version of NTE in integer.<br>As NTE did not get ported to MTR 4, it always returns `502` for backward compatibility.|
    |`static Resources.getNTEProtoVersion(): int`|Obtain the version of NTE's protocol version in integer.<br>As NTE did not get ported to MTR 4, it always returns `2` for backward compatibility.|