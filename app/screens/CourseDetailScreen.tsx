import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../utils/colors';
import { RootStackParamList } from '../utils/types';
import { useCourses } from '../context/CoursesContext';
import { useAuth } from '../context/AuthContext';
import { formatDuration, formatPrice } from '../utils/helpers';
import Header from '../components/Header';
import ChapterItem from '../components/ChapterItem';
import { BookIcon, ClockIcon } from '../assets/icons';

type CourseDetailScreenRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;

const CourseDetailScreen: React.FC = () => {
  const route = useRoute<CourseDetailScreenRouteProp>();
  const navigation = useNavigation();
  const { courseId } = route.params;
  const { getCourse } = useCourses();
  const { user } = useAuth();
  
  const [course, setCourse] = useState<any>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [progress, setProgress] = useState<{
    completedChapters: string[];
    percentage: number;
  }>({
    completedChapters: [],
    percentage: 0,
  });

  useEffect(() => {
    const courseData = getCourse(courseId);
    if (courseData) {
      setCourse(courseData);
    }
    
    // Check if user is enrolled
    if (user && user.enrolledCourses.includes(courseId)) {
      setIsEnrolled(true);
      
      // Get progress if any
      const userProgress = user.progress[courseId];
      if (userProgress) {
        setProgress({
          completedChapters: userProgress.completedChapters,
          percentage: userProgress.percentage,
        });
      }
    }
  }, [courseId, user]);

  const handleEnroll = () => {
    // This would typically make an API call
    // For now, we'll just navigate to the first chapter
    if (course && course.chapters.length > 0) {
      (navigation as any).navigate('CourseContent', {
        courseId: course.id,
        chapterId: course.chapters[0].id,
      });
    }
  };

  const handleChapterPress = (chapterId: string) => {
    (navigation as any).navigate('CourseContent', {
      courseId: course.id,
      chapterId,
    });
  };

  if (!course) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBack title="Course Details" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading course...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header showBack title="" />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: course.thumbnail }} style={styles.thumbnail} />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.thumbnailOverlay}
          />
          <View style={styles.courseInfoOverlay}>
            <Text style={styles.title}>{course.title}</Text>
            
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <BookIcon size={16} color={colors.white} />
                <Text style={styles.metaText}>{course.chaptersCount} Chapter</Text>
              </View>
              
              <View style={styles.metaItem}>
                <ClockIcon size={16} color={colors.white} />
                <Text style={styles.metaText}>{formatDuration(course.duration)}</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.contentContainer}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{course.description}</Text>
          </View>
          
          {isEnrolled && progress.percentage > 0 && (
            <View style={styles.progressContainer}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressText}>Progress</Text>
                <Text style={styles.progressPercentage}>{progress.percentage}%</Text>
              </View>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${progress.percentage}%` }
                  ]}
                />
              </View>
            </View>
          )}
          
          <View style={styles.chaptersContainer}>
            <Text style={styles.sectionTitle}>Chapters</Text>
            {course.chapters.map((chapter: any) => (
              <ChapterItem
                key={chapter.id}
                chapter={chapter}
                isCompleted={progress.completedChapters.includes(chapter.id)}
                onPress={() => handleChapterPress(chapter.id)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.bottomContainer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.priceValue}>{formatPrice(course.price)}</Text>
        </View>
        
        <TouchableOpacity
          style={styles.enrollButton}
          onPress={handleEnroll}
        >
          <Text style={styles.enrollButtonText}>
            {isEnrolled ? 'Continue Learning' : 'Enroll Now'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  thumbnailContainer: {
    position: 'relative',
    height: 240,
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  thumbnailOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  courseInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: colors.white,
    marginLeft: 6,
  },
  contentContainer: {
    padding: 16,
  },
  descriptionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: colors.textSecondary,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  progressPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  chaptersContainer: {
    marginBottom: 80,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  priceContainer: {
    flex: 1,
  },
  priceLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  priceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  enrollButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  enrollButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
});

export default CourseDetailScreen;
