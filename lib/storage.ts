import { useSyncExternalStore } from "react";
import type { VentureDossier } from "./types/domain";
import { SHOWCASE_PRESETS } from "./presets/showcase-ventures";

const STORAGE_KEY = "venture_architect_saved_dossiers";
const EMPTY_DOSSIERS: VentureDossier[] = [];

let memoryDossiers: VentureDossier[] | null = null;
const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) {
    listener();
  }
}

function loadFromLocalStorage(): VentureDossier[] {
  if (typeof window === "undefined") return EMPTY_DOSSIERS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
    const presets = SHOWCASE_PRESETS.map((p) => p.precompiledDossier);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
    return presets;
  } catch {
    return SHOWCASE_PRESETS.map((p) => p.precompiledDossier);
  }
}

function subscribe(callback: () => void): () => void {
  listeners.add(callback);

  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      memoryDossiers = loadFromLocalStorage();
      notify();
    }
  };

  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }

  return () => {
    listeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getSnapshot(): VentureDossier[] {
  if (typeof window === "undefined") return EMPTY_DOSSIERS;
  if (memoryDossiers === null) {
    memoryDossiers = loadFromLocalStorage();
  }
  return memoryDossiers;
}

function getServerSnapshot(): VentureDossier[] {
  return EMPTY_DOSSIERS;
}

export function saveDossierToStorage(dossier: VentureDossier): void {
  const current = getSnapshot();
  const exists = current.some((d) => d.id === dossier.id);
  const updated = exists
    ? current.map((d) => (d.id === dossier.id ? dossier : d))
    : [dossier, ...current];

  memoryDossiers = updated;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota exceptions
    }
  }
  notify();
}

export function deleteDossierFromStorage(id: string): void {
  const current = getSnapshot();
  const updated = current.filter((d) => d.id !== id);
  memoryDossiers = updated;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore quota exceptions
    }
  }
  notify();
}

export function useSavedDossiers(): {
  savedDossiers: VentureDossier[];
  saveDossier: (dossier: VentureDossier) => void;
  deleteDossier: (id: string) => void;
} {
  const savedDossiers = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  return {
    savedDossiers,
    saveDossier: saveDossierToStorage,
    deleteDossier: deleteDossierFromStorage,
  };
}
