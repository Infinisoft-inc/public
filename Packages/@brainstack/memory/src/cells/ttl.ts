import { BaseMemoryCell } from "./base";

export class TTLMemoryCell extends BaseMemoryCell {
    expired: number; // Expiry time in milliseconds since the epoch

    constructor(content: any, ttl: number) {
      super(content);
      this.expired = Date.now() + ttl; // Set the expiry time
    }

    isExpired(): boolean {
      return Date.now() > this.expired; // Check if current time is past the expiry time
    }

    // Optionally, you can add a method to extend the TTL
    extendTTL(additionalTime: number): void {
      this.expired += additionalTime;
    }
}
