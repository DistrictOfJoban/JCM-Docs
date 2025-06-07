# Project Structure
NeoJCM is an addon making use of the Architectury project to enable cross-platform compiling for both Fabric and NeoForge.

Most of the development happens on the **common module**. This is where code and assets shared by both modloader are placed in. (e.g. Interacting with vanilla Minecraft mechanics)

The other module (NeoForge/Fabric) contains modloader-specific code. When compiling either of these, the assets and code from the common module would automatically get included, along with whatever is in the NeoForge/Fabric module.

## rhino module
One exception is the `rhino` module, which is not a modloader, but [rather a JavaScript engine in Java](https://github.com/mozilla/rhino), powering the PIDS scripting functionality in JCM.

The reason why this module exist is because JCM need to include and relocate the java package of the rhino code to avoid conflict with other scripting mods. However the rhino source code hardcoded the package name in a couple of places, making the JS engine not work if you relocate to any other package.

What the rhino module does is it automatically download a copy of the Rhino Source Code from GitHub, extract it and modify the hardcoded package name in the source code to our desired package name.