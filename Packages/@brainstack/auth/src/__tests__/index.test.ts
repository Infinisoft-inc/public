import {
  AuthIntegration,
  AuthProvider,
  IAuthResult,
  createAuthProvider,
} from '..';

// Mock implementation of AuthIntegration
const mockIntegration: AuthIntegration = {
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
  addCustomClaim: (claim: string, value: any) => {},
};

// Test createAuthProvider function
describe('createAuthProvider', () => {
  let authProvider: AuthProvider;

  beforeEach(() => {
    authProvider = createAuthProvider(mockIntegration);
  });

  it('should return a valid AuthProvider object', () => {
    expect(authProvider).toBeDefined();
    expect(authProvider.signIn).toBeDefined();
    expect(authProvider.signOut).toBeDefined();
    expect(authProvider.signUp).toBeDefined();
    expect(authProvider.lockAccount).toBeDefined();
    expect(authProvider.resetPassword).toBeDefined();
    expect(authProvider.confirmSignUp).toBeDefined();
    expect(authProvider.resendSignUp).toBeDefined();
    expect(authProvider.forgotPassword).toBeDefined();
    expect(authProvider.forgotPasswordConfirmationCode).toBeDefined();
    expect(authProvider.lockSession).toBeDefined();
    expect(authProvider.unlockSession).toBeDefined();
    expect(authProvider.unlockAccount).toBeDefined();
    expect(authProvider.disableAccount).toBeDefined();
    expect(authProvider.enableAccount).toBeDefined();
    expect(authProvider.refreshToken).toBeDefined();
    expect(authProvider.hasPermission).toBeDefined();
    expect(authProvider.definePermission).toBeDefined();
    expect(authProvider.validatePermission).toBeDefined();
    expect(authProvider.defineRole).toBeDefined();
    expect(authProvider.assignRole).toBeDefined();
    expect(authProvider.hasRole).toBeDefined();
    expect(authProvider.addCustomClaim).toBeDefined();
  });

  it('should call integration.signIn when signIn is called', async () => {
    const result: IAuthResult = await authProvider.signIn(
      'username',
      'password'
    );
    expect(result.success).toBe(true);
  });

  it('should update context when signin', async () => {
    const result: IAuthResult = await authProvider.signIn(
      'username',
      'password'
    );

    expect(result.success).toBe(true);
    expect(authProvider.context.isAuthenticated).toBe(true);
    expect(authProvider.context.username).toBe("username");
    expect(authProvider.context.accessToken).toBe("accessToken");
    expect(authProvider.context.idToken).toBe("idToken");
    expect(authProvider.context.refreshToken).toBe("refreshToken");
  });

  it('should call integration.signOut when signOut is called', async () => {
    const result: IAuthResult = await authProvider.signOut();
    expect(result.success).toBe(true);
  });

  it('should call integration.signIn when signIn is called', async () => {
    const result: IAuthResult = await authProvider.signIn(
      'username',
      'password'
    );
    expect(result.success).toBe(true);
  });

  it('should call integration.signOut when signOut is called', async () => {
    const result: IAuthResult = await authProvider.signOut();
    expect(result.success).toBe(true);
  });

  it('should call integration.signUp when signUp is called', async () => {
    const result: IAuthResult = await authProvider.signUp(
      'username',
      'password',
      'email'
    );
    expect(result.success).toBe(true);
  });

  it('should call integration.lockAccount when lockAccount is called', async () => {
    const result: IAuthResult = await authProvider.lockAccount('username');
    expect(result.success).toBe(true);
  });

  it('should call integration.resetPassword when resetPassword is called', async () => {
    const result: IAuthResult = await authProvider.resetPassword('username');
    expect(result.success).toBe(true);
  });

  it('should call integration.confirmSignUp when confirmSignUp is called', async () => {
    const result: IAuthResult = await authProvider.confirmSignUp(
      'username',
      'code'
    );
    expect(result.success).toBe(true);
  });

  it('should call integration.resendSignUp when resendSignUp is called', async () => {
    const result: IAuthResult = await authProvider.resendSignUp('username');
    expect(result.success).toBe(true);
  });

  it('should call integration.forgotPassword when forgotPassword is called', async () => {
    const result: IAuthResult = await authProvider.forgotPassword('username');
    expect(result.success).toBe(true);
  });

  it('should call integration.forgotPasswordConfirmationCode when forgotPasswordConfirmationCode is called', async () => {
    const result: IAuthResult =
      await authProvider.forgotPasswordConfirmationCode(
        'username',
        'code',
        'newPassword'
      );
    expect(result.success).toBe(true);
  });

  it('should call integration.signIn when signIn is called', async () => {
    const integration: AuthIntegration = mockIntegration;

    const authProvider = createAuthProvider(integration);
    expect(await authProvider.signIn('username', 'password')).toStrictEqual({
      success: true,
    });
  });

  it('should call integration.signOut when signOut is called', async () => {
    const integration: AuthIntegration = mockIntegration;

    const authProvider = createAuthProvider(integration);
    expect(await authProvider.signOut()).toStrictEqual({ success: true });
  });

  it('should call integration.lockSession when lockSession is called', async () => {
    const result: IAuthResult = await authProvider.lockSession();
    expect(result.success).toBe(true);
  });

  it('should call integration.unlockSession when unlockSession is called', async () => {
    const result: IAuthResult = await authProvider.unlockSession();
    expect(result.success).toBe(true);
  });

  it('should call integration.unlockAccount when unlockAccount is called', async () => {
    const result: IAuthResult = await authProvider.unlockAccount('username');
    expect(result.success).toBe(true);
  });

  it('should call integration.disableAccount when disableAccount is called', async () => {
    const result: IAuthResult = await authProvider.disableAccount('username');
    expect(result.success).toBe(true);
  });

  it('should call integration.enableAccount when enableAccount is called', async () => {
    const result: IAuthResult = await authProvider.enableAccount('username');
    expect(result.success).toBe(true);
  });

  it('should call integration.refreshToken when refreshToken is called', async () => {
    const result: IAuthResult = await authProvider.refreshToken();
    expect(result.success).toBe(true);
  });

  it('should call integration.hasPermission when hasPermission is called', async () => {
    const result: boolean = await authProvider.hasPermission('permission');
    expect(result).toBe(true);
  });

  it('should call integration.definePermission when definePermission is called', async () => {
    const result: IAuthResult = await authProvider.definePermission(
      'permission'
    );
    expect(result.success).toBe(true);
  });

  it('should call integration.validatePermission when validatePermission is called', () => {
    const result: boolean = authProvider.validatePermission('permission');
    expect(result).toBe(true);
  });

  it('should call integration.defineRole when defineRole is called', async () => {
    const result: IAuthResult = await authProvider.defineRole('role', [
      'permission',
    ]);
    expect(result.success).toBe(true);
  });

  it('should call integration.assignRole when assignRole is called', async () => {
    const result: IAuthResult = await authProvider.assignRole(
      'username',
      'role'
    );
    expect(result.success).toBe(true);
  });

  it('should call integration.hasRole when hasRole is called', async () => {
    const result: boolean = await authProvider.hasRole('username', 'role');
    expect(result).toBe(true);
  });

  it('should call integration.addCustomClaim when addCustomClaim is called', () => {
    authProvider.addCustomClaim('claim', 'value');
    // You can add assertions related to custom claim handling here
  });
});
