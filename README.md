# SU: Shorten Urls

Yet another URL shortener application.

This is just for fun, production usage is not recommended.

## Running

You can run the application with `./bin/su.js` executable. It will run on 3000 with the host configured to localhost by default.

For testing out it with Docker, just type `docker-compose up` and it will also spin up MongoDB for you.

### Requirements

If you run this app on your machine, you need a MongoDB instance running.

### Configuration

|PORT|`3000`|Port number of the process|
|PUBLIC_URL|`'http://localhost:3000'`|Public url to be used in API response|
|MONGO_CS|`'mongodb://localhost/su_development'`|MongoDB connection string|

## API

### `POST /` Creating a redirection

```bash
curl -d '{"url":"http://www.example.org"}' -H "Content-Type: application/json" -X POST http://localhost:3000/
```

This will respond with the created redirection entity.

Sample response:

```json
{
  "_id":"5d00528c64c865ddd58be2cb",
  "original":"http://www.example.org",
  "hash":"862a23","
  __v":0,
  "location":"http://localhost:3000/5b5bf5"
}
```

### `GET /:hash` Calling redirects

`http://localhost:3000/5b5bf5` url will redirect to the created redirection's original URL, `http://www.example.org`.
