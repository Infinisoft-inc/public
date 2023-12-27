import { sampleFunction } from '../src/index';

describe('sampleFunction', () => {
  it('should run successfully', () => {
    expect(sampleFunction()).toBe('Hello from the sample function!');
  });
});