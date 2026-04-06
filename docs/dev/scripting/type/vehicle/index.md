# Vehicle Scripting

Vehicle Scripting allows you to use [JavaScript](../index.md) to control train rendering.

While JCM supports **vehicle scripting**, it is nowhere near a state for something useful to be made(1), and thus no implementation documentation is provided at the moment.
{ .annotate }

1. MTR 4 does not expose low-level model operation (Such as dynamically replacing the texture after uploading the model), therefore stuff like per-vehicle LCD screen is not quite possible.

## Concept
In MTR 4, there is no longer a concept of a **train**. Instead, we have vehicle, which is a single vehicle consist. A train in a siding is made up of multiple consists linked together, just like how it is in real-life.

Therefore, the vehicle scripting system revolves around a single consist instead of the whole train. If you have an 8-car train of the same type with scripting enabled, your script would be invoked 8 times during rendering.

**(No longer true, need updating)**

### API Reference

#### Vehicle
Represents a vehicle / trainset / train consist.

|Functions And Objects|Description|
|:--------------------|:----------|
|`Vehicle.getStops(): List<Stop>`|Get a list of [Stop](#stop) the vehicle will make, across all routes.|
|`Vehicle.getThisRouteStops(): List<Stop>`|Get a list of [Stop](#stop) the vehicle will make for the current running route.|
|`Vehicle.getNextRouteStops(): List<Stop>`|Get a list of [Stop](#stop) the vehicle will make for the upcoming route.|
|`Vehicle.getNextStopIndex(stopList: List<Stop>, overrunTolerance: double = 0.5): int`|Get the index of the next stop within a `stopList`. (Can be obtained above).<br>`overrunTolerance` is the tolerance in meters in which the next stop will still be counted as the previous stop, even after overruning the stop mark.<br>Returns `stopList.size()` if vehicle already passed all stops in the given `stopList`.|
|`Vehicle.isStopsDataFetched(): boolean`| Whether the stop data is fetched from the server (Instead of being compiled locally).<br>i.e. Always false if data fetch mode is set to `NONE`.|
|`Vehicle.isRendered(): boolean`|Returns whether any car is being rendered. (i.e. Not being culled by MTR)|
|`Vehicle.isCarRendered(cars: int...): boolean`|Returns whether any of the given car index is being rendered.|
|`Vehicle.isClientPlayerRiding(): boolean`|Returns whether the client player is riding (onboard) the current vehicle.|
|`Vehicle.getMtrVehicle(): VehicleExtension`|Returns the underlying MTR VehicleExtension.|
|`Vehicle.getId(): long`|Returns a unique id representing this vehicle.|
|`Vehicle.getSiding(): Siding?`|Returns the [Siding](../../tsc.md#siding) that this vehicle belongs to.<br>Returns null if client does not have reference to the Siding, or data fetching is in progress.|
|`Vehicle.getVehicleId(carIndex: int): String?`|Returns the Vehicle Resource ID as defined in the resource pack for the given `carIndex`.<br>Null if `carIndex` is beyond the car-length of this vehicle.|
|`Vehicle.getLength(carIndex: int): double`|Returns the length (in meters) of the car `carIndex`.|
|`Vehicle.getWidth(carIndex: int): double`|Returns the width (in meters) of the car `carIndex`.|
|`Vehicle.getTransportMode(): TransportMode`|Returns the [TransportMode](../../tsc.md#transportmode) of the current vehicle.|
|`Vehicle.getCarCount(): int`|Returns the number of cars this vehicle has.|
|`Vehicle.getServiceAcceleration(): double`|Returns the acceleration value configured in the siding, and used when the vehicle is in 100% acceleration rate.<br>Unit is `m/millis^2` (Multiply by 1000^2 for m/s^2)|
|`Vehicle.getServiceDeceleration(): double`|Returns the deceleration value configured in the siding, and used when the vehicle is in 100% deceleration rate.<br>Unit is `m/millis^2` (Multiply by 1000^2 for m/s^2)|
|`Vehicle.getMaxManualSpeed(): double`|Returns the maximum allowed manual speed for this vehicle.<br>Unit is `m/millis`. (Multiply by 1000 for m/s)|
|`Vehicle.isManualAllowed(): boolean`|Returns whether manual driving is enabled for this vehicle.|
|`Vehicle.getManualToAutomaticTime(): int`|Returns the time required for the vehicle to automatically switch to automatic operation (ATO), when no one is driving.<br>Unit is in `millisecond`. (Multiply by 1000 for second)|
|`Vehicle.getPathData(): List<PathData>`|Returns the [PathData](../../tsc.md#pathdata) for this vehicle.<br>Note: Due to MTR 4's data syncing mechanism, only a portion of the full PathData will be returned, instead of the full route.|
|`Vehicle.getRailProgress(carIndex: int = 0): int`|Returns the distance in meters the vehicle has travelled since departing from the siding.<br>Supplying a `carIndex` would offset the progress by the car length.|
|`Vehicle.getRailIndex(railProgress: double, roundDown: boolean): int`|Returns the index of PathData given a `railProgress`.<br>`roundDown` will return the previous path index if vehicle is stopped exactly on a node.|
|`Vehicle.getRailSpeed(pathIndex: int): double`|Returns the speed of a section given a `pathIndex` (via `getRailIndex`).<br>Unit is in `km/h`.|
|`Vehicle.getNotchLevel(): int`|Returns the manual driving notch for the current vehicle.<br>Positive number indicates acceleration, negative number indicates deceleration.<br>In MTR 4, the range is between **-5** and **5** for normal operation.<br>Values up to **-7** and **7** is possible, representing 140% of the service acceleration/deceleration.<br>Values up to **-8** is possible, representing emergency brake (EM).|
|`Vehicle.getNotchPosition(): double`|Returns the manual driving notch in the form of a relative percentage, irrespective of the number of notch available.<br>Positive number indicates acceleration, negative number indicates deceleration.<br>Normal operation would return between **-1** and **1**.<br>Values higher than 1 is possible as MTR 4 allows up to 140% of acceleration/deceleration rate, as well as emergency brake.|
|`Vehicle.getSpeedMs(): double`|Returns the current vehicle speed in m/s.|
|`Vehicle.getSpeedKmh(): double`|Returns the current vehicle speed in km/h.|
|`Vehicle.getDoorValue(): double`|Returns a value between 0.0 (Closed) and 1.0 (Opened) representing the door value.<br>This does not account for the actual door opening position, which may be affected by e.g. whether nearby platform blocks are installed.|
|`Vehicle.isCurrentlyManual(): boolean`|Returns whether the vehicle is currently manually driven.|
|`Vehicle.isReversed(): boolean`|Whether the vehicle is running in reverse.<br>Changed after a turnback rail.|
|`Vehicle.isOnRoute(): boolean`|Whether the vehicle has started up and no longer idle in the siding.|
|`Vehicle.getTotalDwellTime(): long`|Returns the total dwell time for the current platform.<br>Unit is in `millisecond`.<br>Returns **-1** if vehicle is not on a platform.|
|`Vehicle.getElapsedDwellTime(): long`|Returns the elapsed dwell time synced from the server.<br>Unit is in `millisecond`.<br>**Note: The values are outputted as-is from the periodic syncing of the server, which is not real-time. The client does not count elapsed dwell time by itself.**|

??? info "Show deprecated fields/functions"
    These are the functions implemented in JCM for backward compatibility with scripts made for MTR-NTE.  
    Newer scripts should not utilize these functions anymore.

    |Functions|Description|
    |:--------|:----------|
    |`Vehicle.getAllPlatforms(): List<Stop>`|Equivalent to `Vehicle.getStops()`.|
    |`Vehicle.getThisRoutePlatforms(): List<Stop>`|Equivalent to `Vehicle.getThisRouteStops()`.|
    |`Vehicle.getNextRoutePlatforms(): List<Stop>`|Equivalent to `Vehicle.getNextRouteStops()`.|
    |`Vehicle.getAllPlatformsNextIndex(): int`|Equivalent to `getNextStopIndex(getStops(), 0)`.<br>(0m overrun tolerance)|
    |`Vehicle.getThisRoutePlatformsNextIndex(): int`|Equivalent to `getNextStopIndex(getThisRouteStops(), 0)`.<br>(0m overrun tolerance)|
    |`Vehicle.id(): long`|Equivalent to `Vehicle.getId()`.|
    |`Vehicle.siding(): Siding`|Equivalent to `Vehicle.getSiding()`.|
    |`Vehicle.transportMode(): TransportMode`|Equivalent to `Vehicle.getTransportMode()`.|
    |`Vehicle.trainCars(): int`|Equivalent to `Vehicle.getCarCount()`.|
    |`Vehicle.shouldRender(): boolean`|Always returns true.|
    |`Vehicle.shouldRenderDetail(): boolean`|Always returns true.|
    |`Vehicle.trainTypeId(): String`|Equivalent to `Vehicle.getVehicleId(0)`.|
    |`Vehicle.mtrTrain(): VehicleExtension`|Equivalent to `Vehicle.getMtrVehicle()`.|
    |`Vehicle.speed(): double`|Equivalent to `Vehicle.getSpeedMs() * (1/20d)`.|
    |`Vehicle.spacing(): double`|Equivalent to `Vehicle.getLength(0)`.|
    |`Vehicle.width(): double`|Equivalent to `Vehicle.getWidth(0)`.|
    |`Vehicle.accelerationConstant(): double`|Equivalent to `(Vehicle.getServiceAcceleration() * 1000 * 1000) / (1/400d)`.|
    |`Vehicle.railProgress(): double`|Equivalent to `Vehicle.getRailProgress()`.|
    |`Vehicle.path(): List<PathData>`|Equivalent to `Vehicle.getPathData()`.|
    |`Vehicle.manualAllowed(): boolean`|Equivalent to `Vehicle.isManualAllowed()`.|
    |`Vehicle.doorValue(): double`|Equivalent to `Vehicle.getDoorValue()`.|
    |`Vehicle.manualToAutomaticTime(): int`|Equivalent to `Vehicle.getManualToAutomaticTime()`.|


#### Stop
This represents a platform which the train will stop at.  
Also known as `RoutePlatform` in NTE.

|Functions And Objects|Description|
|:--------------------|:----------|
|`Stop.route: SimplifiedRoute?`| The [SimplifiedRoute](../../tsc.md#simplifiedroute) this stop belongs to.<br>Note: By default if multiple routes are assigned to the same stop, this will return the previous one.<br>Use `Stop.roundUpRoute` to get a copy where this variable would return the info of the next route.<br>Null if the data has not been fetched yet. |
|`Stop.station: Station?`|The [Station](../../tsc.md#station) this stop belongs to.<br>Null if the data has not been fetched yet.|
|`Stop.platform: Platform?`|The [Platform](../../tsc.md#platform) of this stop.<br>Null if the data has not been fetched yet.|
|`Stop.destinationName: String`|The destination string. Either the station name of the current route's final stop, or a custom destination defined in the route.|
|`Stop.routeInterchanges: List<RouteInterchange>`|Interchanging routes in this stop (i.e. All routes at Station, excluding current route). In a list of [RouteInterchange](#routeinterchange).<br>Hidden routes are excluded from the list.<br>List would be empty if there's no interchange / data hasn't been fetched yet.|
|`Stop.connectingInterchanges: Map<String, List<RouteInterchange>`|A map corresponding to a list of interchanging routes, grouped by the name of all connecting stations.<br>Note: Multiple stations with the same name will be grouped together.<br>The current station is excluded, as it is already provided by `Stop.routeInterchanges`.<br>Hidden routes are excluded from the list.<br>List would be empty if there's no interchange / data hasn't been fetched yet.|
|`Stop.dwellTimeMillis: long`|The dwell time of the stop in millisecond.<br>**-1** if `Stop.platform` is null (Unknown).|
|`Stop.distance: double`|The railProgress representing the docking (stopping) position of this stop.<br>**-1** if data fetching is disabled (Unknown).|
|`Stop.isRouteSwitchoverStop: boolean`|Whether the current stop is the last stop of one route, and the first stop of the next route. (i.e. Route Switchover)|
|`Stop.roundUpRoute: Stop`|If `Stop.isRouteSwitchoverStop` is true, accessing this object will return a copy of this stop, with infos of the next route. (Affecting `Stop.route`, `Stop.destinationName`, `Stop.routeInterchanges` etc.).<br>Otherwise, this will return the current stop (Unchanged).|

??? info "Show deprecated fields/functions"
    These fields/functions are kept for backward compatibility with NTE. You are advised to avoid using these fields/functions for newly created scripts.
    
    |Functions And Objects|Description|
    |:--------------------|:----------|
    |`Stop.dwellTime: long`|The dwell time for current stop, in unit (seconds * 2).<br>Use `dwellTimeMillis` instead.|
    |`Stop.reverseAtPlatform: boolean`|Equivalent to `Stop.isRouteSwitchoverStop` (Yes it's true!)|


#### RouteInterchange

Represent an interchanging route.

<sub>Note: Information are exposed as-is from MTR. Other than the fields below, there are no more information obtainable for the intechanging route.</sub>

|Functions And Objects|Description|
|:--------------------|:----------|
|`RouteInterchange.color: int`|The RGB color of the route.|
|`RouteInterchange.name: String`|The name of the route.|