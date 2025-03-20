import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { createTransientService, manageTransientService } from '../src/transientServices';

describe('Transient Services', () => {
  let service;

  beforeEach(() => {
    service = createTransientService();
  });

  afterEach(() => {
    manageTransientService(service, 'stop');
  });

  it('should create a transient service', () => {
    expect(service).to.exist;
  });

  it('should manage a transient service', () => {
    manageTransientService(service, 'start');
    expect(service.status).to.equal('running');
  });
});

