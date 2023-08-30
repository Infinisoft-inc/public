import { AuthIntegration } from '..';

// Mock implementation of AuthIntegration

export const mockIntegration: AuthIntegration = {
  signIn: async () => ({ success: true }),
  signOut: async () => ({ success: true }),
  signUp: async () => ({ success: true }),
  updateSecurityContext: async (context) => {
    context.isAuthenticated = true;
    context.username = 'username';
    context.accessToken = 'accessToken';
    context.idToken = 'idToken';
    context.refreshToken = 'refreshToken';
  },
  lockAccount: async () => ({ success: true }),
  resetPassword: async () => ({ success: true }),
  confirmSignUp: async () => ({ success: true }),
  resendSignUp: async () => ({ success: true }),
  forgotPassword: async () => ({ success: true }),
  forgotPasswordConfirmationCode: async () => ({ success: true }),
  lockSession: async () => ({ success: true }),
  unlockSession: async () => ({ success: true }),
  unlockAccount: async (username: string) => ({ success: true }),
  disableAccount: async (username: string) => ({ success: true }),
  enableAccount: async (username: string) => ({ success: true }),
  refreshToken: async () => ({ success: true }),
  hasPermission: async (permission: string) => true,
  definePermission: async (permission: string) => ({ success: true }),
  validatePermission: (permission: string) => true,
  defineRole: async (role: string, permissions: string[]) => ({
    success: true,
  }),
  assignRole: async (username: string, role: string) => ({ success: true }),
  hasRole: async (username: string, role: string) => true,
  addCustomClaim: (claim: string, value: any) => { },
};
