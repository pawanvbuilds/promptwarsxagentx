import { createHash } from "node:crypto";
import type { FounderInput, VentureDossier } from "../types/domain";

interface CacheEntry<T> {
  data: T;
  cachedAt: number;
  accessCount: number;
}

class VentureLruCache {
  private cache = new Map<string, CacheEntry<VentureDossier>>();
  private warRoomCache = new Map<string, CacheEntry<string>>();
  private maxEntries: number;
  private stats = { hits: 0, misses: 0 };

  constructor(maxEntries = 50) {
    this.maxEntries = maxEntries;
  }

  /**
   * Generates a deterministic SHA-256 hash from founder input
   */
  public generateDossierKey(input: FounderInput): string {
    const normalized = [
      input.idea.toLowerCase().replace(/\s+/g, " ").trim(),
      (input.region || "Global").toLowerCase().trim(),
      (input.businessModel || "B2B SaaS").toLowerCase().trim(),
      input.targetCustomer?.toLowerCase().trim() || "",
      input.stage || "idea",
    ].join("|");

    return createHash("sha256").update(normalized).digest("hex");
  }

  /**
   * Generates a deterministic SHA-256 hash for war room inquiries
   */
  public generateWarRoomKey(personaId: string, question: string, dossierId?: string): string {
    const normalized = `${personaId}|${dossierId || "global"}|${question.toLowerCase().trim()}`;
    return createHash("sha256").update(normalized).digest("hex");
  }

  public getDossier(key: string): VentureDossier | null {
    const entry = this.cache.get(key);
    if (!entry) {
      this.stats.misses++;
      return null;
    }

    this.stats.hits++;
    entry.accessCount++;
    // Re-insert to refresh LRU order
    this.cache.delete(key);
    this.cache.set(key, entry);
    return entry.data;
  }

  public setDossier(key: string, data: VentureDossier): void {
    if (this.cache.size >= this.maxEntries) {
      const oldestKey = this.cache.keys().next().value;
      if (oldestKey) this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      cachedAt: Date.now(),
      accessCount: 1,
    });
  }

  public getWarRoomResponse(key: string): string | null {
    const entry = this.warRoomCache.get(key);
    if (!entry) return null;
    return entry.data;
  }

  public setWarRoomResponse(key: string, answer: string): void {
    if (this.warRoomCache.size >= this.maxEntries) {
      const oldestKey = this.warRoomCache.keys().next().value;
      if (oldestKey) this.warRoomCache.delete(oldestKey);
    }
    this.warRoomCache.set(key, {
      data: answer,
      cachedAt: Date.now(),
      accessCount: 1,
    });
  }

  public getTelemetry() {
    const total = this.stats.hits + this.stats.misses;
    return {
      entries: this.cache.size,
      hits: this.stats.hits,
      misses: this.stats.misses,
      hitRatio: total > 0 ? (this.stats.hits / total).toFixed(3) : "0.000",
    };
  }

  public clear(): void {
    this.cache.clear();
    this.warRoomCache.clear();
    this.stats = { hits: 0, misses: 0 };
  }
}

// Global singleton cache instance across requests
export const globalVentureCache = new VentureLruCache(60);
