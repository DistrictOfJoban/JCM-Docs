# Example
## Spinning Teapot
This is the same as MTR/NTE's built-in "Utah Teapot" decoration object, except now it spins by itself via scripts :p

```js title="spinny_utah.js" linenums="1"
const SPIN_SPEED = 12;

// Load the MTR's built-in utah teapot model
const teapotRawModel = ModelManager.loadModel(Resources.id("mtr:models/object/teapot.obj"));

// The Utah teapot model is quite large by default, we can scale down the model first with code.
// Of course if you are the modeller yourself, you can always make the model itself more appropriately sized.
teapotRawModel.applyScale(0.15, 0.2, 0.15); // Same scale as NTE's / MTR's teapot eyecandy.

// Upload the model to the GPU for later rendering.
const teapotModel = ModelManager.upload(teapotRawModel);

// ----- Loading Stage Ends ----- //

function create(ctx, state, eyecandy) {
    state.rotationAngle = 0;
}

function render(ctx, state, eyecandy) {
    // Increment our rotation angle
    state.rotationAngle += (Timing.delta() * SPIN_SPEED); // Increment our rotation degree angle
    
    let matrices = new Matrices();
    matrices.rotateYDegrees(state.rotationAngle); // Rotate our matrices in degree

    // Draw it with the matrices transformation applied
    ctx.getRenderManager().drawModel(teapotModel, matrices);
}

// Since we have nothing to clean up, we can omit the dispose() function entirely.
```
