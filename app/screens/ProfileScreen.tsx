import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../utils/colors';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CoursesContext';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import {
  BookIcon,
  SettingsIcon,
  LogoutIcon,
  CreditCardIcon,
  TrophyIcon,
  ChevronRightIcon
} from '../assets/icons';
import UserPoints from '../components/UserPoints';

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const { enrolledCourses } = useCourses();

  const handleSubscriptionPress = () => {
    (navigation as any).navigate('HomeTab', { screen: 'Subscription' });
  };

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Profile" showBack={false} showProfile={false} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Please log in to view your profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.profileHeader}>
          <Image
            source={{ uri: user.avatar || 'https://i.pravatar.cc/150' }}
            style={styles.profileImage}
          />

          <Text style={styles.userName}>{user.name}</Text>

          <View style={styles.pointsContainer}>
            <TrophyIcon size={24} color={colors.yellow} />
            <Text style={styles.pointsText}>{user.points} Points</Text>
          </View>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => (navigation as any).navigate('MyCourses')}
          >
            <View style={styles.menuIconContainer}>
              <BookIcon size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>My Courses</Text>
            <ChevronRightIcon size={20} color={colors.darkGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleSubscriptionPress}>
            <View style={styles.menuIconContainer}>
              <CreditCardIcon size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Upgrade Plan</Text>
            <ChevronRightIcon size={20} color={colors.darkGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}
            onPress={() => (navigation as any).navigate('LeaderboardTab')}
          >
            <View style={styles.menuIconContainer}>
              <TrophyIcon size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Ranking</Text>
            <ChevronRightIcon size={20} color={colors.darkGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <SettingsIcon size={20} color={colors.primary} />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <ChevronRightIcon size={20} color={colors.darkGray} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={styles.menuIconContainer}>
              <LogoutIcon size={20} color={colors.error} />
            </View>
            <Text style={[styles.menuText, { color: colors.error }]}>Logout</Text>
            <ChevronRightIcon size={20} color={colors.darkGray} />
          </TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.primary,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: colors.white,
    marginBottom: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 8,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
    marginLeft: 8,
  },
  menuContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    margin: 16,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  menuIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: colors.textPrimary,
  },
  coursesContainer: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  coursesList: {
    marginBottom: 16,
  },
});

export default ProfileScreen;
