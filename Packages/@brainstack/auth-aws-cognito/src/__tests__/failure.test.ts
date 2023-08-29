import { createAuthCognitoIntegration } from '..';
import { Auth } from 'aws-amplify';
import { createAuthProvider } from '@brainstack/auth';

jest.mock('aws-amplify', () => ({
  Auth: {
    configure: jest.fn(),
    signIn: jest.fn(() =>
      Promise.reject({ success: false, message: 'invalid credentials' })
    ),
  },
}));

describe('@brainstack/auth-aws-cognito Integration', () => {
  // Mock the AWS Amplify configuration
  const awsConfig = {
    // Mock configuration options
  };

  // Create the integration and authProvider for testing
  const authIntegration = createAuthCognitoIntegration(awsConfig);
  const authProvider = createAuthProvider(authIntegration);

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should handle sign-in failure', async () => {
      // Act
      const result = await authProvider.signIn(
        'invalidUser',
        'invalidPassword'
      );

      // Assert
      expect(result.success).toBe(false);
      expect(result.message).toBe('invalid credentials');
    });
  });
});
