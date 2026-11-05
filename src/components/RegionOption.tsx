import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { BodyRegion } from '../data/regions';
import { colors, radius } from '../theme';

interface RegionOptionProps {
  region: BodyRegion;
  checked: boolean;
  onToggle: () => void;
}

export function RegionOption({ region, checked, onToggle }: RegionOptionProps) {
  return (
    <Pressable
      onPress={onToggle}
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={`${region.label}, ${region.note}`}
      style={({ pressed }) => [
        styles.option,
        checked && styles.optionChecked,
        pressed && styles.optionPressed,
      ]}
    >
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked ? <Text style={styles.checkmark}>✓</Text> : null}
      </View>
      <View style={styles.textBlock}>
        <Text style={styles.label}>{region.label}</Text>
        <Text style={styles.note}>{region.note}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  option: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.region,
    backgroundColor: colors.regionBg,
  },
  optionChecked: {
    borderColor: '#b6d4e2',
    backgroundColor: '#f4fbfd',
  },
  optionPressed: {
    opacity: 0.85,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: colors.checkboxBorder,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  checkboxChecked: {
    backgroundColor: colors.navy,
    borderColor: colors.navy,
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
    lineHeight: 16,
  },
  textBlock: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.navy,
  },
  note: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 3,
    lineHeight: 16,
  },
});
