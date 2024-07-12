import readline from 'readline-sync';

export const promptUser = (question: string): string => {
  return readline.question(question);
};
