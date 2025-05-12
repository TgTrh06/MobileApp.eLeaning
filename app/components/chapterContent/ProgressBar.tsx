import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/app/utils/colors";

interface Props {
  contentLength: number; // Updated type to number
  contentIndex: number;
}

const ChapterContent: React.FC<Props> = ({ contentLength, contentIndex }) => {
  // Create an array for segments (0 to contentLength - 1)
  const segments = Array.from({ length: contentLength }, (_, index) => index);

  // Calculate the width of a single block
  const segmentWidth = 100 / contentLength;

  return (
    <View style={styles.container}>
      {segments.map((_, index) => (
        <View
          key={index}
          style={{
            backgroundColor: `${
              index <= contentIndex ? colors.secondary : colors.gray
            }`,
            width: `${segmentWidth}%`,
            borderRadius: 10,
            height: 10,
            margin: 5,
            flex: 1,
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    padding: 10,
  },
});

export default ChapterContent;
