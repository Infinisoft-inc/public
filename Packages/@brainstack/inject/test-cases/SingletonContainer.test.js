const { SingletonContainer } = require('../SingletonContainer');
const { expect } = require('chai');

describe('SingletonContainer', () => {
  it('should return the same instance', () => {
    const instance1 = SingletonContainer.getInstance();
    const instance2 = SingletonContainer.getInstance();
    expect(instance1).to.equal(instance2);
  });

  it('should not allow creating multiple instances', () => {
    const instance1 = SingletonContainer.getInstance();
    const instance2 = new SingletonContainer();
    expect(instance1).to.equal(instance2);
  });
});
