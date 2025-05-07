import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { colors } from '../utils/colors';
import Header from '../components/Header';
import CourseCard from '../components/course/CourseCard';
import { BookIcon } from '../assets/icons';
import { useUser } from '@clerk/clerk-expo';
import { useCourses } from '../context/CoursesContext';

const MyCoursesScreen: React.FC = () => {
  const { user } = useUser();
  const { enrolledCourses, inProgressCourses, loading, error, fetchEnrolledCourses } = useCourses('');

  useEffect(() => {
    if (user) {
      fetchEnrolledCourses(user.id);
    }
  }, [user]);

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Courses" showBack={false} showProfile={false} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Please log in to view your courses</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Courses" showBack={false} showProfile={false} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Courses" showBack={false} showProfile={false} />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const limitedInProgressCourses = inProgressCourses.slice(0, 5); // Limit to 5
  const limitedEnrolledCourses = enrolledCourses.slice(0, 5); // Limit to 5

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Courses</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {limitedInProgressCourses.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>In Progress</Text>
            <View style={styles.coursesList}>
              {limitedInProgressCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isHorizontal={true}
                />
              ))}
            </View>
          </View>
        )}

        {limitedEnrolledCourses.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>All Enrolled Courses</Text>
            <View style={styles.coursesList}>
              {limitedEnrolledCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isHorizontal={true}
                />
              ))}
            </View>
          </View>
        )}

        {limitedEnrolledCourses.length === 0 && (
          <View style={styles.emptyCoursesContainer}>
            <BookIcon size={48} color={colors.lightGray} />
            <Text style={styles.emptyCoursesText}>
              You haven't enrolled in any courses yet
            </Text>
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
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
  emptyCoursesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 40,
  },
  emptyCoursesText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 16,
  },
});

export default MyCoursesScreen;