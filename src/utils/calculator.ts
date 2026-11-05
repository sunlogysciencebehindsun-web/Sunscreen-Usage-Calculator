import { REGION_MAP, type RegionKey } from '../data/regions';

export const APPLICATION_DENSITY_MG_PER_CM2 = 2;
export const HEIGHT_MIN_CM = 80;
export const HEIGHT_MAX_CM = 230;
export const WEIGHT_MIN_KG = 15;
export const WEIGHT_MAX_KG = 250;

export interface AreaBreakdown {
  key: RegionKey;
  label: string;
  fraction: number;
  grams: number;
}

export interface Estimate {
  bsa: number;
  coverage: number;
  perUse: number;
  perDay: number;
  perMonth: number;
  breakdown: AreaBreakdown[];
}

export type MeasurementValidation =
  | { ok: true; heightCm: number; weightKg: number }
  | { ok: false; message: string };

const toNumber = (text: string) => Number.parseFloat(text.replace(',', '.'));

export function parseMeasurements(
  heightText: string,
  weightText: string,
): MeasurementValidation {
  const heightCm = toNumber(heightText);
  const weightKg = toNumber(weightText);

  if (
    !Number.isFinite(heightCm) ||
    !Number.isFinite(weightKg) ||
    heightCm < HEIGHT_MIN_CM ||
    heightCm > HEIGHT_MAX_CM ||
    weightKg < WEIGHT_MIN_KG ||
    weightKg > WEIGHT_MAX_KG
  ) {
    return {
      ok: false,
      message: 'Please enter height 80–230 cm and weight 15–250 kg.',
    };
  }

  return { ok: true, heightCm, weightKg };
}

export function coverageFraction(selected: RegionKey[]): number {
  const total = selected.reduce((sum, key) => sum + REGION_MAP[key].fraction, 0);
  return Math.min(total, 1);
}

const gramsForArea = (bsa: number, fraction: number) =>
  (bsa * 10000 * fraction * APPLICATION_DENSITY_MG_PER_CM2) / 1000;

export function computeEstimate(
  heightCm: number,
  weightKg: number,
  selected: RegionKey[],
): Estimate {
  const bsa = Math.sqrt((heightCm * weightKg) / 3600);
  const coverage = coverageFraction(selected);
  const perUse = gramsForArea(bsa, coverage);

  return {
    bsa,
    coverage,
    perUse,
    perDay: perUse * 2,
    perMonth: perUse * 60,
    breakdown: selected.map((key) => ({
      key,
      label: REGION_MAP[key].label,
      fraction: REGION_MAP[key].fraction,
      grams: gramsForArea(bsa, REGION_MAP[key].fraction),
    })),
  };
}

export const formatGrams = (value: number) => `${value.toFixed(2)} g`;
export const formatMonthGrams = (value: number) => `${value.toFixed(1)} g`;
export const formatPercent = (value: number) => `${(value * 100).toFixed(1)}%`;
export const formatBsa = (value: number) => `${value.toFixed(2)} m²`;
