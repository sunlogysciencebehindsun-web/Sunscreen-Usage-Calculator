import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { colors, layout } from '../theme';

export function Hero() {
  const { width } = useWindowDimensions();
  const isNarrow = width < 480;

  return (
    <LinearGradient
      colors={[colors.white, colors.heroWarm, colors.heroMint]}
      locations={[0, 0.68, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.hero}
    >
      <View style={styles.inner}>
        <Text style={styles.eyebrow}>Personalized application estimate</Text>
        <Text style={[styles.title, isNarrow && styles.titleNarrow]}>
          Sunscreen Quantity Calculator
        </Text>
        <Text style={styles.paragraph}>
          Estimate the amount of sunscreen required to reach the 2 mg/cm²
          application density used in SPF testing, personalized from height,
          weight and the skin areas you plan to cover.
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  inner: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.pagePadding,
    paddingVertical: 38,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
    color: colors.green,
    textTransform: 'uppercase',
  },
  title: {
    fontSize: 42,
    lineHeight: 45,
    marginTop: 8,
    marginBottom: 8,
    color: colors.navy,
    fontWeight: '900',
    letterSpacing: -0.8,
  },
  titleNarrow: {
    fontSize: 34,
    lineHeight: 37,
  },
  paragraph: {
    maxWidth: 760,
    color: '#536273',
    fontSize: 17,
    lineHeight: 26,
  },
});
