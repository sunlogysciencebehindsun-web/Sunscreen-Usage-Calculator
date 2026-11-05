import { type PropsWithChildren } from 'react';
import { StyleSheet, type StyleProp, View, type ViewStyle } from 'react-native';
import { colors, radius } from '../theme';

type PanelProps = PropsWithChildren<{ style?: StyleProp<ViewStyle> }>;

export function Panel({ children, style }: PanelProps) {
  return <View style={[styles.panel, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.line,
    borderRadius: radius.card,
    padding: 22,
  },
});
