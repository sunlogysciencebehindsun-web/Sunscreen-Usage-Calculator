import { StyleSheet, Text, View } from 'react-native';
import { colors, layout } from '../theme';

export function Header() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.top}>
        <View style={styles.brandBlock}>
          <Text style={styles.brand}>sunlogy</Text>
          <Text style={styles.tagline}>Science Behind Sun</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Educational calculator</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.line,
  },
  top: {
    width: '100%',
    maxWidth: layout.maxWidth,
    alignSelf: 'center',
    paddingHorizontal: layout.pagePadding,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 15,
  },
  brandBlock: {
    flexShrink: 1,
  },
  brand: {
    fontSize: 31,
    fontWeight: '900',
    color: colors.orange,
    letterSpacing: -1.2,
    lineHeight: 34,
  },
  tagline: {
    fontSize: 12,
    color: colors.muted,
    marginTop: 1,
  },
  badge: {
    backgroundColor: colors.softGreen,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.green,
  },
});
