import { View, Text } from "react-native";
import React from "react";
import { useRoute, RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@/app/utils/types";
import { colors } from "../utils/colors";
import ChapterContent from "../components/chapterContent/ChapterContent";

type ChapterContentRouteProp = RouteProp<RootStackParamList, "ChapterContent">;

export default function ChapterContentScreen() {
  const route = useRoute<ChapterContentRouteProp>();
  const { contentList } = route.params;

// Validate content
  if (!contentList || !contentList[0].content?.markdown) {
    return (
      <View style={{ padding: 15 }}>
        <Text style={{ fontSize: 18, color: colors.red }}>
          Error: Invalid or missing chapter content
        </Text>
      </View>
    );
  }
  
  return (
    contentList && (
      <View style={{ padding: 15 }}>
        <ChapterContent contentList={contentList}/>
      </View>
    )
  );
}