import { createAuthCognitoIntegration } from '..';
import { createAuthProvider } from '@brainstack/auth';

// Mock the Auth.signIn function for testing
jest.mock('aws-amplify', () => ({
  Auth: {
    configure: jest.fn(),
    signIn: jest.fn(() => Promise.resolve(true)),
  },
}));

describe('@brainstack/auth-aws-cognito Integration', () => {
  const awsConfig = {};

  // Create the integration and authProvider for testing
  const authIntegration = createAuthCognitoIntegration(awsConfig);
  const authProvider = createAuthProvider(authIntegration);

  beforeEach(() => {});

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should successfully sign in the user', async () => {
      // Act
      const result = await authProvider.signIn('username', 'password');

      // Assert
      expect(result.success).toBe(true);
    });
  });
});
