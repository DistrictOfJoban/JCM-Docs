The `Networking` class allows scripts to send HTTP requests to fetch plain text content/images over the internet.

Calling any function within this class will return a **NetworkResponse**, which is described below.

If the HTTP request fails, an error will be thrown. Consider using `try/catch` block to handle script errors. **(This behaviour may change in the future!)**

|Functions|Description|
|:--------|:----------|
|`static Networking.fetchString(url: string): NetworkResponse<String>`|Fetch plain text content from the corresponding URL|
|`static Networking.fetchString(url: string, requestOption: RequestOption): NetworkResponse<String>`|Fetch plain text content from the corresponding URL, with the request option applied. (See below for RequestOption)|
|`static Networking.fetchImage(url: string): NetworkResponse<BufferedImage>`|Fetch image from the corresponding URL|
|`static Networking.fetchImage(url: string, requestOption: RequestOption): NetworkResponse<BufferedImage>`|Fetch image from the corresponding URL, with the request option applied. (See below for RequestOption)|

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
|Functions|Description|
|:--------|:----------|
|`NetworkResponse.getResponseCode(): int`|Get the HTTP Response Code, a list can be found [here](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes).|
|<code>NetworkResponse.getData(): string \| BufferedImage \| null</code>|Obtain the fetched data. This could be either a string, or an AWT BufferedImage depending on what function you invoke in HttpUtil.<br>Null if the request failed.|
|`NetworkResponse.success(): boolean`|Whether the request succeeded.<br>**Note: This only returns whether a response is given back from the server, use `NetworkResponse.ok()` to check if the response code from server is in the OK range!**|
|`NetworkResponse.ok(): boolean`|Whether the response code is within 200 - 299 range.<br>Same as checking if `NetworkResponse.getResponseCode()` >= 200 and <= 299|
|<code>NetworkResponse.exception(): Exception \| null</code>|Returns the relevant java exception if the request failed.<br>Null if the request succeeded (`NetworkResponse.success()`)|
|`NetworkResponse.getHeaders(): Map<String, List<String>>`|Obtain the headers in the HTTP response|

### Example
``` js
/* GET request */
let dataResponse = HttpUtil.fetchString("https://api.modrinth.com/v2/project/minecraft-transit-railway");

if(dataResponse.success()) {
    if(dataResponse.ok()) {
        let mtrProjectStr = dataResponse.getData();
        let mtrProject = JSON.parse(mtrProjectStr);
        print(`The MTR mod is last updated on ${mtrProject.updated}`);
    } else {
        print(`Error: Server returned ${dataResponse.getResponseCode()}`);
    }
} else {
    print(`Failed to connect to server: ${dataResponse.exception().getMessage()}`);
}

/* POST request */
let dataResponse = Networking.fetchString("https://localhost:7171", {
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

/* GET request (image) */
let onlineImageResp = Networking.fetchImage("https://wiki.minecrafttransitrailway.com/_media/wiki:logo.png");
let onlineImage = onlineImageResp.getData();

... (AWT code)
if(onlineImage != null) {
    g.drawImage(onlineImage, 0, 0, null);
}
```
### Further Note
JCM always supplies a default **User-Agent** header with the value `Joban Client Mod (https://joban.org/jcm)`.

This value cannot be overriden (Or rather, JCM will always overwrites your preferred UA) *unless* you disable [Scripting Restrictions](./articles/scripting_restrictions.md), in which case you may specify the `User-Agent` when supplying the header fields in [RequestOption](#requestoption).