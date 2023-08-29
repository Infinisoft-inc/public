# @brainstack/auth

The Auth SDK is a powerful tool for managing user authentication in various applications. It provides a unified interface to interact with authentication methods, abstracting the underlying complexities and offering a streamlined API.

## Description

Authentication is a crucial aspect of modern applications, often involving multiple providers and strategies. The Auth SDK simplifies this process by offering a consistent way to interact with various authentication methods. Whether you're dealing with email/password logins, social logins, or more advanced scenarios, the Auth SDK has you covered.

## Installation

Install the Auth SDK using npm:

```bash
npm install @brainstack/auth
```

## Usage

### Creating an Auth Provider

To begin, create an instance of the Auth Provider by providing an integration that adheres to the `AuthIntegration` interface.

```javascript
import { createAuthProvider } from '@brainstack/auth';

const integration = {
  // Implement the authentication methods here
};

const authProvider = createAuthProvider(integration);
```

### Authentication Methods

The Auth SDK exposes a range of authentication methods, allowing you to interact with various aspects of the authentication process.

#### Sign In

Authenticate a user using their username and password.

```javascript
const signInResult = await authProvider.signIn(username, password);
// Handle the result...
```

#### Sign Out

Sign a user out of the application.

```javascript
const signOutResult = await authProvider.signOut();
// Handle the result...
```

#### Sign Up

Register a new user with a username, password, and email.

```javascript
const signUpResult = await authProvider.signUp(username, password, email);
// Handle the result...
```

#### Lock Account

Lock a user's account to prevent further access.

```javascript
const lockAccountResult = await authProvider.lockAccount(username);
// Handle the result...
```

#### Reset Password

Initiate a password reset for a user.

```javascript
const resetPasswordResult = await authProvider.resetPassword(username);
// Handle the result...
```

#### Confirm Sign Up

Confirm a user's registration using a confirmation code.

```javascript
const confirmSignUpResult = await authProvider.confirmSignUp(username, code);
// Handle the result...
```

#### Resend Sign Up Confirmation

Resend a confirmation code for user registration.

```javascript
const resendSignUpResult = await authProvider.resendSignUp(username);
// Handle the result...
```

#### Forgot Password

Initiate a forgotten password recovery process.

```javascript
const forgotPasswordResult = await authProvider.forgotPassword(username);
// Handle the result...
```

#### Forgot Password Confirmation Code

Submit a confirmation code to reset a forgotten password.

```javascript
const forgotPasswordConfirmationResult = await authProvider.forgotPasswordConfirmationCode(username, code, newPassword);
// Handle the result...
```

#### Lock Session

Lock the user's session to enhance security.

```javascript
const lockSessionResult = await authProvider.lockSession();
// Handle the result...
```

#### Unlock Session

Unlock the user's locked session.

```javascript
const unlockSessionResult = await authProvider.unlockSession();
// Handle the result...
```

#### Unlock Account

Unlock a locked user account.

```javascript
const unlockAccountResult = await authProvider.unlockAccount(username);
// Handle the result...
```

#### Disable Account

Disable a user's account.

```javascript
const disableAccountResult = await authProvider.disableAccount(username);
// Handle the result...
```

#### Enable Account

Enable a disabled user account.

```javascript
const enableAccountResult = await authProvider.enableAccount(username);
// Handle the result...
```

#### Refresh Token

Refresh the authentication token to extend the session.

```javascript
const refreshTokenResult = await authProvider.refreshToken();
// Handle the result...
```

#### Check Permission

Check if the authenticated user has a specific permission.

```javascript
const hasPermissionResult = await authProvider.hasPermission('permission');
// Handle the result...
```

#### Define Permission

Define a new permission for use in the system.

```javascript
const definePermissionResult = await authProvider.definePermission('newPermission');
// Handle the result...
```

#### Validate Permission

Validate if a given permission is correctly defined.

```javascript
const isValidPermission = authProvider.validatePermission('permission');
// Handle the result...
```

#### Define Role

Define a new role and associate it with a list of permissions.

```javascript
const defineRoleResult = await authProvider.defineRole('newRole', ['permission1', 'permission2']);
// Handle the result...
```

#### Assign Role

Assign a role to a specific user.

```javascript
const assignRoleResult = await authProvider.assignRole('username', 'role');
// Handle the result...
```

#### Check Role

Check if a user has a specific role.

```javascript
const hasRoleResult = await authProvider.hasRole('username', 'role');
// Handle the result...
```

#### Add Custom Claim

Add custom claims to authentication tokens for application-specific needs.

```javascript
authProvider.addCustomClaim('claimName', 'claimValue');
// Custom claim added...
```

## Example

Imagine you're building a multi-platform application with different authentication providers. Here's how you could use the Auth SDK to streamline your authentication process:

```javascript
import { createAuthProvider } from '@brainstack/auth';

// Implement the integration methods here
const integration = { /* ... */ };

const authProvider = createAuthProvider(integration);

// Sign in a user
const signInResult = await authProvider.signIn('user123', 'password123');
if (signInResult.success) {
  console.log('User signed in successfully');
} else {
  console.error('Sign-in failed');
}
```

## Use Case

Consider a scenario where you're developing a cross-platform application that supports both email/password and social logins. The Auth SDK allows you to implement these authentication methods with ease, maintaining a consistent API across different providers.

# Contributing
Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

Fork the repository  
Create a new branch for your changes  
Make your changes and commit them with descriptive commit messages  
Push your changes to your fork  
Submit a pull request  

# License
This module is released under the MIT License.
