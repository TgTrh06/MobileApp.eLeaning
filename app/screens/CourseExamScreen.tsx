import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { exams } from '../data/exams';
import { colors } from '../utils/colors';
import { Exam, Question } from '../utils/types';
import { formatDuration } from '../utils/helpers';
import { useNavigation } from '@react-navigation/native';
import QuestionItem from '../components/QuestionAndAnswer';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';

const CourseExamScreen: React.FC = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

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

  const handleGoBack = () => {
    (navigation as any).navigate('MyCourses');
  };

  const renderQuestionItem = ({ item }: { item: Question }) => (
    <QuestionItem
      question={item}
      isCompleted={false} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Course Exams</Text>
      <Text style={styles.subHeader}>Questions</Text>
      <FlatList
        data={exams[0]?.questions} // Example: Display questions from the first exam
        keyExtractor={(item) => item.id}
        renderItem={renderQuestionItem}
        contentContainerStyle={styles.listContainer}
      />
      <TouchableOpacity
        style={styles.backButton}
        onPress={handleGoBack}
      >
        <Text style={styles.backButtonText}>
          Go Back to Courses
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
  examItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
  },
  examInfo: {
    flex: 1,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
  },
  examDescription: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  examMeta: {
    alignItems: 'flex-end',
  },
  examDuration: {
    fontSize: 14,
    color: colors.gray,
  },
  completedText: {
    fontSize: 14,
    color: colors.green,
    marginTop: 4,
  },
  pendingText: {
    fontSize: 14,
    color: colors.red,
    marginTop: 4,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
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
  backButton: {
    backgroundColor: colors.white,
    paddingVertical: 12,
    alignSelf: 'center',
    borderRadius: 24,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
});

export default CourseExamScreen;
