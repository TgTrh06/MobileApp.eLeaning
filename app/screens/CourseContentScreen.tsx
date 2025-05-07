import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../utils/colors";
import { RootStackParamList, Chapter } from "../utils/types";
import { useCourses } from "../context/CoursesContext";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import { ChevronRightIcon, CheckIcon } from "../assets/icons";
import { SignedIn } from "@clerk/clerk-expo";

type CourseContentScreenRouteProp = RouteProp<
  RootStackParamList,
  "CourseContent"
>;

const CourseContentScreen: React.FC = () => {
  const route = useRoute<CourseContentScreenRouteProp>();
  const navigation = useNavigation();
  const { courseId, chapterId } = route.params;
  const { getCourse } = useCourses();
  const { user, updateUserPoints, updateUserProgress } = useAuth();

  const [course, setCourse] = useState<any>(null);
  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [nextChapter, setNextChapter] = useState<Chapter | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const courseData = getCourse(courseId);
    if (courseData) {
      setCourse(courseData);

      // Find current chapter
      const currentChapter = courseData.chapters.find(
        (ch: any) => ch.id === chapterId
      );
      if (currentChapter) {
        setChapter(currentChapter);

        // Find next chapter
        const currentIndex = courseData.chapters.findIndex(
          (ch: any) => ch.id === chapterId
        );
        if (
          currentIndex !== -1 &&
          currentIndex < courseData.chapters.length - 1
        ) {
          setNextChapter(courseData.chapters[currentIndex + 1]);
        }
      }

      // Check if chapter is already completed
      if (user && user.progress[courseId]) {
        setIsCompleted(
          user.progress[courseId].completedChapters.includes(chapterId)
        );
      }
    }
  }, [courseId, chapterId, user]);

  const handleMarkAsCompleted = () => {
    // Update progress
    updateUserProgress(courseId, chapterId);
    setIsCompleted(true);

    // Add points for completing the chapter
    updateUserPoints(10);

    // Show achievement if needed
    // For now, we'll just update the UI
    setTimeout(() => {
      (navigation as any).navigate("Achievement", {
        points: 10,
        Coursecategory: course.category,
      });
    }, 500);
  };

  const handleNextChapter = () => {
    if (nextChapter) {
      (navigation as any).navigate("CourseContent", {
        courseId,
        chapterId: nextChapter.id,
      });
    } else {
      // If no next chapter, go back to course details
      (navigation as any).navigate("CourseDetail", { courseId });
    }
  };

  if (!course || !chapter) {
    return (
      <SafeAreaView style={styles.container}>
        <Header showBack title="Loading..." />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading content...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SignedIn>
      <SafeAreaView style={styles.container}>
        <Header showBack title={course.title} />

        <ScrollView style={styles.contentScroll}>
          <View style={styles.chapterHeader}>
            <Text style={styles.chapterTitle}>{chapter.title}</Text>
          </View>

          <View style={styles.contentContainer}>
            {chapter.content ? (
              <Text style={styles.contentText}>{chapter.content}</Text>
            ) : (
              <View style={styles.placeholderContent}>
                <Text style={styles.placeholderText}>
                  This chapter's content would be displayed here. It could
                  include:
                </Text>
                <Text style={styles.placeholderBullet}>• Video tutorials</Text>
                <Text style={styles.placeholderBullet}>
                  • Interactive code examples
                </Text>
                <Text style={styles.placeholderBullet}>
                  • Step-by-step instructions
                </Text>
                <Text style={styles.placeholderBullet}>
                  • Practice exercises
                </Text>
              </View>
            )}
          </View>
        </ScrollView>

        <View style={styles.bottomContainer}>
          {isCompleted ? (
            <View style={styles.completedContainer}>
              <CheckIcon size={20} color={colors.success} />
              <Text style={styles.completedText}>Completed</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.completeButton}
              onPress={handleMarkAsCompleted}
            >
              <Text style={styles.completeButtonText}>Mark as Completed</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.nextButton, !nextChapter && styles.finishButton]}
            onPress={handleNextChapter}
          >
            <Text style={styles.nextButtonText}>
              {nextChapter ? "Next Chapter" : "Finish Course"}
            </Text>
            {nextChapter && <ChevronRightIcon size={20} color={colors.white} />}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </SignedIn>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  contentScroll: {
    flex: 1,
  },
  chapterHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  chapterTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.white,
  },
  contentContainer: {
    padding: 16,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
  },
  placeholderContent: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  placeholderText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
    marginBottom: 16,
  },
  placeholderBullet: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textPrimary,
    marginLeft: 16,
    marginBottom: 8,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    padding: 16,
  },
  completedContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  completedText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.success,
    marginLeft: 8,
  },
  completeButton: {
    backgroundColor: colors.success,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  completeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  finishButton: {
    backgroundColor: colors.secondary,
  },
  nextButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.white,
    marginRight: 4,
  },
});

export default CourseContentScreen;
