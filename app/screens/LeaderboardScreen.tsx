import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../utils/colors';
import { leaderboardUsers } from '../data/users';
import { useAuth } from '../context/AuthContext';
import LeaderboardItem from '../components/LeaderboardItem';

const LeaderboardScreen: React.FC = () => {
  const { user } = useAuth();
  const [selectedTab, setSelectedTab] = useState<'weekly' | 'allTime'>('weekly');
  
  // Sort users by points in descending order
  const sortedUsers = [...leaderboardUsers].sort((a, b) => b.points - a.points);
  
  // Find user's position in leaderboard
  const userRank = user 
    ? sortedUsers.findIndex(u => u.id === user.id) + 1
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Leaderboard</Text>
      </View>
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'weekly' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('weekly')}
        >
          <Text 
            style={[
              styles.tabText,
              selectedTab === 'weekly' && styles.activeTabText,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.tab,
            selectedTab === 'allTime' && styles.activeTab,
          ]}
          onPress={() => setSelectedTab('allTime')}
        >
          <Text 
            style={[
              styles.tabText,
              selectedTab === 'allTime' && styles.activeTabText,
            ]}
          >
            All Time
          </Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={sortedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <LeaderboardItem user={item} rank={index + 1} />
        )}
        contentContainerStyle={styles.listContent}
      />
      
      {user && userRank > 0 && (
        <View style={styles.yourRankContainer}>
          <Text style={styles.yourRankText}>
            Your Rank: #{userRank} • {user.points} points
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 16,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  activeTab: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.7)',
  },
  activeTabText: {
    color: colors.white,
  },
  listContent: {
    padding: 16,
  },
  yourRankContainer: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    alignItems: 'center',
  },
  yourRankText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default LeaderboardScreen;
