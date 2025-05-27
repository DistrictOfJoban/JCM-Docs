
This is not an introduction to the math functions of the standard JavaScript library. Instead, this is a set of useful classes provided by NTE to perform transformations for model rendering and other things.

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