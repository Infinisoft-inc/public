# @brainstack/crud

A TypeScript CRUD (Create, Read, Update, Delete) abstraction package that allows you to perform CRUD operations using different data sources.

## Installation

Install the package using npm:

```bash
npm install @brainstack/crud
```

## Usage

```typescript
import { createCRUD, CRUDIntegration, CRUD } from '@brainstack/crud';

// Define CRUDIntegration implementation
class MyCRUDIntegration<T> implements CRUDIntegration<T> {
  // Implement CRUD methods here...
}

// Create CRUD instance
const myCRUD: CRUD<MyType> = createCRUD(new MyCRUDIntegration<MyType>());

// Perform CRUD operations
const newItem = await myCRUD.create({ id: '1', name: 'Item 1' });
const readItem = await myCRUD.read('1');
const updatedItem = await myCRUD.update('1', { id: '1', name: 'Updated Item' });
await myCRUD.delete('1');
const listItems = await myCRUD.list();
const searchResults = await myCRUD.search('term');
const filterResults = await myCRUD.filter({ key: 'value' });
```

## API

### `createCRUD(integration: CRUDIntegration<T>): CRUD<T>`

Creates a CRUD instance with the provided integration.

- `integration`: An object implementing the `CRUDIntegration` interface.

### `CRUDIntegration<T>`

An interface defining the integration methods for CRUD operations. Implement this interface to connect to your data source.

- `create(item: T): Promise<T>`
- `read(id: string): Promise<T | undefined>`
- `update(id: string, item: T): Promise<T | undefined>`
- `delete(id: string): Promise<void>`
- `list(options?: { page?: number; limit?: number }): Promise<T[]>`
- `search(term: string): Promise<T[]>`
- `filter(criterias: { [key: string]: any }): Promise<T[]>`

## Integration Examples

### REST API Integration

```typescript
import axios from 'axios';
import { CRUDIntegration } from '@brainstack/crud';

class RestAPIIntegration<T> implements CRUDIntegration<T> {
  constructor(private baseUrl: string) {}

  async create(item: T): Promise<T> {
    const response = await axios.post(this.baseUrl, item);
    return response.data;
  }

  // Implement other CRUD methods...
}

const restAPI = new RestAPIIntegration<MyType>('https://api.example.com/items');
const crud = createCRUD(restAPI);
```

### Mock Integration

```typescript
import { CRUDIntegration } from '@brainstack/crud';

class MockCRUDIntegration<T> implements CRUDIntegration<T> {
  private data: Record<string, T> = {};

  async create(item: T): Promise<T> {
    this.data[item.id] = item;
    return item;
  }

  async read(id: string): Promise<T | undefined> {
    return this.data[id];
  }

  // Implement other CRUD methods...
}

const mockIntegration = new MockCRUDIntegration<MyType>();
const crud = createCRUD(mockIntegration);
```

# Contributing
Contributions are welcome! If you would like to contribute to this module, please follow these guidelines:

Fork the repository  
Create a new branch for your changes  
Make your changes and commit them with descriptive commit messages  
Push your changes to your fork  
Submit a pull request  

# License
This module is released under the MIT License.