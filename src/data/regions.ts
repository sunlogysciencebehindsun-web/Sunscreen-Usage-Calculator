export type RegionKey =
  | 'face'
  | 'neck'
  | 'hands'
  | 'arms'
  | 'legs'
  | 'front'
  | 'back'
  | 'full';

export interface BodyRegion {
  key: RegionKey;
  label: string;
  fraction: number;
  note: string;
}

export const REGIONS: BodyRegion[] = [
  { key: 'face', label: 'Face', fraction: 0.035, note: '3.5% of estimated BSA' },
  { key: 'neck', label: 'Neck', fraction: 0.025, note: 'Front + back: 2.5%' },
  { key: 'hands', label: 'Hands', fraction: 0.03, note: 'Both hands: 3%' },
  { key: 'arms', label: 'Arms', fraction: 0.14, note: 'Both arms: 14%' },
  { key: 'legs', label: 'Legs', fraction: 0.385, note: 'Both legs + instep: 38.5%' },
  { key: 'front', label: 'Front torso', fraction: 0.115, note: 'Approx. 11.5%' },
  { key: 'back', label: 'Back torso', fraction: 0.13, note: 'Approx. 13%' },
  { key: 'full', label: 'Full body', fraction: 1, note: '100% estimated BSA' },
];

export const REGION_MAP = Object.fromEntries(
  REGIONS.map((region) => [region.key, region]),
) as Record<RegionKey, BodyRegion>;

export const DEFAULT_HEIGHT_CM = '170';
export const DEFAULT_WEIGHT_KG = '70';
export const DEFAULT_SELECTION: RegionKey[] = ['face', 'neck'];
