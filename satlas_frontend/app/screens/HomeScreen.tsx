import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { HomeTabNavigationProp } from '../types/navigation.types';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeTabNavigationProp>();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Navigation will be handled automatically by the AppNavigator
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SATLAS</Text>
        <TouchableOpacity style={styles.profileButton} onPress={() => { }}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileInitial}>{user?.name?.charAt(0) || 'U'}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome, {user?.name?.split(' ')[0] || 'User'}!</Text>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Your Profile</Text>
            <View style={styles.userInfo}>
              <Text style={styles.infoText}>Name: {user?.name}</Text>
              <Text style={styles.infoText}>Email: {user?.email}</Text>
              {user?.currentGrade && (
                <Text style={styles.infoText}>Grade: {user.currentGrade}</Text>
              )}
              {user?.country && (
                <Text style={styles.infoText}>Country: {user.country}</Text>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8ECF4',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#0047CC',
  },
  profileButton: {
    padding: 5,
  },
  profileAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#376AED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInitial: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
    color: '#333333',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#376AED',
    marginBottom: 15,
  },
  userInfo: {
    width: '100%',
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  logoutButton: {
    backgroundColor: '#376AED',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 10,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default HomeScreen; 