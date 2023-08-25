/**
 * Generates a version 1 UUID.
 * @returns The generated UUID string.
 */
export const uuidv1 = (): string =>
  'xxxxxxxx-xxxx-1xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
