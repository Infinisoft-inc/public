// apiRoutes.js

module.exports = (app) => {
    // Define a route for the root path ("/")
    app.get('/', (req, res) => {
      res.json({ message: 'Welcome to the API!' });
    });
  
    // Define a route for "/users" that returns a list of users
    app.get('/users', (req, res) => {
      const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
      ];
      res.json(users);
    });
  
    // Define a route for "/products" that returns a list of products
    app.get('/products', (req, res) => {
      const products = [
        { id: 'p1', name: 'Product 1', price: 100 },
        { id: 'p2', name: 'Product 2', price: 150 },
        { id: 'p3', name: 'Product 3', price: 200 }
      ];
      res.json(products);
    });
  
    // Define a route for "/users/:id" that returns a single user by ID
    app.get('/users/:id', (req, res) => {
      const userId = req.params.id;
      const user = { id: userId, name: 'Sample User' };
      res.json(user);
    });
  
    // Define a route for "/products/:id" that returns a single product by ID
    app.get('/products/:id', (req, res) => {
      const productId = req.params.id;
      const product = { id: productId, name: 'Sample Product', price: 99.99 };
      res.json(product);
    });
  
    // Define additional routes here as needed
  };
  