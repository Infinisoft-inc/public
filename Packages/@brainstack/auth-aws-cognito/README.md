# @brainstack/auth-aws-cognito Integration **IN DEVELOPMENT**

This module provides an integration between `@brainstack/auth` and Amazon Cognito authentication using the `aws-amplify` library.

## Installation

Install the module using npm:

```bash
npm install @brainstack/auth-aws-cognito
```

## Usage

To integrate Amazon Cognito authentication into your application using `@brainstack/auth`, follow these steps:

1. Import and Configure  

```javascript
import { createAuthCognitoIntegration } from '@brainstack/auth-aws-cognito';
import { createAuthProvider } from '@brainstack/auth';

const awsConfig = {
  // Your AWS Amplify configuration
};

const authIntegration = createAuthCognitoIntegration(awsConfig);
const authProvider = createAuthProvider(authIntegration);
```

2. Use the `authProvider` methods for authentication and authorization in your application:  

```javascript
// Example: Sign in a user
const signInResult = await authProvider.signIn(username, password);
if (signInResult.success) {
  console.log('User signed in successfully');
} else {
  console.error('Sign-in failed');
}

// Example: Check if a user has a specific permission
const hasPermission = await authProvider.hasPermission('write:resource');
if (hasPermission) {
  console.log('User has the required permission');
} else {
  console.log('User does not have the required permission');
}
```
# Contributing
Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

Fork the repository  
Create a new branch for your changes  
Make your changes and commit them with descriptive commit messages  
Push your changes to your fork  
Submit a pull request  

# License
This module is released under the MIT License.
