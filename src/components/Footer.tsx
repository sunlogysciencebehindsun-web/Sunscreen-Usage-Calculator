import { StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

export function Footer() {
  const insets = useSafeAreaInsets();

  return (
    <Text style={[styles.footer, { paddingBottom: 18 + insets.bottom }]}>
      Sunlogy International • Science Behind Sun • Sunscreen Quantity Calculator
    </Text>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: colors.greenDeep,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: 22,
    paddingTop: 18,
    fontSize: 13,
  },
});
