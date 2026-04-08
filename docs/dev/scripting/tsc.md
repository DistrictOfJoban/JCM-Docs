# Transport Simulation Core API

Transport Simulation Core (TSC) is the backend serving MTR 4, it is responsible for holding all simulation data such as Stations / Depots / Rails, as well as performing the simulation itself.

When developing scripts, you may encounter several types which are related to TSC. The following provides some commonly used fields/functions for those types.

## Type

### Siding
Represents a siding rail.

!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/data/Siding.java)
    - [Schema Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/buildSrc/src/main/resources/schema/data/siding.json)

|Functions And Objects|Description|
|:--------------------|:----------|
|`Siding.getName(): String`|Returns the siding name / siding number.|
|`Siding.getHexId(): String`|Get the id of the siding, formatted in hexidecimal and returned as a String.|
|`Siding.getId(): long`|Returns the id of the siding.|
|`Siding.getRailLength(): double`|Returns the length of the siding in meters.|
|`Siding.getDepotName(): String`|Returns the name of the depot containing this siding.<br>Returns empty string if there's no data reference to the depot.|
|`Siding.getEarlyVehicleIncreaseDwellTime(): boolean`|Returns whether vehicle will extend it's dwell time if early.|
|`Siding.getMaxVehicles(): int`|Returns the maximum number of vehicles for this siding.<br>Returns 0 if unlimited vehicles.|
|`Siding.getIsUnlimited(): boolean`|Returns whether the siding allows unlimited vehicles.<br>Same as checking `Siding.getMaxVehicles() == 0`|
|`Siding.getDelayedVehicleSpeedIncreasePercentage(): int`|Returns the percentage in which train will increase it's speedif running late.<br>Unit is percentage in integer form.|
|`Siding.getDelayedVehicleReduceDwellTimePercentage(): int`|Returns the percentage in which train will reduce it's dwell time if running late.<br>Unit is percentage in integer form.|
|`Siding.getMidPosition(): Position`|Returns the [Position](#position) in the middle of the siding rail.|
|`Siding.containsPos(pos: Position): boolean`|Whether `pos` is equal to the start or end of the rail position.|

### Platform
Represents a platform rail.

!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/data/Platform.java)
    - [Schema Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/buildSrc/src/main/resources/schema/data/platform.json)

|Functions And Objects|Description|
|:--------------------|:----------|
|`Platform.routes: ObjectAVLTreeSet<Route>`|A list of routes that goes through this platform.|
|`Platform.routeColors: IntAVLTreeSet`|All colors of route that goes through this platform.|
|`Platform.getName(): String`|Returns the platform name / platform number.|
|`Platform.getHexId(): String`|Get the id of the platform, formatted in hexidecimal and returned as a String.|
|`Platform.getId(): long`|Returns the id of the platform.|
|`Platform.getDwellTime(): long`|The dwell time duration of the platform in millisecond.|
|`Platform.getMidPosition(): Position`|Returns the [Position](#position) in the middle of the platform rail.|
|`Platform.containsPos(pos: Position): boolean`|Whether `pos` is equal to the start or end of the rail position.|

### Station
Represents a Station area.

!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/data/Station.java)
    - [Schema Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/buildSrc/src/main/resources/schema/data/station.json)

|Functions And Objects|Description|
|:--------------------|:----------|
|`Station.getHexId(): String`|Get the id of the station, formatted in hexidecimal and returned as a String.|
|`Station.getId(): long`|Returns the id of the station.|
|`Station.getName(): String`|Returns the station name.|
|`Station.getColor(): int`|Returns the RGB color of the station.|
|`Station.getColorHex(): String`|Returns the RGB color of the station, formatted in hexidecimal and returned as a String.|
|`Station.getZone1(): long`|Returns Fare Zone 1 of the station.|
|`Station.getZone2(): long`|Returns Fare Zone 2 of the station.|
|`Station.getZone3(): long`|Returns Fare Zone 3 of the station.|
|`Station.getMinX(): long`|Returns the minimum X position of the station area.|
|`Station.getMinY(): long`|Returns the minimum Y position of the station area.|
|`Station.getMinZ(): long`|Returns the minimum Z position of the station area.|
|`Station.getMaxX(): long`|Returns the maximum X position of the station area.|
|`Station.getMaxY(): long`|Returns the maximum Y position of the station area.|
|`Station.getMaxZ(): long`|Returns the maximum Z position of the station area.|
|`Station.inArea(pos: Position): boolean`|Whether a [Position](#position) is inside the station area.|
|`Station.isTransportMode(mode: TransportMode): boolean`|Whether the given [TransportMode](#transportmode) is the same as the station's assigned transport mode.|
|`Station.getCenter(): Position`|Returns the [Position](#position) of the station area's center point.|
|`Station.getExits(): List<StationExit>`|Returns a list of station exits. ([StationExit](#stationexit))|

### StationExit
Represents a Station Exit entry.

!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/data/StationExit.java)
    - [Schema Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/buildSrc/src/main/resources/schema/data/stationExit.json)

|Functions And Objects|Description|
|:--------------------|:----------|
|`StationExit.getName(): String`|Returns the name of the exit. (i.e. Exit letter)|
|`StationExit.getDestinations(): List<String>`|Returns a list of destinations configured for the exit.<br>The 1st entry in the list is the chosen destination to be displayed by MTR Railway Signs.|

### TransportMode

!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/data/TransportMode.java)

Represents a type of transport.

|Functions And Objects|Description|
|:--------------------|:----------|
|`static TransportMode.TRAIN: TransportMode`|Returns an instance of TransportMode, representing rail transport.|
|`static TransportMode.BOAT: TransportMode`|Returns an instance of TransportMode, representing boat transport.|
|`static TransportMode.CABLE_CAR: TransportMode`|Returns an instance of TransportMode, representing cable car transport.|
|`static TransportMode.AIRPLANE: TransportMode`|Returns an instance of TransportMode, representing air transport.|
|`TransportMode.maxLength: int`|Returns the maximum vehicle length allowed for the transport.|


### SimplifiedRoute
!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/data/SimplifiedRoute.java)
    - [Schema Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/buildSrc/src/main/resources/schema/data/simplifiedRoute.json)

A Route object designed for consumption by the client-side, with several fields stripped out to save bandwidth.

*Note: Hidden routes are never transmitted to the client, therefore it is guarenteed that all SimplifiedRoute must not be hidden.*

??? note "Access of Route Number"
    Route Number (a.k.a. Light Rail Route Number) is not transferred as part of SimplifiedRoute.  
    It may be obtained via [VehicleExtraData](#vehicleextradata-stops-related)

|Functions And Objects|Description|
|:--------------------|:----------|
|`SimplifiedRoute.getName(): String`|Returns the route name.|
|`SimplifiedRoute.getId(): long`|Returns the id of the route.|
|`SimplifiedRoute.getColor(): int`|Returns the RGB color of the route.|
|`SimplifiedRoute.getCircularState(): Route.CircularState`|Returns the [Circular State](#routecircularstate) of the route|
|`SimplifiedRoute.getPlatforms(): List<SimplifiedRoutePlatform>`|Returns a list of [SimplifiedRoutePlatform](#simplifiedrouteplatform) object, representing the list of stop of the route.|
|`SimplifiedRoute.getPlatformIndex(platformId: long): int`|Given a platform id, returns the index of the first instance of the platform appearing in the route.<br>Returns **-1** if the platformId is not found in SimplifiedRoute's platform list.|

### SimplifiedRoutePlatform

!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/data/SimplifiedRoutePlatform.java)
    - [Schema Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/buildSrc/src/main/resources/schema/data/simplifiedRoutePlatform.json)

Equivalent to a stop the train will make.

|Functions And Objects|Description|
|:--------------------|:----------|
|`SimplifiedRoutePlatform.getPlatformId(): long`|Returns the id of the platform.|
|`SimplifiedRoutePlatform.getStationId(): long`|Returns the id of the belonging station area.|
|`SimplifiedRoutePlatform.getStationName(): String`|Returns the name of the belonging station area.|
|`SimplifiedRoutePlatform.getDestination(): String`|Returns the destination string of this platform in the route|

### Route.CircularState

!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/3432a3a6ceb5a817c7a5bb9a1bebfc963dab1076/src/main/java/org/mtr/core/data/Route.java#L124)

Represents a circular state of a route.

|Functions And Objects|Description|
|:--------------------|:----------|
|`static CircularState.NONE: CircularState`|The route is not circular.|
|`static CircularState.CLOCKWISE: CircularState`|The route is clockwise circular.|
|`static CircularState.ANTICLOCKWISE: CircularState`|The route is anti-clockwise circular.|

### Vehicle
!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/3432a3a6ceb5a817c7a5bb9a1bebfc963dab1076/src/main/java/org/mtr/core/data/Vehicle.java)
    - [Schema Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/buildSrc/src/main/resources/schema/data/vehicle.json)

A vehicle formation / consists.

|Functions And Objects|Description|
|:--------------------|:----------|
|`Vehicle.vehicleExtraData: VehicleExtraData`|The real-time data of the vehicle, related to operations. (Such as speed target, stop index etc.)<br>See [VehicleExtraData](#vehicleextradata)|


### VehicleExtraData
!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/3432a3a6ceb5a817c7a5bb9a1bebfc963dab1076/src/main/java/org/mtr/core/data/Vehicle.java)
    - [Schema Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/buildSrc/src/main/resources/schema/data/vehicle.json)

Represents real-time data of a vehicle.

|Functions And Objects|Description|
|:--------------------|:----------|
|`VehicleExtraData.getDepotId(): long`|Returns the id of the depot this vehicle's siding belongs to.|
|`VehicleExtraData.getSidingId(): long`|Returns the id of the siding this vehicle belongs to.|
|`VehicleExtraData.getStopIndex(): int`|Returns the next stop index along the PathData.|
|`VehicleExtraData.getIsTerminating(): boolean`|Returns whether the train has reached the last stop or beyond.|
|`VehicleExtraData.getStoppingPoint(): double`|Returns the absolute railProgress distance in which the train is expected stop.|
|`VehicleExtraData.getSpeedTarget(): double`|Returns the target speed the train should accelerate and follow against.<br>Unit is in `m/millisecond`, multiply by 1000 to get m/s.|
|`VehicleExtraData.iterateRidingEntities(callback: Consumer<VehicleRidingEntity>): void`|Executes a callback, providing all [VehicleRidingEntity](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/data/VehicleRidingEntity.java) of the current vehicle.|

#### VehicleExtraData (Stops-related)
|Functions And Objects|Description|
|:--------------------|:----------|
|`VehicleExtraData.getPreviousRouteId(): long`|Returns the id of the route in previous stops.<br>Returns 0 if there's no previous stop.|
|`VehicleExtraData.getPreviousRouteColor(): int`|Returns the id of the route's color in previous stops, in RGB format.<br>Returns 0 if there's no previous stop.|
|`VehicleExtraData.getPreviousRouteName(): String`|Returns the route name in previous stops.<br>Returns an empty string if there's no previous stop.|
|`VehicleExtraData.getPreviousRouteNumber(): String`|Returns the route number (In MTR 3, a lightRailRouteNumber) in previous stops.<br>Returns an empty string if there's no previous stop.|
|`VehicleExtraData.getPreviousRouteCircularState(): Route.CircularState`|Returns the route's [CircularState](#routecircularstate) in previous stops.<br>Returns Route.CircularState.NONE if there's no previous route.|
|`VehicleExtraData.getPreviousRouteType(): RouteType`|Returns the route's [RouteType](#routetype) in previous stops.<br>Returns RouteType.NORMAL if there's no previous stop.|
|`VehicleExtraData.getPreviousRouteDestination(): long`|Returns the route's destination of the last stop.<br>Returns an empty string f there's no previous stop / station area in previous stop.|
|`VehicleExtraData.getPreviousPlatformId(): long`|Returns the platform id of the last stop.<br>Returns 0 if there's no previous stop.|
|`VehicleExtraData.getPreviousStationId(): long`|Returns the station id of the last stop.<br>Returns 0 if there's no previous stop / station area in previous stop.|
|`VehicleExtraData.getPreviousStationName(): long`|Returns the station name of the last stop.<br>Returns an empty string if there's no previous stop / station area in previous stop.|

Equivalent function exists for:

- Current Stop (When docked) / Previous Stop (When moving)
    - Function prefix: `getThis` (e.g. `VehicleExtraData.getThisRouteId()`)
- Next Stop
    - Function prefix: `getNext` (e.g. `VehicleExtraData.getNextRouteId()`)

### RouteType
!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/3432a3a6ceb5a817c7a5bb9a1bebfc963dab1076/src/main/java/org/mtr/core/data/RouteType.java)

Represents the type of route.

|Functions And Objects|Description|
|:--------------------|:----------|
|`static RouteType.NORMAL: RouteType`|Normal Heavy Rail route.|
|`static RouteType.LIGHT_RAIL: RouteType`|A light rail route.|
|`static RouteType.HIGH_SPEED: RouteType`|A high speed rail route.|

### Vector
!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/tool/Vector.java)

A three-dimensional vector, that is, the coordinates (x, y, z).

One may convert this to a [Vector3f](./math.md#vector3f) by passing this to the Vector3f constructor.

|Functions And Objects|Description|
|:--------------------|:----------|
|`Vector.x(): double`|Return the x-axis component of the vector.|
|`Vector.y(): double`|Return the y-axis component of the vector.|
|`Vector.z(): double`|Return the z-axis component of the vector.|
|`Vector.multiply(x: double, y: double, z: double): Vector`|Multiply the vector, and return a new multiplied Vector.|
|`Vector.multiply(vec: Vector): Vector`|Multiply the vector, and return a new multiplied Vector.|
|`Vector.rotateX(angle: double): Vector`|Rotate the vector in the x-axis by angle. Returns a new rotated Vector.|
|`Vector.rotateY(angle: double): Vector`|Rotate the vector in the y-axis by angle. Returns a new rotated Vector.|
|`Vector.rotateZ(angle: double): Vector`|Rotate the vector in the z-axis by angle. Returns a new rotated Vector.|
|`Vector.distanceTo(vec: Vector): double`|Returns the distance in meter in comparison to `vec`.|
|`Vector.normalize(): Vector`|Normalize the vector. Returns a new normalized Vector.|
|`static Vector.getAverage(vec1: Vector, vec2: Vector): Vector`|Returns a new Vector representing the average position between vec1 and vec2.|

### Position
!!! info inline end "References"
    - [Class Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/data/Position.java)
    - [Schema Reference](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/buildSrc/src/main/resources/schema/data/position.json)

Represents a block position (x, y, z).

|Functions And Objects|Description|
|:--------------------|:----------|
|`new Position(x: long, y: long, z: long): Position`|Constructor, create a Position from the specified x y z coordinates.|
|`new Position(railPosition: Vector): Position`|Constructor, converting a [Vector](#vector) to a [Position](#position) by rounding down.|
|`Position.getX(): long`|Return the x position.|
|`Position.getY(): long`|Return the y position.|
|`Position.getZ(): long`|Return the z position.|
|`Position.offset(offsetX: long, offsetY: long, offsetZ: long): Position`|Returns a copy of the position, with the specified offset being added.|
|`Position.offset(pos: Position): Position`|Returns a copy of the position, with the xyz of the `pos` being added.|
|`Position.manhattanDistance(pos: Position): long`|Returns the manhattan distance of the current position and `pos`.|
|`static Position.getMin(pos1: Position?, pos2: Position?): Position`|Returns a new Position, with the minimum value for each individual axis (x y z), given 2 position value.<br>If `pos1` is null, it will return `pos2`.<br>If `pos2` is null, it will return `pos1`.|
|`static Position.getMax(pos1: Position?, pos2: Position?): Position`|Returns a new Position, with the maximum value for each individual axis (x y z), given 2 position value.<br>If `pos1` is null, it will return `pos2`.<br>If `pos2` is null, it will return `pos1`.|