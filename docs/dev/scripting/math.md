
This is not an introduction to the math functions of the standard JavaScript library. Instead, this is a set of useful classes provided by NTE/JCM to perform transformations for model rendering and other things.

## Vector3f
A three-dimensional vector, that is, the coordinates (x, y, z).  

!!! note
    In NTE, Vector3f uses float, while in JCM Vector3f uses Vector3d for the underlying implementation and casts back to a float.

|Functions|Description|
|:--------|:----------|
|`new Vector3f(x: float, y: float, z: float)`|Creates an instance of the Vector3f class. |
|`Vector3f.x(): float`|Returns the X coordinate|
|`Vector3f.y(): float`|Returns the Y coordinate|
|`Vector3f.z(): float`|Returns the Z coordinate|
|`Vector3f.copy(): Vector3f`|Returns a copy of the vector that can be independently modified. |
|`Vector3f.normalize(): void`|Normalizes to a unit vector, that is, it preserves its direction, but its length is 1. |
|`Vector3f.add(x: float, y: float, z: float): void`|Adds the given vector from an x y z coordinate|
|`Vector3f.add(other: Vector3f): void`|Adds the given vector from another Vector3f|
|`Vector3f.sub(other: Vector3f): void`|Subtract the given vector from another Vector3f|
|`Vector3f.mul(x: float, y: float, z: float): void`|Multiplies each coordinate by the specified numbers respectively. |
|`Vector3f.mul(n: float): void`|Multiplies each coordinate by the specified number. |
|`Vector3f.rotX(rad: float): void`|Rotates along the X axis, the angle is specified in radians.|
|`Vector3f.rotY(rad: float): void`|Rotates along the Y axis, the angle is specified in radians.|
|`Vector3f.rotZ(rad: float): void`|Rotates along the Z axis, the angle is specified in radians.|
|`Vector3f.cross(other: Vector3f): void`|Performs a vector product with another vector. The result will be perpendicular to both vectors. |
|`Vector3f.distance(other: Vector3f): float`|Returns the distance to the coordinates represented by the other vector. |
|`Vector3f.distanceSq(other: Vector3f): float`| Returns the square of the distance to the coordinates represented by the other vector. The calculation is somewhat faster than in the previous case. |
|`Vector3f.rawBlockPos(): BlockPos(MC)`| Returns BlockPos from Minecraft with rounded vector values. |
|`static Vector3f.ZERO: Vector3f`|Zero vector. You should not use functions on it. |
|`static Vector3f.XP: Vector3f`|Vector with value (1, 0, 0)|
|`static Vector3f.YP: Vector3f`|Vector with value (0, 1, 0)|
|`static Vector3f.ZP: Vector3f`|Vector with value (0, 0, 1)|

## Matrices
When rendering, there is often a need to “restore the transformation state to the previous step”.

For example, let's say I want to add a "move down" transformation to render the bogie. But after the rendering I need to return to the transformation before the move in order to render other parts of the car.

Matrices implements a stack where multiple transformations can be stored. push and pop are performed in pairs.

|Functions|Description|
|:--------|:----------|
|`new Matrices()`|Returns Matrices. Initially there is only one unit matrix.|
|`Matrices.translate(x: float, y: float, z: float): void`|Adds a (x,y,z) translation transformation to the current state.|
|`Matrices.rotateX(xRad: float): void`|Rotates along the X axis, in radian|
|`Matrices.rotateY(yRad: float): void`|Rotates along the Y axis, in radian|
|`Matrices.rotateZ(zRad: float): void`|Rotates along the Z axis, in radian|
|`Matrices.rotateXDegrees(xDeg: float): void`|Rotates along the X axis, in degrees|
|`Matrices.rotateYDegrees(yDeg: float): void`|Rotates along the Y axis, in degrees|
|`Matrices.rotateZDegrees(zDeg: float): void`|Rotates along the Z axis, in degrees|
|`Matrices.pushPose(): void`|Places a copy of the current state on the stack. That is, a copy of the current state is saved.|
|`Matrices.popPose(): void`|Deletes the last element of the stack. That is, it resets the current state and then restores the last saved state as the last state.|
|`Matrices.popPushPose(): void`|It deletes first and then makes a copy of the saved state.|