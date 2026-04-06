# MTR Client Data

### MTRClientData
!!! warning inline end "Outside of API Coverage"
    This code is MTR's internal working and does not provide a stable API. The implementation of this class may change from version to version, potentially breaking compatibility for scripts that relies on it.

This object is a direct reference to the the [MinecraftClientData.java](https://github.com/Minecraft-Transit-Railway/Minecraft-Transit-Railway/blob/master/fabric/src/main/java/org/mtr/mod/client/MinecraftClientData.java) data class from MTR.

It is available globally for all scripts.

You may obtain additional information (Such as id to route) with this object. **Note however that to conserve network data usage / improve speed, MTR 4 only sends nearby data to the client.**