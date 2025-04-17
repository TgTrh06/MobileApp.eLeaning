import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import { colors } from '../utils/colors';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CoursesContext';
import Header from '../components/Header';
import CourseCard from '../components/CourseCard';
import { BookIcon } from '../assets/icons';

const MyCoursesScreen: React.FC = () => {
  const { user } = useAuth();
  const { enrolledCourses, inProgressCourses } = useCourses();
  
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