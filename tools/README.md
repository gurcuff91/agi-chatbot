# Tools

This directory contains JavaScript tools that the agent can use to perform various operations.

## Available Tools

### getWeather.js

Gets the current weather for a given city using wttr.in (public service, no API key required).

**Usage:**

```javascript
const { getWeather } = require("./tools/getWeather.js");

const weather = await getWeather("Panama City");
```

**Command line:**

```bash
node tools/getWeather.js "Panama City"
```

**Setup:**

No setup required! This tool uses the public wttr.in service and works immediately.

**Returns:**

```json
{
  "city": "Panama City",
  "country": "Panama",
  "temperature": 28,
  "feelsLike": 32,
  "description": "Clear",
  "humidity": 65,
  "windSpeed": 8.5,
  "visibility": 10,
  "pressure": 1013,
  "uvIndex": 5
}
```
