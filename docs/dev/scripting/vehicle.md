Vehicle Scripting allows you to use [JavaScript](index.md) to control train rendering.

While JCM supports **vehicle scripting**, it is nowhere near a state for something useful to be made(1), and thus no implementation documentation is provided at the moment.
{ .annotate }

1. MTR 4 does not expose low-level model operation (Such as dynamically replacing the texture after uploading the model), therefore stuff like per-vehicle LCD screen is not quite possible.

## Concept
In MTR 4, there is no longer a concept of a **train**. Instead, we have vehicle, which is a single vehicle consist. A train in a siding is made up of multiple consists linked together, just like how it is in real-life.

Therefore, the vehicle scripting system revolves around a single consist instead of the whole train. If you have an 8-car train of the same type with scripting enabled, your script would be invoked 8 times during rendering.