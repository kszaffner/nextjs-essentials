// A tiny external store for the metrics this tab has reported, so the root
// layout's collector and the demo page can share them without props.
export type RecordedVital = {
  id: string;
  name: string;
  value: number;
};

const NO_VITALS: readonly RecordedVital[] = [];

let vitals: readonly RecordedVital[] = NO_VITALS;
const listeners = new Set<() => void>();

// Metrics such as CLS and INP are reported again as they change, so the
// newest value for a name replaces the previous one.
export function recordVital(vital: RecordedVital): void {
  vitals = [...vitals.filter((existing) => existing.name !== vital.name), vital];
  for (const listener of listeners) {
    listener();
  }
}

export function resetVitals(): void {
  vitals = NO_VITALS;
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeToVitals(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getVitalsSnapshot(): readonly RecordedVital[] {
  return vitals;
}

export function getServerVitalsSnapshot(): readonly RecordedVital[] {
  return NO_VITALS;
}
