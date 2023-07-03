class NodeIntegrationAdapter {
    constructor() {
      this.dataStore = {}; // In-memory data store
    }
  
    async create(data) {
      const id = Date.now().toString(); // Generate a unique ID
      this.dataStore[id] = data;
      return id;
    }
  
    async read(id) {
      return this.dataStore[id] || null;
    }
  
    async update(id, data) {
      if (this.dataStore[id]) {
        this.dataStore[id] = data;
        return true;
      }
      return false;
    }
  
    async delete(id) {
      if (this.dataStore[id]) {
        delete this.dataStore[id];
        return true;
      }
      return false;
    }
  }
  
  module.exports = NodeIntegrationAdapter;
  