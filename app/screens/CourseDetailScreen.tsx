import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { Course } from "../utils/types";
import { BackIcon } from "../assets/icons";
import DetailSection from "../components/courseDetail/DetailSection";
import ChapterSection from "../components/courseDetail/ChapterSection";
import { colors } from "../utils/colors";
import { ScrollView } from "react-native-gesture-handler";

export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const params = useRoute().params as { course: Course };

  useEffect(() => {
    console.log("Course params:", params?.course);
  }, [params.course]);

  return (
    params.course && (
      <SafeAreaView style={{ padding: 20, marginTop: 20, marginBottom: 32 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
            <BackIcon size={40} color={colors.black} />
        </TouchableOpacity>
        <ScrollView showsVerticalScrollIndicator={false}>
          <DetailSection course={params.course} />
          <ChapterSection chapterList={params.course.chapters || []} />
        </ScrollView>
      </SafeAreaView>
    )
  );
}