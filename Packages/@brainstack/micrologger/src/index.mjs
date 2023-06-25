export class MicroLogger {
  constructor(level, integrations = []) {
    this.level = level;
    this.integrations = integrations.length ? integrations : [consoleIntegration];
  }

  changeLogLevel(_level) {
    this.level = _level;
  }

  addIntegration(integration) {
    this.integrations.push(integration);
  }

  removeIntegration(integration) {
    const index = this.integrations.indexOf(integration);
    if (index !== -1) {
      this.integrations.splice(index, 1);
    }
  }

  log(message) {
    if (this.level >= 3) {
      this.integrations.forEach((integration) => {
        integration.log(message);
      });
    }
  }

  info(message) {
    if (this.level >= 4) {
      this.integrations.forEach((integration) => {
        integration.info(message);
      });
    }
  }

  warn(message) {
    if (this.level >= 2) {
      this.integrations.forEach((integration) => {
        integration.warn(message);
      });
    }
  }

  error(message) {
    if (this.level >= 1) {
      this.integrations.forEach((integration) => {
        integration.error(message);
      });
    }
  }

  verbose(message) {
    if (this.level >= 5) {
      this.integrations.forEach((integration) => {
        integration.verbose(message);
      });
    }
  }
}

// Default console integration
const consoleIntegration = {
  log: console.log.bind(console),
  info: console.info.bind(console),
  warn: console.warn.bind(console),
  error: console.error.bind(console),
  verbose: console.log.bind(console),
};
