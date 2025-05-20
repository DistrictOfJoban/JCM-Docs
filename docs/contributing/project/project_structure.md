# Project Structure
JCM development happens on the **Fabric modloader**. Everything from source code modification and assets to testing in development environement should happen there.  
Forge/other modloaders are only for compiling, and contains modloader-specific code.

The mod's code are located in `fabric/src/main/java/com/lx862/jcm/mod`, these files will be compiled by all modloaders. (If you have experience with Architectury, this is *technically* the common module)

The assets are located in `fabric/src/main/resources/assets/jsblock`, these files are also used by both fabric and forge.
Anything other than that is mod-loader specific.

Because the main mod's code are located in the fabric module, you need to run `forge:setupFiles` in gradle to copy the source code from Fabric to Forge. This is done automatically when using GitHub action to compile.