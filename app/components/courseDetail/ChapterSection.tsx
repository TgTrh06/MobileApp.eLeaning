import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Chapter, RootStackParamList, UserEnrolledCourses, Content } from "@/app/utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LockIcon, PlayIcon } from "@/app/assets/icons";
import Toast from "react-native-toast-message";
import { useNavigation } from "expo-router";
import { colors } from "@/app/utils/colors";

interface Props {
  chapterList: Chapter[];
  userEnrolledCourses: UserEnrolledCourses;
}

// Define navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChapterSection: React.FC<Props> = ({ chapterList, userEnrolledCourses }) => {
  const navigation = useNavigation<NavigationProp>();
  
  const notify = (type: string, message: string) => {
    Toast.show({
      type: type, // info | success | error
      text1: message,
      position: 'bottom'
    });
  }

  const OnChapterPress = (contentList: Content[]) => {
    if (userEnrolledCourses.length === 0) {
      notify("error", "Please Enroll First!");
      return;
    }

    navigation.navigate('ChapterContent', { contentList });
  };
  
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
            onPress={() => OnChapterPress(item.content)}
          >
            <View style={styles.chapterContainer}>
              <View style={styles.textContainer} key={index}>
                <Text style={styles.numberFont}>{index + 1}</Text>
                <Text style={styles.textFont}>{item.title}</Text>
              </View>
              <View>
                {userEnrolledCourses.length == 0 ? (
                  <LockIcon size={26} color={colors.gray} />
                ) : (
                  <PlayIcon size={18} color={colors.gray} />
                )}
              </View>
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
  chapterContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    gap: 10,
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    borderColor: colors.gray,
  },
  textContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  numberFont: {
    fontSize: 22,
    fontWeight: 700,
    color: colors.gray,
  },
  textFont: {
    fontSize: 18,
    fontWeight: 400,
    color: colors.gray,
  },
});

export default ChapterSection;
