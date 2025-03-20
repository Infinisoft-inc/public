import { UserManagement } from './basic-usage';

// Demonstrate basic event-driven architecture concepts
async function main() {
  console.log('\n=== Event-Driven Architecture Demo ===\n');

  // Create user management instance
  const userManagement = new UserManagement();

  // Set up event handlers
  const cleanup = userManagement.setupEventHandlers();

  // Create some test users
  userManagement.createUser({
    username: 'john_doe',
    email: 'john@example.com'
  });

  userManagement.createUser({
    username: 'jane_smith',
    email: 'jane@example.com'
  });

  // Wait a bit to see all events processed
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Clean up event handlers
  cleanup();
}

main().catch(console.error);