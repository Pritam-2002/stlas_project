import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // or FontAwesome, etc.

const topMenuItems = [
  { label: 'SAT Library', icon: 'basketball' },
  { label: 'Exam Dates', icon: 'palette' },
  { label: 'Registration', icon: 'laptop' },
  { label: 'Scholarships', icon: 'cookie' },
  { label: 'Daily Quiz', icon: 'calendar' },
  { label: 'Book Demo', icon: 'book-open' },
  { label: 'AI Reports', icon: 'robot' },
];

const MenuGrid = () => {
  const firstRow = topMenuItems.slice(0, 4);
  const secondRow = topMenuItems.slice(4);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map((item, index) => (
          <View style={styles.gridItem} key={index}>
            <View style={styles.iconCircle}>
              <Icon name={item.icon} size={26} color="#4A90E2" />
            </View>
            <Text style={styles.menuText}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={styles.row}>
        {secondRow.map((item, index) => (
          <View style={styles.gridItem} key={index}>
            <View style={styles.iconCircle}>
              <Icon name={item.icon} size={26} color="#4A90E2" />
            </View>
            <Text style={styles.menuText}>{item.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    paddingBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    marginBottom: 12,
    alignItems: "center",

  },
  gridItem: {
    width: '20%', // Adjust for spacing
    alignItems: 'center',


  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  menuText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default MenuGrid;
