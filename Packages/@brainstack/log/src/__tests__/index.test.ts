import { createLogger } from '../implementation';

// Mock integration for testing
const mockIntegration = {
  log: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
  verbose: jest.fn(),
};

describe('createLogger', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create a logger with default level and integrations', () => {
    const logger = createLogger(3);
    expect(logger.level).toBe(3);
    expect(logger.integrations).toEqual(expect.arrayContaining([expect.any(Object)]));
  });

  it('should create a logger with specified level and integrations', () => {
    const integrations = [mockIntegration];
    const logger = createLogger(2, integrations);
    expect(logger.level).toBe(2);
    expect(logger.integrations).toEqual(integrations);
  });

  it('should change the log level', () => {
    const logger = createLogger(3);
    logger.changeLogLevel(1);
    expect(logger.level).toBe(1);
  });

  it('should add an integration', () => {
    const logger = createLogger(3);
    logger.addIntegration(mockIntegration);
    expect(logger.integrations).toContain(mockIntegration);
  });

  it('should remove an integration', () => {
    const logger = createLogger(3, [mockIntegration]);
    logger.removeIntegration(mockIntegration);
    expect(logger.integrations).not.toContain(mockIntegration);
  });

  it('should log messages if the log level is sufficient', () => {
    const logger = createLogger(3, [mockIntegration]);
    logger.log('Log message');
    logger.info('Info message');
    logger.warn('Warn message');
    logger.error('Error message');
    logger.verbose('Verbose message');

    expect(mockIntegration.log).toHaveBeenCalledTimes(1);
    expect(mockIntegration.info).toHaveBeenCalledTimes(0);
    expect(mockIntegration.warn).toHaveBeenCalledTimes(1);
    expect(mockIntegration.error).toHaveBeenCalledTimes(1);
    expect(mockIntegration.verbose).toHaveBeenCalledTimes(0);
  });

  it('should not log messages if the log level is insufficient', () => {
    const logger = createLogger(1, [mockIntegration]);
    logger.log('Log message');
    logger.info('Info message');
    logger.warn('Warn message');
    logger.error('Error message');
    logger.verbose('Verbose message');

    expect(mockIntegration.log).not.toHaveBeenCalled();
    expect(mockIntegration.info).not.toHaveBeenCalled();
    expect(mockIntegration.warn).not.toHaveBeenCalled();
    expect(mockIntegration.error).toHaveBeenCalledTimes(1);
    expect(mockIntegration.verbose).not.toHaveBeenCalled();
  });
});
