import { AuthProvider, IAuthResult, AuthIntegration } from '.'; // Replace with the actual path

export const createAuthProvider = (
  integration: AuthIntegration
): AuthProvider => {
  return {
    signIn: async (username: string, password: string): Promise<IAuthResult> => {
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
  };
};
