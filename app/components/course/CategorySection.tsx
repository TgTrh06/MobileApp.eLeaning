import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../utils/colors';
import CourseCard from './CourseCard';
import { ChevronRightIcon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { getCourseListLevel } from '@/app/services';

interface CategorySectionProps {
  title: string;
  level: string; // e.g., "Basic", "Moderate", "Advance"
  seeAllEnabled?: boolean;
  containerStyle?: ViewStyle;
  horizontal?: boolean;
}

interface Course {
  id: string;
  name: string;
  level: string;
  price: number;
  tags: string[];
  time: string;
  author: string;
  banner: { url: string };
  chapters: { id: string }[];
}

const levelMap: Record<string, 'basic' | 'moderate' | 'advance'> = {
  Basic: 'basic',
  Moderate: 'moderate',
  Advance: 'advance',
};

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  level,
  seeAllEnabled = true,
  containerStyle,
  horizontal = true,
}) => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [level]);

  const fetchCourses = async () => {
    try {
      const apiLevel = levelMap[level] || undefined;
      if (!apiLevel) {
        console.warn('Invalid level value:', level);
        setCourses([]);
        setError('Invalid course level');
        return;
      }

      console.log(`Fetching courses for level: ${apiLevel}`);
      const resp = await getCourseListLevel(apiLevel);
      console.log('API Response:', JSON.stringify(resp, null, 2));

      if (!resp || !resp.courses || !Array.isArray(resp.courses)) {
        console.warn('No valid courses found:', resp);
        setCourses([]);
        setError('No courses found for this level');
        return;
      }

      setCourses(resp.courses);
      setError(null);
    } catch (error) {
      console.error('API Error:', error);
      setCourses([]);
      setError('Failed to fetch courses');
    }
  };

  const handleSeeAll = () => {
    console.log(`See all ${title}`);
    // Navigate to a filtered view (implement as needed)
    // navigation.navigate('CourseList', { level });
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {seeAllEnabled && (
          <TouchableOpacity style={styles.seeAllButton} onPress={handleSeeAll}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRightIcon size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : courses.length === 0 ? (
        <Text style={styles.errorText}>Loading courses...</Text>
      ) : (
        <FlatList
          data={courses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CourseCard course={item} isHorizontal={!horizontal} />
          )}
          horizontal={horizontal}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.coursesList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  coursesList: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  errorText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: 16,
  },
});

export default CategorySection;