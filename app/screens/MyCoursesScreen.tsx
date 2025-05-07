import React, { useState, useEffect } from 'react';
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
import { getCourseListLevel } from '../services';

const MyCoursesScreen: React.FC = () => {
  const { user } = useUser();
  const [enrolledCourses, setEnrolledCourses] = useState<any[]>([]);
  const [inProgressCourses, setInProgressCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      // Placeholder: Fetch all courses (e.g., 'basic' as a demo)
      const resp = await getCourseListLevel('basic'); // Replace with actual enrolled courses endpoint
      const validCourses = resp.courses.filter((course) => course.banner?.url);
      setEnrolledCourses(validCourses);
      setInProgressCourses(validCourses.slice(0, 3)); // Demo: First 3 as in-progress
      setError(null);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Courses</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {inProgressCourses.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>In Progress</Text>
            <View style={styles.coursesList}>
              {inProgressCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isHorizontal={true}
                />
              ))}
            </View>
          </View>
        )}

        {enrolledCourses.length > 0 && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>All Enrolled Courses</Text>
            <View style={styles.coursesList}>
              {enrolledCourses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  isHorizontal={true}
                />
              ))}
            </View>
          </View>
        )}

        {enrolledCourses.length === 0 && (
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