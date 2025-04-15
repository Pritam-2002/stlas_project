import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import MenuGrid from 'app/components/main/home/TopMenu';
import PracticeCard from 'app/components/main/home/card/CourseCard';
import AutoSlider from 'app/components/main/home/slider/HomeSlider';

const topMenuItems = [
  { label: 'SAT Library', icon: 'book' },
  { label: 'Exam Dates', icon: 'calendar' },
  { label: 'Registration', icon: 'person-add' },
  { label: 'Scholarships', icon: 'trophy' },
  { label: 'Daily Quiz', icon: 'help-circle' },
  { label: 'Book Demo', icon: 'videocam' },
  { label: 'All Reports', icon: 'document-text' },
];

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: "10%" }}>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Icon name="menu" size={24} color="#000" />
            <Text style={styles.title}>SAT Dashboard</Text>
          </View>

          <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
        </View>

        {/* Hero Banner */}

        <AutoSlider />
        {/* separator */}
        <View style={{ height: 0.5, width: "100%", backgroundColor: "#C9C9C9" }} >

        </View>
        {/* Top Menu */}
        <MenuGrid />

        <View style={{ height: 0.5, width: "100%", backgroundColor: "#C9C9C9" }} >

        </View>


        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20, alignItems: "center", paddingHorizontal: "2%" }}>

          <View>
            <Text style={{ fontWeight: "bold" }}>Free Practice</Text>
            <View style={{ height: 3, width: "50%", backgroundColor: "#612EF7", marginTop: 5 }} ></View>
          </View>
          <View>
            <Text style={{ fontWeight: "bold" }}>Courses</Text>
            <View style={{ height: 3, width: "50%", backgroundColor: "#34C759", marginTop: 5 }} ></View>
          </View>

        </View>

        {/* Free Practice & Courses */}
        <View style={styles.sectionRow}>


          <PracticeCard actionbtntext={"Start Now"} cardTitle='SAT Practice' cardTitle2='Paper-1' paperInfo='📚 Paper 2 of 8' progressText='44%' Progresspercentage={0.44} />

          <PracticeCard actionbtntext={"View All"} cardTitle='Course Progress' cardTitle2='' paperInfo='📚 Paper 2 of 8' progressText='15%' Progresspercentage={0.15} />
        </View>

        {/* Live Sessions */}
        <View style={styles.liveSection}>
          <View style={styles.liveHeader}>
            <Text style={styles.liveTitle}>Recent Live Sessions</Text>
            <TouchableOpacity>
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.liveCard}>
              <Image
                style={styles.liveImage}
                source={{ uri: 'https://beaconedu.com.np/wp-content/uploads/2019/08/SAT.png' }}
              />

            </View>

            <View style={styles.liveCard}>
              <Image
                style={styles.liveImage}
                source={{ uri: 'https://beaconedu.com.np/wp-content/uploads/2019/08/SAT.png' }}
              />

            </View>
          </ScrollView>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FD',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,

  },
  title: {
    fontSize: RFValue(16),
    fontWeight: '600',
  },
  avatar: {
    height: 35,
    width: 35,
    borderRadius: 20,
  },
  gridContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  gridItem: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    minWidth: '25%', // 4 items per row
  },

  banner: {
    backgroundColor: '#DDEAFE',
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  bannerText: {
    fontSize: RFValue(18),
    fontWeight: '700',
    color: '#4A90E2',
  },
  bannerSub: {
    fontSize: RFValue(14),
    marginTop: 4,
  },
  bannerImage: {
    height: 60,
    width: 60,
    marginTop: 10,
  },
  topMenu: {
    marginTop: 20,
  },
  menuItem: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  menuText: {
    fontSize: RFValue(10),
    marginTop: 4,
  },
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: '48%',
    elevation: 2,
  },
  cardTitle: {
    fontSize: RFValue(12),
    fontWeight: '600',
  },
  cardSubtitle: {
    fontSize: RFValue(10),
    marginVertical: 6,
  },
  startBtn: {
    backgroundColor: '#4A90E2',
    padding: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 6,
  },
  startText: {
    color: '#fff',
    fontSize: RFValue(10),
  },
  viewBtn: {
    backgroundColor: '#E0D5F6',
    padding: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 6,
  },
  viewText: {
    color: '#6A38B1',
    fontSize: RFValue(10),
  },
  progress: {
    fontSize: RFValue(10),
    color: '#888',
  },
  liveSection: {
    marginTop: 30,
  },
  liveHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  liveTitle: {
    fontSize: RFValue(14),
    fontWeight: '600',
  },
  viewAll: {
    color: '#1DB954',
    fontSize: RFValue(12),
  },
  liveCard: {
    width: 180,
    marginRight: 16,
  },
  liveImage: {
    height: 100,
    borderRadius: 12,
  },
  liveText: {
    fontSize: RFValue(10),
    marginTop: 4,
  },
});
