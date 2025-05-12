import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../utils/colors';
import CourseCard from './CourseCard';
import { ChevronRightIcon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useCourses } from '../../context/CoursesContext';
import { CategorySectionProps } from '@/app/utils/types';

const levelMap: Record<string, 'basic' | 'moderate' | 'advance'> = {
  Basic: 'basic',
  Moderate: 'moderate',
  Advance: 'advance',
};

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  level,
  seeMoreEnabled = true,
  containerStyle,
  horizontal = true,
}) => {
  const navigation = useNavigation();
  const { allCourses, loading, error } = useCourses('');
  const [numberOfCourses, setNumberOfCourses] = useState(5);
  const [filteredCourses, setFilteredCourses] = useState(allCourses
    .filter((course) => levelMap[level] === course.level.toLowerCase())
    .slice(0, 5));

  useEffect(() => {
    setFilteredCourses(allCourses
      .filter((course) => levelMap[level] === course.level.toLowerCase())
      .slice(0, numberOfCourses));
  }, [allCourses, level, numberOfCourses]);

  const handleSeeMore = () => {
    setNumberOfCourses(numberOfCourses + 5);
    setFilteredCourses(allCourses
    .filter((course) => levelMap[level] === course.level.toLowerCase())
    .slice(0, numberOfCourses));
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {seeMoreEnabled && (
          <TouchableOpacity style={styles.seeMoreButton} onPress={handleSeeMore}>
            <Text style={styles.seeMoreText}>See More</Text>
            <ChevronRightIcon size={16} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {loading ? (
        <Text style={styles.errorText}>Loading courses...</Text>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : filteredCourses.length === 0 ? (
        <Text style={styles.errorText}>No courses found for this level</Text>
      ) : (
        <FlatList
          data={filteredCourses}
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
  seeMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeMoreText: {
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