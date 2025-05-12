import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/utils/types";
import { colors } from "../utils/colors";
import ChapterContent from "../components/chapterContent/ChapterContent";
import { MarkChapterComplete } from "../services";
import Toast from "react-native-toast-message";
import { useNavigation } from 'expo-router';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCompleteChapter } from "../context/CompleteChapterContext";
import { ScrollView } from "react-native-gesture-handler";
import { useUser } from "@clerk/clerk-expo";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

type ChapterContentRouteProp = RouteProp<RootStackParamList, "ChapterContent">;

export default function ChapterContentScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<ChapterContentRouteProp>();
  const { user } = useUser();
  const { chapter, enrollmentId } = route.params;
  
  const { isChapterComplete, markChapterComplete } = useCompleteChapter();

  const notify = (type: string, message: string) => {
    Toast.show({
      type: type, // info | success | error
      text1: message,
      position: 'bottom'
    });
  }

  useEffect(() => {
    console.log("ChapterId: ", chapter.id);
    console.log("EnrollmentId: ", enrollmentId);
  },[chapter])

  const onChapterFinish = () => {
    // const totalPoints = Number(userPoints) + chapter.content.lengtht*10;
    MarkChapterComplete(enrollmentId, chapter.id)
    .then(resp => {
      console.log(resp);
      if (resp) {
        notify('success', "Course Completed.")
        markChapterComplete();
      }
    })
    .catch(err => {
      console.error('Mutation error:', err);
    });
  }
  // Validate content and show notification
  if (!chapter.content || !chapter.content[0]?.content?.markdown) {
    useEffect(() => {
        notify('error', "Sorry, this chapter's content is unavailable.");
        navigation.goBack(); // Navigate back after showing the error
    }, [navigation, notify]); // Add navigation and notify to dependency array to avoid stale closures
  }
  
  return (
    chapter.content && (
      <ScrollView style={{ padding: 15 }}>
        <ChapterContent chapter={chapter} onChapterFinish={onChapterFinish}/>
      </ScrollView>
    )
  );
}