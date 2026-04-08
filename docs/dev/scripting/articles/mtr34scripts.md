# Dual-versioned scripts (MTR 3 & MTR 4)

Through conditional if-else logic, it is possible for scripts to execute in both MTR 3/NTE and MTR 4.

## What you need to know
- MTR 3/NTE script registration methods are kept, there is no need to migrate your pack format to MTR 4 yet.
- Use `Resources.getMTRVersion()` to query the running MTR version. If it starts with "4", it is MTR 4. You may save this to a variable (Like `IS_MTR4`) for multiple re-use in your scripts.
- Resorts to using NTE methods (Mentioned as "Deprecated" in this docs) to simplify code logic, as JCM provides backward compatibility to them.
- Use conditional logic such as if-else to execute different code depending on MTR 3 and MTR 4. You can also take advantage of the new APIs introduced in JCM with this branching logic, to provide further enhancements for MTR 4 users.
- JCM ships with [MTR Patch](../../../players/features/mtr-patch.md) which slightly improves loading time, memory usage and provide some more backward compatibility with NTE content. There are also minor improvements for content compatibility in MTR 4.0.4.

Note that the above tips are given only for scripts that require compatibility between both versions. Once you have decided to have your script only run in MTR 4, there is no longer any reason to follow the above practices. (Such as using deprecated methods)