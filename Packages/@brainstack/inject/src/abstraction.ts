/**
 * Represents a service identifier.  Can be a class constructor or a string.
 * If a factory is registered then the service identifier *must* be a string.
 */

export interface ServiceIdentifier<T> {
  (...args: any[]): T; // Optional: Can be a factory function
  name?: string; // If it's a class, this will be the class name
}
