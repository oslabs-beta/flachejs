# FlacheJS

FlacheJS is an npm library for dealing with client-side caching.

## Installation

```sh
npm install flachejs
```

## Loading and configuring the module

### ES Modules (ESM)

```js
import flache from flachejs;
```

## Usage

### Plain text or HTML

```js
import flacheClient from flachejs;

const store = new flacheClient();
const response = await store.flacheRequest('https://github.com/');
const body = await response.text();

console.log(body);
```

### JSON

```js
import flacheClient from flachejs;

const store = new flacheClient();
const response = await store.flacheRequest('https://api.github.com/users/github');
const data= await response.json();

console.log(data);
```

### Simple Post

```js
import flacheClient from flachejs;

const store = new flacheClient();
const response = await store.flacheRequest('https://httpbin.org/post', {method: 'POST', body: 'a=1'});
const data = await response.json();

console.log(data);
```

### Post with JSON

```js
import flacheClient from flachejs;

const body = {a: 1};

const store = new flacheClient();
const response = await store.flacheRequest('https://httpbin.org/post', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});
const data = await response.json();

console.log(data);
```

### Handling Exceptions
Wrapping the fetch function into a `try/catch` block will catch _all_ exceptions, such as errors originating from node core libraries, like network errors, and operational errors which are instances of FetchError.

```js
import flacheClient from flachejs;

const store = new flacheClient();
try {
	await store.flacheRequest('https://domain.invalid/');
} catch (error) {
	console.log(error);
}
```

## API

### flacheClient([options])

- `options` [Options](#fetch-options) for the cache
- Returns: flache client

Create a flache client/store.

#### Options

The default values are shown after each option key.

```js
{
  maxCapacity: null, // this is in development
  ttl: 5000,
  config: {
    name: 'httpCache',
    storeName: 'request_response',
    description: 'A cache for client-side http requests',
    driver: [
      localforage.INDEXEDDB,
      localforage.LOCALSTORAGE,
    ],
    version: 1.0,
  }
}
```

### flacheRequest(url[, options])

- `url` A string representing the URL for fetching
- `options` [Options](#fetch-options) for the HTTP(S) request
- Returns: <code>Promise&lt;[Response](#class-response)&gt;</code>

Perform an HTTP(S) fetch.

`url` should be an absolute URL, such as `https://example.com/`. A path-relative URL (`/file/under/root`) or protocol-relative URL (`//can-be-http-or-https.com/`) will result in a rejected `Promise`.

#### Options

The default values are shown after each option key.

```js
{
	// These properties are part of the Fetch Standard
	method: 'GET',
	headers: {},            // Request headers. format is the identical to that accepted by the Headers constructor (see below)
	body: null,             // Request body. can be null, or a Node.js Readable stream
	redirect: 'follow',     // Set to `manual` to extract redirect headers, `error` to reject redirect
	signal: null,           // Pass an instance of AbortSignal to optionally abort requests

	// The following properties are node-fetch extensions
	follow: 20,             // maximum redirect count. 0 to not follow redirect
	compress: true,         // support gzip/deflate content encoding. false to disable
	size: 0,                // maximum response body size in bytes. 0 to disable
	agent: null,            // http(s).Agent instance or function that returns an instance (see below)
	highWaterMark: 16384,   // the maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource.
	insecureHTTPParser: false	// Use an insecure HTTP parser that accepts invalid HTTP headers when `true`.
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Team

- [Iraj Zuberi](https://github.com/izuberi)
- [Jacob Policano](https://github.com/jdpolicano)
- [Jasmair Jaswal](https://github.com/twojaytech)
- [Vernita Lawren](https://github.com/v-law)

## License

FlacheJS is developed under the ISC License
