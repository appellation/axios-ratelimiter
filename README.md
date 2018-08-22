# Axios ratelimiter

Gracefully handle requests to ratelimited APIs.

```js
const { default: ratelimiter } = require('axios-ratelimiter');
const axios = require('axios').create({
  adapter: ratelimiter({
    key: (method, url) => url, // return the ratelimit bucket key
    headers: { // headers from the API that provide ratelimiting data
      global: 'x-ratelimit-global',
      limit: 'x-ratelimit-limit',
      reset: 'x-ratelimit-reset',
      remaining: 'x-ratelimit-remaining',
      retry: 'x-ratelimit-retry',
    },
  });
});

for (let i = 0; i < 10; i++) axios.get('/some/ratelimited/endpoint');
```
