
This is not an introduction to the math functions of the standard JavaScript library. Instead, this is a set of useful classes provided by NTE/JCM to perform transformations for model rendering and other things.

## Vector3f
A three-dimensional vector, that is, the coordinates (x, y, z).  

??? note "Difference between NTE and JCM's implementation"
    - In NTE, Vector3f uses float. In JCM, Vector3f is a wrapper around Vector3d for the underlying implementation and casts back to a float.
    - In NTE, operation methods does not return anything (void). In JCM, they now return an instance of itself (Vector3f), allowing method chaining to be used.

|Functions|Description|
|:--------|:----------|
|`new Vector3f(x: float, y: float, z: float)`|Creates an instance of the Vector3f class. |
|`new Vector3f(tscVec: Vector)`|Creates an instance of the Vector3f class from the [Vector](https://github.com/Minecraft-Transit-Railway/Transport-Simulation-Core/blob/master/src/main/java/org/mtr/core/tool/Vector.java) class from MTR's Transport Simulation Core. |
|`Vector3f.x(): float`|Returns the X coordinate|
|`Vector3f.y(): float`|Returns the Y coordinate|
|`Vector3f.z(): float`|Returns the Z coordinate|
|`Vector3f.copy(): Vector3f`|Returns a copy of the vector that can be independently modified. |
|`Vector3f.normalize(): Vector3f`|Normalizes to a unit vector, that is, it preserves its direction, but its length is 1. |
|`Vector3f.add(x: float, y: float, z: float): Vector3f`|Adds the given vector from an x y z coordinate|
|`Vector3f.add(other: Vector3f): Vector3f`|Adds the given vector from another Vector3f|
|`Vector3f.sub(other: Vector3f): Vector3f`|Subtract the given vector from another Vector3f|
|`Vector3f.mul(x: float, y: float, z: float): Vector3f`|Multiplies each coordinate by the specified numbers respectively. |
|`Vector3f.mul(n: float): Vector3f`|Multiplies each coordinate by the specified number. |
|`Vector3f.rotX(rad: float): Vector3f`|Rotates along the X axis, the angle is specified in radians.|
|`Vector3f.rotY(rad: float): Vector3f`|Rotates along the Y axis, the angle is specified in radians.|
|`Vector3f.rotZ(rad: float): Vector3f`|Rotates along the Z axis, the angle is specified in radians.|
|`Vector3f.cross(other: Vector3f): Vector3f`|Performs a vector product with another vector. The result will be perpendicular to both vectors. |
|`Vector3f.distance(other: Vector3f): float`|Returns the distance to the coordinates represented by the other vector. |
|`Vector3f.distanceSq(other: Vector3f): float`| Returns the square of the distance to the coordinates represented by the other vector. The calculation is somewhat faster than in the previous case. |
|`Vector3f.rawBlockPos(): BlockPos(MC)`| Returns BlockPos from Minecraft with rounded vector values. |
|`static Vector3f.ZERO: Vector3f`|Zero vector. **Do not operate/manipulate this object.** |
|`static Vector3f.XP: Vector3f`|Vector with value (1, 0, 0). **Do not operate/manipulate this object.**|
|`static Vector3f.YP: Vector3f`|Vector with value (0, 1, 0). **Do not operate/manipulate this object.**|
|`static Vector3f.ZP: Vector3f`|Vector with value (0, 0, 1). **Do not operate/manipulate this object.**|

## Matrices
When rendering, there is often a need to “restore the transformation state to the previous step”.

For example, let's say I want to add a "move down" transformation to render the bogie. But after the rendering I need to return to the transformation before the move in order to render other parts of the car.

Matrices implements a stack where multiple transformations can be stored. push and pop are performed in pairs.

|Functions|Description|
|:--------|:----------|
|`new Matrices(): Matrices`|Returns Matrices. Initially there is only one unit matrix.|
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