import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { colors } from '../utils/colors';
import { LeaderboardUser } from '../utils/types';
import { BadgeIcon } from '../assets/icons';

interface LeaderboardItemProps {
  user: LeaderboardUser;
  rank: number;
}

const LeaderboardItem: React.FC<LeaderboardItemProps> = ({
  user,
  rank,
}) => {
  // Determine if the user is in top 3
  const isTopRank = rank <= 3;
  
  // Get the appropriate color based on rank
  const getRankColor = () => {
    switch (rank) {
      case 1: return colors.yellow;
      case 2: return '#C0C0C0'; // Silver
      case 3: return '#CD7F32'; // Bronze
      default: return colors.darkGray;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.rankContainer}>
        <View style={[
          styles.rankBadge,
          isTopRank && { backgroundColor: getRankColor() }
        ]}>
          <Text style={styles.rankText}>{rank}</Text>
        </View>
      </View>
      
      <Image 
        source={{ uri: user.avatar || 'https://i.pravatar.cc/150' }} 
        style={styles.avatar} 
      />
      
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.country}>{user.country}</Text>
      </View>
      
      <View style={styles.pointsContainer}>
        <BadgeIcon points={user.points} size={20} />
        <Text style={styles.points}>{user.points} points</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  rankContainer: {
    width: 36,
    alignItems: 'center',
  },
  rankBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.white,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 8,
  },
  infoContainer: {
    marginLeft: 12,
    flex: 1,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  country: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  points: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 4,
  },
});

export default LeaderboardItem;
