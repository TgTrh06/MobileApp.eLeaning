import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { colors } from "@/app/utils/colors";

interface Props {
  contentLength: number; // Updated type to number
  contentIndex: number;
}

const ChapterContent: React.FC<Props> = ({ contentLength, contentIndex }) => {
  // Define an Array from 1 -> contentLength
  const arraySize = Array.from(
    { length: contentLength },
    (_, index) => index + 1
  );

  // Calculate the width of a single block
  const width = 100 / contentLength;

  return (
    <View style={styles.container}>
      {arraySize.map((item, index) => (
        <View 
            style={{
                backgroundColor: `${index <= contentIndex ? colors.secondary : colors.gray}`,
                width: `${width}%`,
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

const styles = StyleSheet.create ({
    container: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginTop: 20,
        padding: 10
    },
}) 
export default ChapterContent;
