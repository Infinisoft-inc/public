import { createEventHub } from '@brainstack/hub';
import { createLogger } from '@brainstack/log';

// Event hub creation with basic configuration
export const hub = createEventHub({
  source: 'myApp',
  logger: createLogger() // Optional custom logger
});

// Event types
export interface UserEvent {
  id: string;
  username: string;
  email: string;
}

export interface BaseEvent<T = unknown> {
  type: string;
  data: T;
}

// Basic event subscription
hub.on('userLoggedIn', (userData: { id: string; username: string }) => {
  console.log('User logged in:', userData);
});

// Pattern-based subscription using RegExp
hub.on(/user\..*/, (event: BaseEvent) => {
  console.log('User-related event:', event.type);
});

// Example usage in a component
export class UserManagement {
  private hub: ReturnType<typeof createEventHub>;

  constructor() {
    this.hub = hub;
  }

  public setupEventHandlers() {
    // Subscribe to specific events with proper cleanup
    const handlers = [
      this.hub.on('user.created', this.handleUserCreated)
    ];

    // Return cleanup function
    return () => handlers.forEach(handler => handler());
  }

  private handleUserCreated = (user: UserEvent) => {
    try {
      console.log('New user created:', user.username);
      // ... handle user creation
    } catch (error) {
      // Error handling example
      const err = error instanceof Error ? error : new Error(String(error));
      this.hub.emit('error', err);
    }
  }

  // Example of emitting events
  public createUser(userData: Omit<UserEvent, 'id'>) {
    const user: UserEvent = {
      id: Math.random().toString(36).slice(2),
      ...userData
    };

    // Emit the user.created event
    this.hub.emit('user.created', user);
    return user;
  }
}