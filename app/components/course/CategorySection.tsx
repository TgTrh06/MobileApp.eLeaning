import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../../utils/colors';
import CourseCard from './CourseCard';
import { ChevronRightIcon } from '../../assets/icons';
import { useNavigation } from '@react-navigation/native';
import { useCourses } from '../../context/CoursesContext';

interface CategorySectionProps {
  title: string;
  level: string; // e.g., "Basic", "Moderate", "Advance"
  seeAllEnabled?: boolean;
  containerStyle?: ViewStyle;
  horizontal?: boolean;
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
  const { allCourses, loading, error } = useCourses('');

  const filteredCourses = allCourses
    .filter((course) => levelMap[level] === course.level.toLowerCase())
    .slice(0, 5); // Limit to 5 courses

  const handleSeeAll = () => {
    (navigation as any).navigate('CourseList', {
      screen: 'CourseList',
      params: {
        level: levelMap[level],
        title,
      },
    });
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