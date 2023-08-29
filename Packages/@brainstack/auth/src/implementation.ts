import { AuthProvider, IAuthResult, AuthIntegration } from '.'; // Replace with the actual path

export const createAuthProvider = (
  integration: AuthIntegration
): AuthProvider => {
  return {
    signIn: async (
      username: string,
      password: string
    ): Promise<IAuthResult> => {
      return integration.signIn(username, password);
    },
    signOut: async (): Promise<IAuthResult> => {
      return integration.signOut();
    },
    signUp: async (
      username: string,
      password: string,
      email: string
    ): Promise<IAuthResult> => {
      return integration.signUp(username, password, email);
    },
    lockAccount: async (username: string): Promise<IAuthResult> => {
      return integration.lockAccount(username);
    },
    resetPassword: async (username: string): Promise<IAuthResult> => {
      return integration.resetPassword(username);
    },
    confirmSignUp: async (
      username: string,
      code: string
    ): Promise<IAuthResult> => {
      return integration.confirmSignUp(username, code);
    },
    resendSignUp: async (username: string): Promise<IAuthResult> => {
      return integration.resendSignUp(username);
    },
    forgotPassword: async (username: string): Promise<IAuthResult> => {
      return integration.forgotPassword(username);
    },
    forgotPasswordConfirmationCode: async (
      username: string,
      code: string,
      newPassword: string
    ): Promise<IAuthResult> => {
      return integration.forgotPasswordConfirmationCode(
        username,
        code,
        newPassword
      );
    },
    lockSession: async (): Promise<IAuthResult> => {
      return integration.lockSession();
    },
    unlockSession: async (): Promise<IAuthResult> => {
      return integration.unlockSession();
    },
    unlockAccount: async (username: string): Promise<IAuthResult> => {
      return integration.unlockAccount(username);
    },
    disableAccount: async (username: string): Promise<IAuthResult> => {
      return integration.disableAccount(username);
    },
    enableAccount: async (username: string): Promise<IAuthResult> => {
      return integration.enableAccount(username);
    },

    refreshToken: async (): Promise<IAuthResult> => {
      return integration.refreshToken();
    },
    hasPermission: async (permission: string): Promise<boolean> => {
      return integration.hasPermission(permission);
    },
    definePermission: async (permission: string): Promise<IAuthResult> => {
      return integration.definePermission(permission);
    },
    validatePermission: (permission: string): boolean => {
      return integration.validatePermission(permission);
    },
    defineRole: async (
      role: string,
      permissions: string[]
    ): Promise<IAuthResult> => {
      return integration.defineRole(role, permissions);
    },
    assignRole: async (
      username: string,
      role: string
    ): Promise<IAuthResult> => {
      return integration.assignRole(username, role);
    },
    hasRole: async (username: string, role: string): Promise<boolean> => {
      return integration.hasRole(username, role);
    },
    addCustomClaim: (claim: string, value: any): void => {
      integration.addCustomClaim(claim, value);
    },
  };
};
