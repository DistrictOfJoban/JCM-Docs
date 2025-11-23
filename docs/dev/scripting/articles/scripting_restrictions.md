# Scripting Restrictions

To prevent misuse of scripts, script may only access java classes from the following packages by default:

- `com.lx862.jcm.mod.scripting`
- `com.lx862.mtrscripting.util`
- `com.lx862.mtrscripting.wrapper`
- `java.lang`
- `java.awt`
- `java.lang`
- `java.math`
- `java.util`
- `java.time`
- `javax.imageio`
- `sun.java2d`
- `sun.font`
- `sun.awt`
- `org.mtr`

This restriction may be disabled by the player by going into JCM's settings.

Generally speaking you should avoid making scripts that requires the restriction to be disabled in the first place. If you distribute modpacks with the scripting restriction disabled by default, you *should* disclose that to the player in a prominent place, usually within the modpack README/installation guide so that at the very least the player are fully aware of the potential consequences.