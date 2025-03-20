import { UserManagement, hub, UserEvent, BaseEvent } from './basic-usage';

describe('Basic Event Hub Usage', () => {
  test('should handle basic event subscription', (done) => {
    const unsubscribe = hub.on('test.event', (data: { message: string }) => {
      expect(data.message).toBe('hello');
      unsubscribe();
      done();
    });

    hub.emit('test.event', { message: 'hello' });
  });

  test('should handle pattern-based subscriptions', (done) => {
    const events: string[] = [];
    
    const unsubscribe = hub.on(/user\..*/, (event: BaseEvent) => {
      if (event.type) {
        events.push(event.type);
        if (events.length === 2) {
          try {
            expect(events).toContain('user.created');
            expect(events).toContain('user.logged_in');
            unsubscribe();
            done();
          } catch (error) {
            done(error);
          }
        }
      }
    });

    // Emit events with proper event structure
    hub.emit('user.created', { type: 'user.created', data: { id: '1' } });
    hub.emit('user.logged_in', { type: 'user.logged_in', data: { id: '1' } });
  });

  test('should handle user creation with type safety', (done) => {
    const userManagement = new UserManagement();
    const testUser = {
      username: 'testuser',
      email: 'test@example.com'
    };

    const unsubscribe = hub.on('user.created', (user: UserEvent) => {
      try {
        expect(user.username).toBe(testUser.username);
        expect(user.email).toBe(testUser.email);
        unsubscribe();
        done();
      } catch (error) {
        done(error);
      }
    });

    userManagement.createUser(testUser);
  });

  test('should handle errors appropriately', (done) => {
    const errorMessage = 'Test error';
    const testError = new Error(errorMessage);
    
    const unsubscribe = hub.on('error', (error: Error) => {
      try {
        expect(error.message).toBe(errorMessage);
        unsubscribe();
        done();
      } catch (error) {
        done(error);
      }
    });

    hub.emit('error', { message: errorMessage });
  });
});