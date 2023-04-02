const fs = require("fs");
const path = require("path");
const NodeIntegrationAdapter = require("./NodeIntegrationAdapter");

const TEST_DIR = path.join(__dirname, "test_directory");

describe("NodeIntegrationAdapter", () => {
  let adapter;

  beforeEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmdirSync(TEST_DIR, { recursive: true });
    }
    fs.mkdirSync(TEST_DIR);
    adapter = new NodeIntegrationAdapter(TEST_DIR);
  });

  afterEach(() => {
    if (fs.existsSync(TEST_DIR)) {
      fs.rmdirSync(TEST_DIR, { recursive: true });
    }
  });

  describe("constructor", () => {
    it("creates the directory if it doesn't exist", () => {
      fs.rmdirSync(TEST_DIR, { recursive: true });
      adapter = new NodeIntegrationAdapter(TEST_DIR);
      expect(fs.existsSync(TEST_DIR)).toBe(true);
    });
  });

  describe("create", () => {
    it("creates a new file with the provided data and returns the id", async () => {
      const data = { title: "test title" };
      const id = await adapter.create(data);
      expect(fs.existsSync(path.join(TEST_DIR, `${id}`))).toBe(true);
      const contents = JSON.parse(
        fs.readFileSync(path.join(TEST_DIR, `${id}`), "utf-8")
      );
      expect(contents).toEqual(data);
    });
  });

  describe("read", () => {
    it("returns the data for the provided id", async () => {
      const data = { title: "test title" };
      const id = await adapter.create(data);
      const result = await adapter.read(id);
      expect(result).toEqual(data);
    });

    it("returns null if no file exists for the provided id", async () => {
      const result = await adapter.read(123);
      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("updates the data for the provided id and returns true", async () => {
      const data = { title: "test title" };
      const id = await adapter.create(data);
      const newData = { title: "new title" };
      const result = await adapter.update(id, newData);
      expect(result).toBe(true);
      const contents = JSON.parse(
        fs.readFileSync(path.join(TEST_DIR, `${id}`), "utf-8")
      );
      expect(contents).toEqual(newData);
    });

    it("returns false if no file exists for the provided id", async () => {
      const result = await adapter.update(123, { title: "new title" });
      expect(result).toBe(false);
    });
  });

  describe("delete", () => {
    it("deletes the file for the provided id and returns true", async () => {
      const data = { title: "test title" };
      const id = await adapter.create(data);
      const result = await adapter.delete(id);
      expect(result).toBe(true);
      expect(fs.existsSync(path.join(TEST_DIR, `${id}`))).toBe(false);
    });

    it("returns false if no file exists for the provided id", async () => {
      const result = await adapter.delete(123);
      expect(result).toBe(false);
    });
  });

  describe("list", () => {
    it("returns an array of ids for all files in the directory", async () => {
      const data1 = { title: "test title 1" };
      const data2 = { title: "test title 2" };
      const id1 = await adapter.create(data1);
      const id2 = await adapter.create(data2);
      const result = await adapter.list();
      expect(result).toEqual([`${id1}`, `${id2}`]);
    });
  });
});
