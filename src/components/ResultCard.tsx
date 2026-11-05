import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, View } from 'react-native';
import {
  formatBsa,
  formatGrams,
  formatMonthGrams,
  formatPercent,
  type Estimate,
} from '../utils/calculator';
import { colors, radius } from '../theme';

interface ResultCardProps {
  estimate: Estimate;
}

export function ResultCard({ estimate }: ResultCardProps) {
  const metrics = [
    { label: 'Twice daily', value: formatGrams(estimate.perDay) },
    { label: '30 days', value: formatMonthGrams(estimate.perMonth) },
    { label: 'Estimated BSA', value: formatBsa(estimate.bsa) },
    { label: 'Selected skin', value: formatPercent(estimate.coverage) },
  ];

  return (
    <LinearGradient
      colors={[colors.navy, '#0c5b85']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
      accessible
      accessibilityLabel={`Sunscreen estimate: ${formatGrams(
        estimate.perUse,
      )} per application`}
    >
      <Text style={styles.title}>Your sunscreen estimate</Text>
      <Text style={styles.subtitle}>At 2 mg/cm² • selected exposed areas</Text>

      <Text style={styles.big}>{formatGrams(estimate.perUse)}</Text>
      <Text style={styles.unit}>per application</Text>

      <View style={styles.metrics}>
        {metrics.map((metric) => (
          <View key={metric.label} style={styles.metric}>
            <Text style={styles.metricLabel}>{metric.label}</Text>
            <Text style={styles.metricValue}>{metric.value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.breakdown}>
        <Text style={styles.breakdownTitle}>Area breakdown</Text>
        {estimate.breakdown.map((row, index) => (
          <View
            key={row.key}
            style={[
              styles.row,
              index === estimate.breakdown.length - 1 && styles.rowLast,
            ]}
          >
            <Text style={styles.rowLabel}>{row.label}</Text>
            <Text style={styles.rowValue}>{formatGrams(row.grams)}</Text>
          </View>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.card,
    padding: 22,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.white,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.78)',
  },
  big: {
    fontSize: 48,
    lineHeight: 54,
    fontWeight: '900',
    letterSpacing: -1.5,
    color: colors.white,
    marginTop: 19,
    marginBottom: 2,
    fontVariant: ['tabular-nums'],
  },
  unit: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.82)',
  },
  metrics: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 18,
  },
  metric: {
    flexGrow: 1,
    flexBasis: '47%',
    backgroundColor: colors.resultGlass,
    borderWidth: 1,
    borderColor: colors.resultGlassBorder,
    borderRadius: radius.metric,
    padding: 13,
  },
  metricLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
  },
  metricValue: {
    fontSize: 21,
    fontWeight: '800',
    color: colors.white,
    marginTop: 3,
    fontVariant: ['tabular-nums'],
  },
  breakdown: {
    marginTop: 15,
    backgroundColor: colors.white,
    borderRadius: radius.breakdown,
    paddingHorizontal: 13,
    paddingVertical: 6,
  },
  breakdownTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.ink,
    paddingTop: 8,
    paddingBottom: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    flexShrink: 1,
    fontSize: 14,
    color: colors.ink,
  },
  rowValue: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.navy,
    fontVariant: ['tabular-nums'],
  },
});
