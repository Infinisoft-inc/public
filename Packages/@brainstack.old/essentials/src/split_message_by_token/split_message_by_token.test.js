import { splitMessageByTokens } from './split_message_by_token';

describe('splitMessageByTokens', () => {
  it('should split the message into multiple parts', () => {
    const message = 'This is a test message for splitting. It should split at the end of a sentence. The maximum tokens per message is 15.';
    const maxTokensPerMessage = 15;
    const filename = 'test.txt';

    const expectedOutput = [
      'test.txt Part 1 of 3\n\nThis is a test message for splitting',
      'test.txt Part 2 of 3\n\nIt should split at the end of a sentence.',
      'test.txt Part 3 of 3\n\nThe maximum tokens per message is 15.',
    ];

    const result = splitMessageByTokens(message, maxTokensPerMessage, filename);
    expect(result).toEqual(expectedOutput);
  });
});