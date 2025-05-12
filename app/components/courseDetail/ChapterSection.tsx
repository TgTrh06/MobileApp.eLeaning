import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { Chapter, RootStackParamList, UserEnrolledCourse, UserEnrolledCourses } from "@/app/utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CheckIcon, LockIcon, PlayIcon } from "@/app/assets/icons";
import Toast from "react-native-toast-message";
import { useNavigation } from "expo-router";
import { colors } from "@/app/utils/colors";
import { useCompleteChapter } from "@/app/context/CompleteChapterContext";

interface Props {
  chapterList: Chapter[];
  userEnrolledCourses: UserEnrolledCourses;
}

// Define navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChapterSection: React.FC<Props> = ({ chapterList, userEnrolledCourses }) => {
  const navigation = useNavigation<NavigationProp>();
  const { isChapterComplete, markChapterComplete, setIsChapterComplete } = useCompleteChapter();

  const notify = (type: string, message: string) => {
    Toast.show({
      type: type, // info | success | error
      text1: message,
      position: 'bottom'
    });
  }

  const onChapterPress = (chapter: Chapter) => {
    if (userEnrolledCourses.length === 0) {
      notify("error", "Please Enroll First!");
      return;
    }

    setIsChapterComplete(false);
    navigation.navigate('ChapterContent', { 
      chapter: chapter,
      enrollmentId: userEnrolledCourses?.[0].id 
    });
  };
  
    const checkIsChapterCompleted = (chapterId: string) => {
      if (!userEnrolledCourses || userEnrolledCourses.length === 0 || !userEnrolledCourses[0]?.completedChapter) {
        return false;
      }
      const isCompleted = userEnrolledCourses[0].completedChapter
      .find(item => item.chapterId == chapterId)
      console.log('User enrolled courses: ', isCompleted);
      return isCompleted;
    }

  if (!chapterList || chapterList.length === 0) {
    return (    
      <View style={styles.chapterSection}>
        <Text style={styles.chapterUnavailable}>No chapters available</Text>
      </View>
    );
  }

  return (
    chapterList && (    
      <View style={styles.chapterSection}>
        <Text style={styles.titleFont}>Chapters</Text>
        {chapterList.map((item, index) => (
          <TouchableOpacity
            style={[checkIsChapterCompleted(item.id)
                ?styles.chapterContainerCompleted
                :styles.chapterContainerIncompleted]}
            onPress={() => onChapterPress(item)}
          >
              <View style={styles.textContainer} key={index}>
                {checkIsChapterCompleted(item.id)
                  ? <Text style={styles.numberFontCompleted}><CheckIcon size={18} color={colors.green}/></Text>
                  : <Text style={styles.numberFontInCompleted}>{index + 1}</Text>}
              
                <Text
                style={[checkIsChapterCompleted(item.id)
                    ?styles.textFontCompleted
                    :styles.textFontInCompleted]}>{item.title}</Text>
              </View>
              <View>
                {userEnrolledCourses.length == 0 ? (
                  <LockIcon size={26} color={colors.gray} />
                ) : (
                  <PlayIcon size={18} color={checkIsChapterCompleted(item.id) ? colors.green : colors.gray} />
                )}
              </View>
          </TouchableOpacity>
        ))}
      </View>
    )
  );
}

const styles = StyleSheet.create({
  chapterSection: {
    padding: 15,
    marginTop: 20,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  chapterUnavailable: {
    padding: 30,
    fontSize: 24,
    fontWeight: 700,
  },
  titleFont: {
    fontSize: 20,
    fontWeight: 600,
    padding: 5,
  },
  chapterContainerIncompleted: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: colors.darkGray,
  },
  chapterContainerCompleted: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: colors.green,
    backgroundColor: colors.lightGreen,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  numberFontInCompleted: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.gray,
  },
  textFontInCompleted: {
    fontSize: 18,
    fontWeight: 400,
    color: colors.gray,
  },
  numberFontCompleted: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.green,
  },
  textFontCompleted: {
    fontSize: 18,
    fontWeight: 400,
    color: colors.green,
  },
});

export default ChapterSection;
