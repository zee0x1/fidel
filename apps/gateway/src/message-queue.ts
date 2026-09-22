export class MessageQueue<T> {
  private readonly queue: T[] = [];
  private processing = false;

  constructor(
    // worker method
    private readonly processMessage: (message: T) => Promise<void>,
  ) {}

  enqueue(message: T) {
    this.queue.push(message);
    this.processNext();
  }

  private async processNext(): Promise<void> {
    if (this.processing) {
      return;
    }

    this.processing = true;

    while (this.queue.length > 0) {
      const message = this.queue.shift();
      if (message === undefined) {
        console.log("Undefined message encountered during message processing");
        return;
      }

      try {
        await this.processMessage(message);
      } catch (e) {
        console.log("Failed to process queued message:: ", JSON.stringify(e));
      }
    }

    this.processing = false;
  }
}
