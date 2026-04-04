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

#### Stop
This represents a platform which the train will stop at.  
Also known as `RoutePlatform` in NTE.

|Functions And Objects|Description|
|:--------------------|:----------|
|`Stop.route: SimplifiedRoute?`| The [SimplifiedRoute](../../tsc.md#simplifiedroute) this stop belongs to.<br>Note: By default if multiple routes are assigned to the same stop, this will return the previous one.<br>Use `Stop.roundUpRoute` to get a copy where this variable would return the info of the next route.<br>Null if the data has not been fetched yet. |
|`Stop.station: Station?`|The [Station](../../tsc.md#station) this stop belongs to.<br>Null if the data has not been fetched yet.|
|`Stop.platform: Platform?`|The [Platform](../../tsc.md#platform) of this stop.<br>Null if the data has not been fetched yet.|
|`Stop.destinationName: String`|The destination string. Either the station name of the current route's final stop, or a custom destination defined in the route.|
|`Stop.routeInterchanges: List<RouteInterchange>`|Interchanging routes in this stop (i.e. All routes at Station, excluding current route). In a list of [RouteInterchange](#routeinterchange).<br>List would be empty if there's no interchange / data hasn't been fetched yet.|
|`Stop.connectingInterchanges: Map<String, List<RouteInterchange>`|A map corresponding to a list of interchanging routes, grouped by the name of all connecting stations.<br>Note: Multiple stations with the same name will be grouped together.<br>The current station is excluded, as it is already provided by `Stop.routeInterchanges`.|
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