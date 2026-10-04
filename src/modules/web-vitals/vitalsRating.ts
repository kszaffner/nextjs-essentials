// Google's published thresholds: at or below the first value is "good", above
// the second is "poor", in between "needs improvement". Times are in
// milliseconds; CLS has no unit.
const THRESHOLDS = {
  LCP: [2500, 4000],
  INP: [200, 500],
  CLS: [0.1, 0.25],
  FCP: [1800, 3000],
  TTFB: [800, 1800],
  FID: [100, 300],
} as const;

export type VitalName = keyof typeof THRESHOLDS;
export type VitalRating = "good" | "needs improvement" | "poor";

export function isVitalName(name: string): name is VitalName {
  return name in THRESHOLDS;
}

export function rateVital(name: VitalName, value: number): VitalRating {
  const [good, poor] = THRESHOLDS[name];
  if (value <= good) {
    return "good";
  }
  return value <= poor ? "needs improvement" : "poor";
}

export function formatVitalValue(name: VitalName, value: number): string {
  return name === "CLS" ? value.toFixed(3) : `${Math.round(value)} ms`;
}
