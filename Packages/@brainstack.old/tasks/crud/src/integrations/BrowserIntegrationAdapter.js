class FileSystemIntegrationAdapter {
  async requestDirectoryPermission() {
    this.directoryHandle = await window.showDirectoryPicker();
  }

  // List all files in the directory
  async list() {
    if (!this.directoryHandle) {
      await this.requestDirectoryPermission();
    }
    const fileList = [];
    for await (const entry of this.directoryHandle.values()) {
      if (entry.kind === "file") {
        fileList.push(entry.name);
      }
    }
    return fileList;
  }

  // Create
  async create(fileName, data) {
    if (!this.directoryHandle) {
      await this.requestDirectoryPermission();
    }
    const fileHandle = await this.directoryHandle.getFileHandle(fileName, {
      create: true,
    });
    const writableStream = await fileHandle.createWritable();
    await writableStream.write(data);
    await writableStream.close();
  }

  // Read
  async read(fileName) {
    if (!this.directoryHandle) {
      await this.requestDirectoryPermission();
    }
    const fileHandle = await this.directoryHandle.getFileHandle(fileName);
    const file = await fileHandle.getFile();
    return await file.text();
  }

  // Update
  async update(fileName, data) {
    await this.create(fileName, data);
  }

  // Delete
  async delete(fileName) {
    if (!this.directoryHandle) {
      await this.requestDirectoryPermission();
    }
    await this.directoryHandle.removeEntry(fileName);
  }
}
