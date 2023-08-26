import {
  AuthIntegration,
  AuthProvider,
  AuthResult,
  IAuthResult,
  createAuthProvider,
} from '..';

// Mock implementation of AuthIntegration
const mockIntegration: AuthIntegration = {
  signIn: async () => ({ success: true }),
  signOut: async () => ({ success: true }),
  signUp: async () => ({ success: true }),
  lockAccount: async () => ({ success: true }),
  resetPassword: async () => ({ success: true }),
  confirmSignUp: async () => ({ success: true }),
  resendSignUp: async () => ({ success: true }),
  forgotPassword: async () => ({ success: true }),
  forgotPasswordConfirmationCode: async () => ({ success: true }),
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

  

  it('should return a valid AuthProvider object', () => {
    const integration: AuthIntegration = {
      signIn: jest.fn(),
      signOut: jest.fn(),
      signUp: jest.fn(),
      lockAccount: jest.fn(),
      resetPassword: jest.fn(),
      confirmSignUp: jest.fn(),
      resendSignUp: jest.fn(),
      forgotPassword: jest.fn(),
      forgotPasswordConfirmationCode: jest.fn(),
    };

    const authProvider = createAuthProvider(integration);
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
  });


  it('should call integration.signIn when signIn is called', async () => {
    const result: IAuthResult = await authProvider.signIn('username', 'password');
    expect(result.success).toBe(true);
  });

  it('should call integration.signOut when signOut is called', async () => {
    const result: IAuthResult = await authProvider.signOut();
    expect(result.success).toBe(true);
  });

  it('should call integration.signUp when signUp is called', async () => {
    const result: IAuthResult = await authProvider.signUp('username', 'password', 'email');
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
    const result: IAuthResult = await authProvider.confirmSignUp('username', 'code');
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
    const result: IAuthResult = await authProvider.forgotPasswordConfirmationCode('username', 'code', 'newPassword');
    expect(result.success).toBe(true);
  });

  it('should call integration.signIn when signIn is called', async () => {
    const integration: AuthIntegration = {
      signIn: jest.fn(() => Promise.resolve({success: true})),
      signOut: function (): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      signUp: function (username: string, password: string, email: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      lockAccount: function (username: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      resetPassword: function (username: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      confirmSignUp: function (username: string, code: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      resendSignUp: function (username: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      forgotPassword: function (username: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      forgotPasswordConfirmationCode: function (username: string, code: string, newPassword: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      }
    };

    const authProvider = createAuthProvider(integration);
    const result = await authProvider.signIn('username', 'password');
    expect(integration.signIn).toHaveBeenCalledWith('username', 'password');
    expect(result).resolves
  });

  it('should call integration.signOut when signOut is called', async () => {
    const integration: AuthIntegration = {
      signOut: jest.fn(() => Promise.resolve({ success: true })),
      signIn: function (username: string, password: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      signUp: function (username: string, password: string, email: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      lockAccount: function (username: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      resetPassword: function (username: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      confirmSignUp: function (username: string, code: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      resendSignUp: function (username: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      forgotPassword: function (username: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      },
      forgotPasswordConfirmationCode: function (username: string, code: string, newPassword: string): Promise<IAuthResult> {
        throw new Error('Function not implemented.');
      }
    };

    const authProvider = createAuthProvider(integration);
    const result = await authProvider.signOut();
    expect(integration.signOut).toHaveBeenCalled();
    expect(result).resolves;
  });
});
