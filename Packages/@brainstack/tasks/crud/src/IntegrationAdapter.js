
class IntegrationAdapter {
  async create(data) {
    // To be implemented by specific integration
  }

  async read(id) {
    // To be implemented by specific integration
  }

  async update(id, data) {
    // To be implemented by specific integration
  }

  async delete(id) {
    // To be implemented by specific integration
  }
}

module.exports = IntegrationAdapter;
