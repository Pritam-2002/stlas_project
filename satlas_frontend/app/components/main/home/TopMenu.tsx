import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // or FontAwesome, etc.

const topMenuItems = [
  { label: 'SAT Library', icon: 'bookshelf' },
  { label: 'Exam Dates', icon: 'calendar' },
  { label: 'Registration', icon: 'laptop' },
  { label: 'Scholarships', icon: 'cash-multiple' },
  { label: 'Daily Quiz', icon: 'brain' },
  { label: 'Book Demo', icon: 'video' },
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
      <View style={styles.row2}>
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
    paddingHorizontal: "3%",
  },
  row: {
    flexDirection: 'row',
    gap: "7%",

    marginBottom: 12,
    alignItems: "center",

  },
  row2: {
    flexDirection: 'row',
    gap: "7%",
    marginTop: "3%",
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
