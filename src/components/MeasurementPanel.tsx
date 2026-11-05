import { Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { REGIONS, type RegionKey } from '../data/regions';
import { colors, radius } from '../theme';
import { MeasurementInput } from './MeasurementInput';
import { Panel } from './Panel';
import { RegionOption } from './RegionOption';

interface MeasurementPanelProps {
  heightText: string;
  weightText: string;
  onChangeHeight: (text: string) => void;
  onChangeWeight: (text: string) => void;
  selected: RegionKey[];
  onToggleRegion: (key: RegionKey) => void;
  onCalculate: () => void;
  onReset: () => void;
  error: string | null;
}

const chunk = <T,>(items: T[], size: number): T[][] => {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
};

export function MeasurementPanel({
  heightText,
  weightText,
  onChangeHeight,
  onChangeWeight,
  selected,
  onToggleRegion,
  onCalculate,
  onReset,
  error,
}: MeasurementPanelProps) {
  const { width } = useWindowDimensions();
  const isTwoColumn = width >= 560;
  const regionRows = chunk(REGIONS, isTwoColumn ? 2 : 1);

  return (
    <Panel>
      <Text style={styles.heading}>1. Enter body measurements</Text>

      <View style={styles.inputs}>
        <MeasurementInput
          label="Height"
          unit="cm"
          value={heightText}
          onChangeText={onChangeHeight}
        />
        <MeasurementInput
          label="Weight"
          unit="kg"
          value={weightText}
          onChangeText={onChangeWeight}
        />
      </View>

      <Text style={[styles.heading, styles.regionsHeading]}>
        2. Select areas to cover
      </Text>

      <View style={styles.regions}>
        {regionRows.map((row) => (
          <View key={row[0].key} style={styles.regionRow}>
            {row.map((region) => (
              <RegionOption
                key={region.key}
                region={region}
                checked={selected.includes(region.key)}
                onToggle={() => onToggleRegion(region.key)}
              />
            ))}
            {isTwoColumn && row.length === 1 ? <View style={styles.spacer} /> : null}
          </View>
        ))}
      </View>

      <View style={styles.controls}>
        <Pressable
          onPress={onCalculate}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            styles.primaryButton,
            pressed && styles.primaryButtonPressed,
          ]}
        >
          <Text style={styles.primaryButtonText}>Calculate quantity</Text>
        </Pressable>
        <Pressable
          onPress={onReset}
          accessibilityRole="button"
          style={({ pressed }) => [
            styles.button,
            styles.secondaryButton,
            pressed && styles.secondaryButtonPressed,
          ]}
        >
          <Text style={styles.secondaryButtonText}>Reset</Text>
        </Pressable>
      </View>

      {error ? (
        <Text accessibilityRole="alert" accessibilityLiveRegion="polite" style={styles.error}>
          {error}
        </Text>
      ) : null}

      <Text style={styles.warning}>
        This is an estimated educational quantity, not an exact medical dose.
        Body-region percentages are population-based anatomical estimates.
        Clothing, body proportions, hair/scalp coverage and the actual exposed
        skin area can change the amount needed.
      </Text>
    </Panel>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 17,
  },
  regionsHeading: {
    marginTop: 23,
  },
  inputs: {
    flexDirection: 'row',
    gap: 13,
  },
  regions: {
    gap: 9,
  },
  regionRow: {
    flexDirection: 'row',
    gap: 9,
  },
  spacer: {
    flex: 1,
  },
  controls: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  button: {
    borderRadius: radius.input,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.navy,
  },
  primaryButtonPressed: {
    backgroundColor: colors.navyDeep,
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '800',
  },
  secondaryButton: {
    backgroundColor: colors.soft,
  },
  secondaryButtonPressed: {
    backgroundColor: '#e2ebf0',
  },
  secondaryButtonText: {
    color: colors.navy,
    fontSize: 14,
    fontWeight: '800',
  },
  error: {
    marginTop: 12,
    paddingHorizontal: 11,
    paddingVertical: 10,
    borderRadius: radius.warning,
    borderWidth: 1,
    borderColor: colors.errorBorder,
    backgroundColor: colors.errorBg,
    color: colors.errorText,
    fontSize: 13,
    lineHeight: 18,
  },
  warning: {
    marginTop: 14,
    padding: 13,
    borderRadius: radius.warning,
    borderWidth: 1,
    borderColor: colors.warningBorder,
    backgroundColor: colors.warningBg,
    color: colors.warningText,
    fontSize: 13,
    lineHeight: 19,
  },
});
