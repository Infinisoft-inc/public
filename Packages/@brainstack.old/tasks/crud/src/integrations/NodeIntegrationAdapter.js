const fs = require("fs");
const path = require("path");

class NodeIntegrationAdapter {
  constructor(directory) {
    this.directory = directory;
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
  }

  // Create
  async create(data) {
    const id = Date.now();
    const filePath = path.join(this.directory, `${id}`);
    fs.writeFileSync(filePath, JSON.stringify(data));
    return id;
  }

  // Read
  async read(id) {
    const filePath = path.join(this.directory, `${id}`);
    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
      return data;
    }
    return null;
  }

  // Update
  async update(id, data) {
    const filePath = path.join(this.directory, `${id}`);
    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify(data));
      return true;
    }
    return false;
  }

  // Delete
  async delete(id) {
    const filePath = path.join(this.directory, `${id}`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }

  // List
  async list() {
    const files = fs.readdirSync(this.directory);
    return files.map((file) => path.basename(file));
  }
}

module.exports = NodeIntegrationAdapter