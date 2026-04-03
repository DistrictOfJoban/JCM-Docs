# Replacing MTR's Display Cube

It may be desirable to replace MTR's built display cube (Powering the LED/Destination displays for built-in vehicles), so that you can provide your own displays via scripting.

For custom bbmodel vehicles, this can easily be done by simply modifying the vehicle model itself. However for vehicles deriving from a built-in MTR model (Or those using the `base_train_type` feature in the MTR 3 format), removing the Displays bundled in the built-in model is not so trivial.

Therefore, JCM provides a feature which allows you to hide the display cube of the vehicle directly in the MTR Custom Resources File.

This can be done by appending `hide_display_cube` (MTR 3 format) / `hideDisplayParts` (MTR 4 format):

=== "MTR 4 Custom Resources"
    ``` json linenums="1" hl_lines="6" title="mtr_custom_resources.json"
    {
        "vehicles": [
            {
                "id": "train_test_a",
                "name": "Test Train A",
                "hideDisplayParts": true
                // Continue...
            }
        ]
    }
    ```

=== "MTR 3 / MTR-NTE Format"
    ``` json linenums="1" hl_lines="4" title="mtr_custom_resources.json"
    {
        "train_test_a": {
            "name": "Test Train A",
            "hide_display_cube": true
            // Continue...
        }
    }
    ```