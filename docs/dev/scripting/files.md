# Files API
The **Files** class allows saving/reading files with scripts to a limited degree. It is intended for scripts to use it as a config file as well as storing persistent/cache data. This is usually only useful for scripts requiring advanced functionalities.

### Scope

- Scripts can perform **Read/Write/Delete** operation under the **.minecraft/data/mtrscripting** directory. This directory is reserved for scripts to store data.
- Scripts can perform **Read** operation under **.minecraft**. This is intended to migrate existing scripts to MTR 4, which previously contains file residing on another directory. (And also to detect and provide mod compatibility for *really advanced* scripts)
- Scripts are not allowed to access anything outside the **.minecraft** directory.

|Functions|Description|
|:--------|:----------|
|`static Files.read(path: string...): DataReader`|Read a file based on the specified path and returns the [DataReader](./data_reading.md#datareader). (null if the file don't exist).<br>This function always resolves relatively starting from '''.minecraft'''.|
|`static Files.readData(path: string...): DataReader`|Read a file based on the specified path and returns the [DataReader](./data_reading.md#datareader). (null if the file don't exist).<br>**Note:** It is strongly recommended to store your file in a sub-directory with a unique name to avoid collision<br>This function always resolves relatively starting from **.minecraft/data/mtrscripting**.|
|`static Files.saveData(content: string, path: string...): void`|Save plain text content to the corresponding path. The filename should be included in the path already.<br>All parent directory in the path will be automatically generated if it doesn't exists.<br>This function always resolves relatively starting from '''.minecraft/data/mtrscripting'''.|
|`static Files.saveData(content: BufferedImage, path: string...): void`|Save a BufferedImage to the corresponding path. The filename should be included in the path already.<br>All parent directory in the path will be automatically generated if it doesn't exists.<br>This function always resolves relatively starting from '''.minecraft/data/mtrscripting'''.|
|`static Files.deleteData(path: string...): void`|Delete the file from the specified path.This function always resolves relatively starting from '''.minecraft/data/mtrscripting'''.|
|`static Files.hasData(path: string...): boolean`|Returns whether the specified file/directory exists.This function always resolves relatively starting from '''.minecraft/data/mtrscripting'''.|

## Example
``` js
// Notice that we don't use forward slash (/) or backslash (\) to specify path, but instead pass them onto multiple arguments (e.g. ("config", "mtr.json") instead of ("config/mtr.json")
let mtrConfigFile = Files.read("config", "mtr.json");
if(mtrConfigFile != null) { // File exists
    let mtrConfigStr = mtrConfigFile.asString();
    let mtrConfig = JSON.parse(mtrConfigStr);
    let mtrChatAnnouncementEnabled = mtrConfig.chatAnnouncements;
}

let nonExistentFile = Files.read("1234567890");
print(nonExistentFile); // null

/* Data reading */
let haveCompanyName = Files.hasData("tut_script", "company_name.txt");
let companyName = haveCompanyName ? "Unnamed Company" : Files.readData("tut_script", "company_name.txt").asString();

/* Data Saving */
Files.saveData("grass_has_been_touched", "tut_script", "stage.txt");
```
