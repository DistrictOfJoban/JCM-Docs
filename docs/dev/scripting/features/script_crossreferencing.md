# Vehicle script cross-referencing

In MTR 4, a script entry are defined separately from a vehicle object. (`vehicles` vs `vehicleScripts`) in order to maximize flexibility. (e.g. Re-using scripts across cars)

One downside of this approach is that script developers may forget to reference the `scriptId` in the vehicle object. This results in the scripts being loaded, but there's no effect for the vehicle.

To alleviate this, JCM will refuse to load the script (And display a warning in the console) if there's no vehicle referencing the script **in the same resource pack**.

You can bypass this by adding `"forceLoad": true` to the script entry and allow JCM to load it anyway.

## Use cases
### Sharing script entries in MTR 3 format
Under the MTR 3 / NTE format, the script object is contained inside the train object. Therefore each train must load it's own script entry if it wants to use scripting. This may result in a waste of power needing to parse the same script twice. (Or if your script have some information you want to share between them)

One way to work around this is to leverage the MTR 4 format to define a single script entry, which can be referenced by MTR 3 trains.

This can be done by renaming your MTR 3's `mtr_custom_resources.json` to `mtr_custom_resources_pending_migration.json` (If you have not done that already).  
After that define a shared script entry in `mtr_custom_resources.json` in MTR 4 format, with `"forceLoad": true`.

You can then add the `script_id` field in MTR 3's train object, replacing `scriptLocation`/`scriptText`, and now you can reference the same `script_id` across multiple trains.

This would be guarenteed to work under the same resource pack, since JCM always read `mtr_custom_resources.json` before reading `mtr_custom_resources_pending_migration.json`, so the MTR 4 script entry is always defined first, before being referenced by other MTR 3 trains.

### Cross Resource Pack Script Referencing
While highly not recommended (And not as practical/required), this approach allows scripts to be used across resource packs.

By adding `"forceLoad": true`, this ensures the script entry would remain loaded, allowing other resource packs to reference the same script id.

**Note: This is dependent on the order you put your resource pack in. The pack containing the script entries must be loaded first, before it gets referenced by other resource packs.**