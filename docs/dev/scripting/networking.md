# Networking API
The **Networking API** allows scripts to send HTTP requests to fetch data over the internet.

## Networking
|Functions|Description|
|:--------|:----------|
|`static Networking.fetch(url: String): NetworkResponse<DataReader>`|Fetch data from the corresponding URL. Returns a [NetworkResponse](#networkresponse) wrapping a [DataReader](./data_reading.md#datareader).|
|`static Networking.fetch(url: String, requestOption: RequestOption): NetworkResponse<DataReader>`|Fetch data from the corresponding URL, with custom [Request Options](#requestoption) applied.<br>Returns a [NetworkResponse](#networkresponse) wrapping a [DataReader](./data_reading.md#datareader).|

??? info "Show deprecated functions"
    These functions are kept for backward compatibility, before the introduction of a unified [Data Reading](./data_reading.md) API.    
    You are advised to avoid using these functions for newly created scripts.

    |Functions|Description|
    |:--------|:----------|
    |`static Networking.fetchString(url: String): NetworkResponse<String>`|Fetch plain text content from the corresponding URL.|
    |`static Networking.fetchString(url: String, requestOption: RequestOption): NetworkResponse<String>`|Fetch plain text content from the corresponding URL, with the request option applied. (See below for RequestOption)|
    |`static Networking.fetchImage(url: String): NetworkResponse<BufferedImage>`|Fetch image from the corresponding URL.|
    |`static Networking.fetchImage(url: String, requestOption: RequestOption): NetworkResponse<BufferedImage>`|Fetch image from the corresponding URL, with the request option applied. (See below for RequestOption)|

### RequestOption
This is a **JavaScript Object** that specifies connection-related details.

|Field Name|Type|Description|
|:---------|:---|:----------|
|`method`|string|The [HTTP method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods) used. Default to `GET`|
|`connectionTimeout`|number|Specify the max timeout in millisecond when sending the HTTP request.|
|`readTimeout`|number|Specify the max timeout in millisecond when retrieving data from an HTTP request.|
|`headers`|object|A JavaScript object which contains the HTTP header to apply when sending the request.|
|`body`|string|The request body to send. This is typically used for HTTP `POST` request.<br>**Note:** The <u>Content-Length</u> header will be automatically set if this field is supplied.|

### NetworkResponse
Represents an HTTP response.

If request is successful, it will be wrapping a dynamic type you can obtain via `getData()`.  
(Type is denoted in the [Networking](#networking) class in angle bracket syntax).

|Functions|Description|
|:--------|:----------|
|`NetworkResponse.getResponseCode(): int`|Get the HTTP Response Code, a list can be found [here](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).|
|<code>NetworkResponse.getData(): Dynamic Type \| null</code>|Obtain the fetched data. Null if the request failed.|
|`NetworkResponse.success(): boolean`|Whether the request succeeded.<br>**Note: This only returns whether a response is given back from the server, use `NetworkResponse.ok()` to check if the response code from server is in the OK range!**|
|`NetworkResponse.ok(): boolean`|Whether the response code is within 200 - 299 range.<br>Same as checking if `NetworkResponse.getResponseCode()` >= 200 and <= 299|
|<code>NetworkResponse.exception(): Exception \| null</code>|Returns the relevant java exception if the request failed.<br>Null if the request succeeded (`NetworkResponse.success()`)|
|`NetworkResponse.getHeaders(): Map<String, List<String>>`|Obtain the headers in the HTTP response|

### Example
``` js
/* GET request */
let response = Networking.fetch("https://api.modrinth.com/v2/project/minecraft-transit-railway");

if(dataResponse.success()) {
    if(dataResponse.ok()) {
        let data = response.getData();
        let mtrProjectStr = data.asString();
        let mtrProject = JSON.parse(mtrProjectStr);
        console.log(`The MTR mod is last updated on ${mtrProject.updated}`);
    } else {
        console.error(`Error: Server returned ${dataResponse.getResponseCode()}`);
    }
} else {
    console.error(`Failed to connect to server: ${dataResponse.exception().getMessage()}`);
}

/* POST request */
let dataResponse = Networking.fetch("https://localhost:7171", {
    method: "POST",
    connectTimeout: 1000, // in millisecond
    readTimeout: 1000, // in millisecond
    headers: {
        Accept: "application/json"
    },
    body: JSON.stringify(
        {
            key: "value"
        }
   )
});

... (AWT code)
if(onlineImage != null) {
    g.drawImage(onlineImage, 0, 0, null);
}
```
### Note on User-Agent
JCM always supplies a default **User-Agent** header with the value `Joban Client Mod (https://jcm.joban.org)`.

This value cannot be overriden (Or rather, JCM will always overwrites your preferred UA) *unless* you disable [Scripting Restrictions](./articles/scripting_restrictions.md), in which case you may override the `User-Agent` when supplying the header fields via [RequestOption](#requestoption).