import { StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../theme';
import { Panel } from './Panel';

export function MethodSection() {
  return (
    <Panel style={styles.panel}>
      <Text style={styles.heading}>Scientific method</Text>

      <View style={styles.formula}>
        <Text style={styles.formulaLine}>
          <Text style={styles.formulaStrong}>Mosteller BSA: </Text>√[(height cm
          × weight kg) / 3600]
        </Text>
        <Text style={styles.formulaLine}>
          <Text style={styles.formulaStrong}>Selected skin area: </Text>BSA ×
          10,000 × body-region fraction
        </Text>
        <Text style={styles.formulaLine}>
          <Text style={styles.formulaStrong}>Sunscreen: </Text>selected area ×
          2 mg/cm²
        </Text>
      </View>

      <Text style={styles.reference}>
        <Text style={styles.referenceStrong}>Scientific basis: </Text>
        2 mg/cm² is the standard application density used in SPF testing. Adult
        regional surface-area fractions in this calculator are based primarily
        on the anatomical model used in published sunscreen-application
        research: face 3.5%, front neck 1.5%, back neck 1%, arms 14%, hands 3%,
        and legs including thighs/lower legs/instep 38.5%. Full body uses 100%
        of estimated BSA. For torso estimates, adult values from the same
        published regional model are used approximately.
      </Text>

      <Text style={styles.reference}>
        <Text style={styles.referenceStrong}>Planning outputs: </Text>
        “Twice daily” is exactly 2 applications/day. “30 days” =
        per-application quantity × 2 × 30. The calculator reports mass in
        grams; it does not assume grams equal millilitres because product
        density varies.
      </Text>
    </Panel>
  );
}

const styles = StyleSheet.create({
  panel: {
    marginTop: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.navy,
    marginBottom: 17,
  },
  formula: {
    backgroundColor: colors.formulaBg,
    borderLeftWidth: 5,
    borderLeftColor: colors.cyan,
    borderRadius: radius.formula,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 3,
  },
  formulaLine: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.ink,
  },
  formulaStrong: {
    fontWeight: '800',
    color: colors.ink,
  },
  reference: {
    fontSize: 13,
    lineHeight: 20,
    color: '#596879',
    marginTop: 14,
  },
  referenceStrong: {
    fontWeight: '800',
    color: colors.ink,
  },
});
