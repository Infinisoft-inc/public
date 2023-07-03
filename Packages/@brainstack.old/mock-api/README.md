# @brainstack/mock-api
@brainstack/mock-api is a quick and simple API mocking tool developed by Infinisoft World Inc. It allows developers to set up a mock API server that listens to all incoming requests and provides configurable responses. With minimal setup, developers can quickly simulate API endpoints for testing and development purposes.

## Features
Listens to all incoming HTTP requests.
Configurable response callback.
Lightweight and easy to use.
No complex setup required.
Getting Started
To use @brainstack/mock-api, simply install it as a global package:

```bash
npm install -g @brainstack/mock-api
```

After installation, you can start the mock API server by running:

```bash
npx @brainstack/mock-api
```

By default, the server listens on port 3000 and responds with a "Thank you" message to all incoming requests.

## Customizing Responses
You can customize the response of the mock API server by providing your own response callback function. The callback function should accept a request body and return the desired response.

```javascript
const MockAPI = require('@brainstack/mock-api');


const responseCallback = (reqBody) => {
  // Customize the response based on the request body
  return { message: 'Custom response', data: reqBody };
};

const mockAPI = new MockAPI({ responseCallback });

// Start the server
mockAPI.start();
```


## About Infinisoft World Inc.
Infinisoft World Inc. is a technology company dedicated to providing innovative software solutions to businesses and individuals. Our goal is to empower our clients with cutting-edge technology and tools to help them succeed in the digital world.

For more information, visit our website: www.infinisoft.world

For any inquiries, contact us at: info@infinisoft.world

## License
This project is licensed under the ISC License.