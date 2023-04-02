
const IntegrationAdapter = require('./IntegrationAdapter');

class CRUDTask {
  constructor(integrationAdapter) {
    this.integrationAdapter = integrationAdapter;
  }

  async create(data) {
    return await this.integrationAdapter.create(data);
  }

  async read(id) {
    return await this.integrationAdapter.read(id);
  }

  async update(id, data) {
    return await this.integrationAdapter.update(id, data);
  }

  async delete(id) {
    return await this.integrationAdapter.delete(id);
  }
}

module.exports = CRUDTask;
