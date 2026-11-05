import { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius } from '../theme';

interface MeasurementInputProps {
  label: string;
  unit: string;
  value: string;
  onChangeText: (text: string) => void;
}

export function MeasurementInput({
  label,
  unit,
  value,
  onChangeText,
}: MeasurementInputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputShell, focused && styles.inputShellFocused]}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          keyboardType="decimal-pad"
          inputMode="decimal"
          maxLength={6}
          placeholder="0"
          placeholderTextColor="#9aabb8"
          selectionColor={colors.blue}
          accessibilityLabel={`${label} in ${unit}`}
          style={styles.input}
        />
        <Text style={styles.unit}>{unit}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.slate,
    marginBottom: 6,
  },
  inputShell: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.input,
    backgroundColor: colors.white,
  },
  inputShellFocused: {
    borderColor: colors.blue,
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 17,
    color: colors.ink,
  },
  unit: {
    paddingRight: 13,
    fontSize: 13,
    fontWeight: '700',
    color: colors.muted,
  },
});
