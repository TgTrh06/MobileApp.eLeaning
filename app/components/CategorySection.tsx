import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ViewStyle } from 'react-native';
import { colors } from '../utils/colors';
import { Course } from '../utils/types';
import CourseCard from './CourseCard';
import { ChevronRightIcon } from '../assets/icons';
import { useNavigation } from '@react-navigation/native';

interface CategorySectionProps {
  title: string;
  courses: Course[];
  seeAllEnabled?: boolean;
  containerStyle?: ViewStyle;
  horizontal?: boolean;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  courses,
  seeAllEnabled = true,
  containerStyle,
  horizontal = true,
}) => {
  const navigation = useNavigation();

  const handleSeeAll = () => {
    // Navigate to a filtered view of courses by category
    // This would be implemented in a real app
    console.log(`See all ${title}`);
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

      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CourseCard course={item} isHorizontal={!horizontal} />}
        horizontal={horizontal}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.coursesList}
      />
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
});

export default CategorySection;
