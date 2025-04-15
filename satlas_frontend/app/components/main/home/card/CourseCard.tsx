import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper'; // or use a custom View

type PracticeCardProps = {
  actionbtntext: any;
  cardTitle: string;
  cardTitle2: string;
  progressText: string;
  paperInfo: string;
  Progresspercentage: number;
};

const PracticeCard = ({ actionbtntext, cardTitle, cardTitle2, progressText, paperInfo, Progresspercentage }: PracticeCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <Text style={styles.icon}>👁️‍🗨️</Text>
        <TouchableOpacity style={styles.startBtn}>
          <Text style={styles.startText}>{actionbtntext}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.cardTitle}>{cardTitle}</Text>
      <Text style={styles.cardTitle2}>{cardTitle2}</Text>

      <View style={styles.progressWrapper}>
        <ProgressBar progress={Progresspercentage} color="#FF6B00" style={styles.progressBar} />
        <View style={styles.progressTextWrapper}>
          <Text style={styles.progressText}>{progressText}</Text>
        </View>
      </View>

      <Text style={styles.paperInfo}>{paperInfo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    height: "auto",
    width: 180,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  startBtn: {
    backgroundColor: '#6C47FF',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  startText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardTitle2: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 1,
  },
  progressWrapper: {
    marginTop: 12,
    position: 'relative',
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    marginBottom: 30
  },
  progressTextWrapper: {
    position: 'absolute',
    left: 0,
    top: 10,
    backgroundColor: '#FF6B00',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: 10
  },
  progressText: {
    color: '#fff',
    fontSize: 12,
  },
  paperInfo: {
    marginTop: 20,
    fontSize: 12,
    color: '#555',
  },
});

export default PracticeCard;
