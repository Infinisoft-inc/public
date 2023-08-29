export interface IAuthResult {
  success: boolean;
  message?: string;
}

export type TSecurityContext = {
  isAuthenticated: boolean;
  username?: string
  idToken?:string
  accessToken?:string
  refreshToken?:string
};

export interface AuthProvider {
  signIn: (username: string, password: string) => Promise<IAuthResult>;
  signOut: () => Promise<IAuthResult>;
  context: TSecurityContext,
  isAuthenticated: boolean;
  signUp: (
    username: string,
    password: string,
    email: string
  ) => Promise<IAuthResult>;
  lockSession: () => Promise<IAuthResult>;
  unlockSession: () => Promise<IAuthResult>;

  lockAccount: (username: string) => Promise<IAuthResult>;
  unlockAccount: (username: string) => Promise<IAuthResult>;

  disableAccount: (username: string) => Promise<IAuthResult>;
  enableAccount: (username: string) => Promise<IAuthResult>;

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

  refreshToken: () => Promise<IAuthResult>;

  hasPermission: (permission: string) => Promise<boolean>;
  definePermission: (permission: string) => Promise<IAuthResult>;
  validatePermission: (permission: string) => boolean;

  defineRole: (role: string, permissions: string[]) => Promise<IAuthResult>;
  assignRole: (username: string, role: string) => Promise<IAuthResult>;
  hasRole: (username: string, role: string) => Promise<boolean>;

  addCustomClaim: (claim: string, value: any) => void;
}

export interface AuthIntegration {
  signIn: (username: string, password: string) => Promise<IAuthResult>;
  signOut: () => Promise<IAuthResult>;
  signUp: (
    username: string,
    password: string,
    email: string
  ) => Promise<IAuthResult>;
  updateSecurityContext: (context: TSecurityContext) => Promise<void>;
  lockSession: () => Promise<IAuthResult>;
  unlockSession: () => Promise<IAuthResult>;

  lockAccount: (username: string) => Promise<IAuthResult>;
  unlockAccount: (username: string) => Promise<IAuthResult>;

  disableAccount: (username: string) => Promise<IAuthResult>;
  enableAccount: (username: string) => Promise<IAuthResult>;

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

  refreshToken: () => Promise<IAuthResult>;

  hasPermission: (permission: string) => Promise<boolean>;
  definePermission: (permission: string) => Promise<IAuthResult>;
  validatePermission: (permission: string) => boolean;

  defineRole: (role: string, permissions: string[]) => Promise<IAuthResult>;
  assignRole: (username: string, role: string) => Promise<IAuthResult>;
  hasRole: (username: string, role: string) => Promise<boolean>;

  addCustomClaim: (claim: string, value: any) => void;
}
