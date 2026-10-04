# MTR Access API

Sometimes your script may need more surrounding context from the MTR Mod. For example you may want to find the station at a given position, or you want to check the preference of the MTR Mod, so your script can cater towards it.

Historically this is done by invoking MTR Mod's Java Class methods. However since they are not designed for outside use, it makes it easy to break between MTR versions, requiring rework of scripts.

The **MTR Access API** aims to provides a set of API for scripts to more trivially retrieve data from MTR Mod, while reducing the need to invoke MTR's internal classes.

This API ought to remain stable across versions to avoid breaking scripts as much as possible.

## API Reference

Classes listed below are exposed to all scripts, you may invoke them at any time.

### MTR.ClientConfig

This allows you to retrieve options & preferences the player has configured for the MTR Mod.

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.ClientConfig.isChatAnnouncementEnabled(): boolean`|Whether in-chat next-station announcement is enabled.|
|`static`<br>`MTR.ClientConfig.isTtsAnnouncementEnabled(): boolean`|Whether text-to-speech (MC Narrator) for next-station announcement is enabled.|
|`static`<br>`MTR.ClientConfig.shouldHideTranslucentParts(): boolean`|Whether translucent model part in vehicle models should be hidden.|
|`static`<br>`MTR.ClientConfig.getLanguageDisplay(): string`|Returns the preferred language used for railway signs display.<br>Possible values are:<br>- **NORMAL** - Multilingual (CJK + English)<br>- **CJK_ONLY** - Only display CJK characters.<br>- **NON_CJK_ONLY** - Only display non-CJK characters.|
|`static`<br>`MTR.ClientConfig.getDynamicTextureResolution(): int`|Returns the texture resolution level of dynamically-generated MTR Mod Signs (Like route map).<br>0 is the lowest, 8 is highest.|
|`static`<br>`MTR.ClientConfig.getVehicleOscillationMultiplier(): int`|Returns the oscillation multiplier for vehicles.<br>Multiply by **10** to get the oscillation percentage level. (e.g. 9 = 90%)|
|`static`<br>`MTR.ClientConfig.getDefaultRail3D(): boolean`|Whether the 3D variant is used for the default MTR rail model. |
|`static`<br>`MTR.ClientConfig.isCustomFontEnabled(): boolean`|Whether MTR Mod components that use Minecraft Vanilla's text drawing should adapt to the MTR font.|

### MTR.Data

This allows you to retrieve various client data of MTR.

!!! info "Data Knowledge"
    MTR 4 only fetches the minimal data needed for the operation. This means the client usually only has knowledge of nearby/connecting station areas & routes, instead of having access to the full set of MTR data in the world.

    Many functions may return **null** if the data is not known to client, even though it may exist on the server-side.

#### Station Related

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.Data.findStation(pos: Vector3f): Station?`|Find the [Station](./tsc.md#station) object that covers the given `pos` location.<br>Returns **null** if there's no station in that area that the client is aware of.|
|`static`<br>`MTR.Data.getStation(stationId: long): Station?`|Obtain the [Station](./tsc.md#station) object from a station ID.<br>Returns **null** if there's no station with the given id that the client is aware of.|
|`static`<br>`MTR.Data.getKnownStations(): List<Station>`|Returns a list of [Station](./tsc.md#station) object that the client is aware of.|

#### Depot Related

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.Data.findDepot(pos: Vector3f): Depot?`|Find the [Depot](./tsc.md#depot) object that covers the given `pos` location.<br>Returns **null** if there's no depot in that area that the client is aware of.|
|`static`<br>`MTR.Data.getDepot(stationId: long): Depot?`|Obtain the [Depot](./tsc.md#depot) object from a depot ID.<br>Returns **null** if there's no depot with the given id that the client is aware of.|
|`static`<br>`MTR.Data.getKnownDepots(): List<Depot>`|Returns a list of [Depot](./tsc.md#depot) object that the client is aware of.|

#### Route Related

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.Data.getRoute(routeId: long): SimplifiedRoute?`|Obtain the [SimplifiedRoute](./tsc.md#simplifiedroute) object from a route ID.<br>Returns **null** if there's no route with the given id that the client is aware of.|
|`static`<br>`MTR.Data.getKnownRoutes(): List<SimplifiedRoute>`|Returns a list of [SimplifiedRoute](./tsc.md#simplifiedroute) object that the client is aware of.|
|`static`<br>`MTR.Data.getKnownRoutesPassingPlatform(platformId: long): List<SimplifiedRoute>`|Returns a list of [SimplifiedRoute](./tsc.md#simplifiedroute) object that the client is aware of, which passes through platform with id `platformId`.|

#### Vehicle Related

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.Data.getVehicle(vehicleId: long): VehicleExtension?`|Obtain the [VehicleExtension](./tsc.md#vehicle) object from a vehicle ID.<br>Returns **null** if there's no vehicle with the given id that the client is aware of.|
|`static`<br>`MTR.Data.getPlayerMountedVehicle(): VehicleExtension?`|Obtain the [VehicleExtension](./tsc.md#vehicle) object that the client is onboard.<br>Returns **null** if player is not onboard a vehicle.|
|`static`<br>`MTR.Data.getKnownVehicles(): List<VehicleExtension>`|Returns a list of [VehicleExtension](./tsc.md#vehicle) object that the client is aware of.|
|`static`<br>`MTR.Data.isPlayerMounted(vehicleId: long): boolean`|Whether a player is currently onboard a Vehicle/Lift.|

#### Lift Related

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.Data.getLift(liftId: long): Lift?`|Obtain the [Lift](./tsc.md#lift) object from a lift ID.<br>Returns **null** if there's no lift with the given id that the client is aware of.|
|`static`<br>`MTR.Data.getPlayerMountedLift(): Lift?`|Obtain the [Lift](./tsc.md#lift) object that the client is onboard.<br>Returns **null** if player is not onboard a lift.|
|`static`<br>`MTR.Data.getKnownLifts(): List<Lift>`|Returns a list of [Lift](./tsc.md#lift) object that the client is aware of.|

#### Rail Related

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.Data.getRailFromPath(path: PathData): Rail`|Obtain a [Rail](./tsc.md#rail) object from a [PathData](./tsc.md#pathdata).<br>This function tries to look up an instance of the Rail with more details, such as the rail models applied.<br>If failed, it will return the original rail with PathData.|
|`static`<br>`MTR.Data.getKnownRails(): List<Rail>`|Returns a list of [Rail](./tsc.md#rail) object that the client is aware of.|
|`static`<br>`MTR.Data.isRailBlocked(railHexId: String): boolean`|Whether a rail segment is occupied. (Due to signal)|
|`static`<br>`MTR.Data.getKnownBlockedRails(): List<String>`|Returns a list of Rail Hex IDs whose rail is blocked. (Due to signal)|
|`static`<br>`MTR.Data.getBlockedSignalColors(railHexId: String): List<Long>`|Returns a list of signal color values (RGB) which is blocked within a rail segment.|

#### Platform Rail Related

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.Data.getPlatform(platformId: long): Platform?`|Obtain a [Platform](./tsc.md#platform) object from a Platform ID.<br>Returns **null** if there's no platform with the given id that the client is aware of.|
|`static`<br>`MTR.Data.getKnownPlatforms(): List<Platform>`|Returns a list of [Platform](./tsc.md#platform) object that the client is aware of.|
|`static`<br>`MTR.Data.findNearbyPlatforms(pos: Vector3f, radius: int): List<Platform>`|Obtain a list of [Platform](./tsc.md#platform) object, that is within `radius` block of `pos`.|

#### Siding Rail Related

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.Data.getSiding(sidingId: long): Siding?`|Obtain a [Siding](./tsc.md#siding) object from a Platform ID.<br>Returns **null** if there's no platform with the given id that the client is aware of.|
|`static`<br>`MTR.Data.getKnownSidings(): List<Siding>`|Returns a list of [Siding](./tsc.md#siding) object that the client is aware of.|
|`static`<br>`MTR.Data.findNearbySidings(pos: Vector3f, radius: int): List<Siding>`|Obtain a list of [Siding](./tsc.md#siding) object, that is within `radius` block of `pos`.|

#### Arrivals Related

|Functions|Description|
|:--------|:----------|
|`static`<br>`MTR.Data.getArrivals(platformId: long): ArrivalEntries`|Obtain arrivals of a single platform. Returns an [ArrivalEntries](./type/pids/index.md#arrivalentries), identical to the one obtained via `pids.arrivals()` in JCM PIDS scripting.|
|`static`<br>`MTR.Data.getArrivals(platformIds: long[]): ArrivalEntries`|Obtain arrivals of multiple platforms. Returns an [ArrivalEntries](./type/pids/index.md#arrivalentries), identical to the one obtained via `pids.arrivals()` in JCM PIDS scripting.|