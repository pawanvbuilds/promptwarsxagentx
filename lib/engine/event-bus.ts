import type { VentureSSEEvent } from "../types/agent-events";

export type EventListener = (event: VentureSSEEvent) => void;

export class VentureEventBus {
  private listeners: EventListener[] = [];

  public subscribe(listener: EventListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  public emit(event: VentureSSEEvent): void {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (err) {
        console.error("EventBus listener error:", err);
      }
    }
  }

  public clear(): void {
    this.listeners = [];
  }
}
