import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { colors } from '../utils/colors';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CoursesContext';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import CategorySection from '../components/CategorySection';
import CourseCard from '../components/CourseCard';

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const { 
    basicCourses, 
    advancedCourses, 
    projectCourses,
    inProgressCourses,
    searchCourses
  } = useCourses();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      const results = searchCourses(searchQuery);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  // Display welcome text with user name
  const welcomeText = `Welcome, ${user?.name || 'Student'}`;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="" />
      
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>{welcomeText}</Text>
      </View>
      
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmit={handleSearch}
      />
      
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {isSearching ? (
          <View style={styles.searchResultsContainer}>
            <View style={styles.searchHeaderContainer}>
              <Text style={styles.searchResultsTitle}>
                Search Results ({searchResults.length})
              </Text>
              <TouchableOpacity onPress={clearSearch}>
                <Text style={styles.clearSearchText}>Clear</Text>
              </TouchableOpacity>
            </View>
            
            {searchResults.length > 0 ? (
              <View style={styles.searchResultsList}>
                {searchResults.map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    isHorizontal={true} 
                  />
                ))}
              </View>
            ) : (
              <View style={styles.noResultsContainer}>
                <Text style={styles.noResultsText}>
                  No courses found for "{searchQuery}"
                </Text>
              </View>
            )}
          </View>
        ) : (
          <>
            {inProgressCourses.length > 0 && (
              <View style={styles.inProgressContainer}>
                <Text style={styles.sectionTitle}>In Progress</Text>
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.progressCoursesContainer}
                >
                  {inProgressCourses.map((course) => (
                    <CourseCard key={course.id} course={course} showPrice={false} />
                  ))}
                </ScrollView>
              </View>
            )}
            
            <CategorySection
              title="Basic Courses"
              courses={basicCourses}
            />
            
            <CategorySection
              title="Advance Courses"
              courses={advancedCourses}
            />
            
            <CategorySection
              title="Project & Video Courses"
              courses={projectCourses}
            />
          </>
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
  welcomeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  inProgressContainer: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginLeft: 16,
    marginBottom: 8,
  },
  progressCoursesContainer: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  searchResultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  searchHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  clearSearchText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  searchResultsList: {
    flex: 1,
  },
  noResultsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  noResultsText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default HomeScreen;
