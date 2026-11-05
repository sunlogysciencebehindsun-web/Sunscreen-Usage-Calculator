import { useCallback, useState } from 'react';
import {
  Keyboard,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { MeasurementPanel } from '../components/MeasurementPanel';
import { MethodSection } from '../components/MethodSection';
import { ResultCard } from '../components/ResultCard';
import {
  DEFAULT_HEIGHT_CM,
  DEFAULT_SELECTION,
  DEFAULT_WEIGHT_KG,
  type RegionKey,
} from '../data/regions';
import { colors, layout } from '../theme';
import {
  computeEstimate,
  parseMeasurements,
  type Estimate,
} from '../utils/calculator';

const initialEstimate = computeEstimate(
  Number.parseFloat(DEFAULT_HEIGHT_CM),
  Number.parseFloat(DEFAULT_WEIGHT_KG),
  DEFAULT_SELECTION,
);

const measurementPattern = /^\d*[.,]?\d*$/;

export function CalculatorScreen() {
  const { width } = useWindowDimensions();
  const isWide = width >= layout.wideBreakpoint;

  const [heightText, setHeightText] = useState(DEFAULT_HEIGHT_CM);
  const [weightText, setWeightText] = useState(DEFAULT_WEIGHT_KG);
  const [selected, setSelected] = useState<RegionKey[]>(DEFAULT_SELECTION);
  const [estimate, setEstimate] = useState<Estimate>(initialEstimate);
  const [error, setError] = useState<string | null>(null);

  const handleChangeHeight = useCallback((text: string) => {
    if (!measurementPattern.test(text)) {
      return;
    }
    setHeightText(text);
    setError(null);
  }, []);

  const handleChangeWeight = useCallback((text: string) => {
    if (!measurementPattern.test(text)) {
      return;
    }
    setWeightText(text);
    setError(null);
  }, []);

  const handleToggleRegion = useCallback((key: RegionKey) => {
    setError(null);
    setSelected((previous) => {
      if (key === 'full') {
        return previous.includes('full') ? [] : ['full'];
      }

      const withoutFull = previous.filter((region) => region !== 'full');
      return withoutFull.includes(key)
        ? withoutFull.filter((region) => region !== key)
        : [...withoutFull, key];
    });
  }, []);

  const handleCalculate = useCallback(() => {
    Keyboard.dismiss();

    const measurements = parseMeasurements(heightText, weightText);
    if (!measurements.ok) {
      setError(measurements.message);
      return;
    }

    if (selected.length === 0) {
      setError('Please select at least one body area.');
      return;
    }

    setError(null);
    setEstimate(
      computeEstimate(measurements.heightCm, measurements.weightKg, selected),
    );
  }, [heightText, weightText, selected]);

  const handleReset = useCallback(() => {
    Keyboard.dismiss();
    setHeightText(DEFAULT_HEIGHT_CM);
    setWeightText(DEFAULT_WEIGHT_KG);
    setSelected(DEFAULT_SELECTION);
    setError(null);
    setEstimate(initialEstimate);
  }, []);

  return (
    <SafeAreaView edges={['top', 'left', 'right']} style={styles.safe}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <Hero />

        <View style={styles.main}>
          <View style={[styles.layout, isWide && styles.layoutWide]}>
            <View style={isWide ? styles.leftColumn : undefined}>
              <MeasurementPanel
                heightText={heightText}
                weightText={weightText}
                onChangeHeight={handleChangeHeight}
                onChangeWeight={handleChangeWeight}
                selected={selected}
                onToggleRegion={handleToggleRegion}
                onCalculate={handleCalculate}
                onReset={handleReset}
                error={error}
              />
            </View>
            <View style={isWide ? styles.rightColumn : undefined}>
              <ResultCard estimate={estimate} />
            </View>
          </View>

          <MethodSection />
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.page,
  },
  scrollContent: {
    flexGrow: 1,
  },
  main: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.pagePadding,
    paddingTop: 24,
    paddingBottom: 55,
  },
  layout: {
    gap: 20,
  },
  layoutWide: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftColumn: {
    flex: 1.1,
    minWidth: 0,
  },
  rightColumn: {
    flex: 0.9,
    minWidth: 0,
  },
});
