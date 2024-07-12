export class ConsoleOutput implements Output {
  displayMessage(message: string): void {
    console.log(message);
  }
}

export interface Output {
  displayMessage(message: string): void;
}
