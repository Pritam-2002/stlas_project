import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[
      styles.container,
      { paddingBottom: insets.bottom > 0 ? insets.bottom : 10 }
    ]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        // Center button (plus button)
        if (route.name === 'AddAction') {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={onPress}
              style={styles.addButton}
            >
              <View style={styles.addButtonInner}>
                <Text style={styles.plusIcon}>+</Text>
              </View>
            </TouchableOpacity>
          );
        }

        // Return appropriate icon based on route name and focus state
        const getIcon = () => {
          switch (route.name) {
            case 'Home':
              return (
                <View style={styles.iconContainer}>
                  <Text style={[styles.icon, isFocused && styles.activeIcon]}>🏠</Text>
                </View>
              );
            case 'Books':
              return (
                <View style={styles.iconContainer}>
                  <Text style={[styles.icon, isFocused && styles.activeIcon]}>📚</Text>
                </View>
              );
            case 'Search':
              return (
                <View style={styles.iconContainer}>
                  <Text style={[styles.icon, isFocused && styles.activeIcon]}>🔍</Text>
                </View>
              );
            case 'Menu':
              return (
                <View style={styles.iconContainer}>
                  <Text style={[styles.icon, isFocused && styles.activeIcon]}>≡</Text>
                </View>
              );
            default:
              return null;
          }
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            style={styles.tabItem}
          >
            {getIcon()}
            <Text style={[
              styles.label,
              isFocused ? styles.activeLabel : styles.inactiveLabel
            ]}>
              {label.toString()}
            </Text>
            {isFocused && <View style={styles.indicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    height: 75,
    borderTopWidth: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: '#7B8BB2',
  },
  activeIcon: {
    color: '#0047CC',
  },
  label: {
    fontSize: 10,
    marginTop: 5,
    fontFamily: 'Poppins-Medium',
    letterSpacing: 0.12,
  },
  activeLabel: {
    color: '#0047CC',
    fontFamily: 'Poppins-SemiBold',
  },
  inactiveLabel: {
    color: '#7B8BB2',
  },
  indicator: {
    position: 'absolute',
    bottom: 3,
    width: 8,
    height: 4,
    backgroundColor: '#E8ECF4',
    borderRadius: 100,
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -15,
  },
  addButtonInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#376AED',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  plusIcon: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  }
});

export default TabBar; 