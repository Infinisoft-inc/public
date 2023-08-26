// interface AuthUser {
//   username: string;
//   email: string;
//   // Other user properties
// }

// type AuthStatus =
//   | 'unauthenticated'
//   | 'authenticated'
//   | 'confirming'
//   | 'resetting'
//   | 'locked';

export enum AuthResult {
    Success = 'Success',
    // Other possible results like 'Failure', 'Unauthorized', etc.
  }

export interface IAuthResult {
  success: boolean;
  message?: string;
}

// interface AuthError {
//   code: string;
//   message: string;
// }

export interface AuthProvider {
  signIn: (username: string, password: string) => Promise<IAuthResult>;
  signOut: () => Promise<IAuthResult>;
  signUp: (
    username: string,
    password: string,
    email: string
  ) => Promise<IAuthResult>;
  lockAccount: (username: string) => Promise<IAuthResult>;
  resetPassword: (username: string) => Promise<IAuthResult>;
  confirmSignUp: (
    username: string,
    confirmationCode: string
  ) => Promise<IAuthResult>;
  resendSignUp: (username: string) => Promise<IAuthResult>;
  forgotPassword: (username: string) => Promise<IAuthResult>;
  forgotPasswordConfirmationCode: (
    username: string,
    confirmationCode: string,
    newPassword: string
  ) => Promise<IAuthResult>;
}

// interface AuthContextValue {
//   user: AuthUser | null;
//   status: AuthStatus;
//   error: AuthError | null;
//   provider: AuthProvider;
// }

// type AuthContextProps = {
//   children: React.ReactNode;
// };

// interface AuthContextType {
//   user: AuthUser | null;
//   status: AuthStatus;
//   error: AuthError | null;
//   signIn: (username: string, password: string) => Promise<void>;
//   signOut: () => Promise<void>;
//   signUp: (username: string, password: string, email: string) => Promise<void>;
//   lockAccount: (username: string) => Promise<void>;
//   resetPassword: (username: string) => Promise<void>;
//   confirmSignUp: (username: string, confirmationCode: string) => Promise<void>;
//   resendSignUp: (username: string) => Promise<void>;
//   forgotPassword: (username: string) => Promise<void>;
//   forgotPasswordConfirmationCode: (
//     username: string,
//     confirmationCode: string,
//     newPassword: string
//   ) => Promise<void>;
// }

export interface AuthIntegration {
  signIn(username: string, password: string): Promise<IAuthResult>;
  signOut(): Promise<IAuthResult>;
  signUp(
    username: string,
    password: string,
    email: string
  ): Promise<IAuthResult>;
  lockAccount(username: string): Promise<IAuthResult>;
  resetPassword(username: string): Promise<IAuthResult>;
  confirmSignUp(username: string, code: string): Promise<IAuthResult>;
  resendSignUp(username: string): Promise<IAuthResult>;
  forgotPassword(username: string): Promise<IAuthResult>;
  forgotPasswordConfirmationCode(
    username: string,
    code: string,
    newPassword: string
  ): Promise<IAuthResult>;
}
