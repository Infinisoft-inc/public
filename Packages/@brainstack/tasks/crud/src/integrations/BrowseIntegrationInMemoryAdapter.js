class BrowserIntegrationInMemoryAdapter {
  constructor() {
    this.localStorageKey = "dataStore";
  }

  async create(data) {
    const id = Date.now().toString(); // Generate a unique ID
    const dataStore = this.getDataStore();
    dataStore[id] = data;
    this.setDataStore(dataStore);
    return id;
  }

  async read(id) {
    const dataStore = this.getDataStore();
    return dataStore[id] || null;
  }

  async update(id, data) {
    const dataStore = this.getDataStore();
    if (dataStore[id]) {
      dataStore[id] = data;
      this.setDataStore(dataStore);
      return true;
    }
    return false;
  }

  async delete(id) {
    const dataStore = this.getDataStore();
    if (dataStore[id]) {
      delete dataStore[id];
      this.setDataStore(dataStore);
      return true;
    }
    return false;
  }

  // Helper method to retrieve dataStore from localStorage
  getDataStore() {
    const dataStoreJson = localStorage.getItem(this.localStorageKey);
    return dataStoreJson ? JSON.parse(dataStoreJson) : {};
  }

  // Helper method to save dataStore to localStorage
  setDataStore(dataStore) {
    const dataStoreJson = JSON.stringify(dataStore);
    localStorage.setItem(this.localStorageKey, dataStoreJson);
  }
}
