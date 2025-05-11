import { colors } from "@/app/utils/colors";
import React, { useState } from "react";
import {
  View,
  Text,
  useWindowDimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import RenderHtml from "react-native-render-html";

interface Props {
  description: string;
  output?: string;
}
const ContentItem: React.FC<Props> = ({ description, output }) => {
  const { width } = useWindowDimensions();
  const [isRun, setIsRun] = useState(false);
  const descriptionSource = {
    html: description,
  };
  const outputSource = {
    html: output || "",
  };

  return (
    description && (
      <View>
        <RenderHtml
          contentWidth={width}
          source={descriptionSource}
          tagsStyles={descriptionStyles}
        />

        {output != null ? (
          <TouchableOpacity
            onPress={() => setIsRun(true)}
            style={styles.runBtnContainer}
          >
            <Text style={styles.runBtn}>Run</Text>
          </TouchableOpacity>
        ) : null}

        {isRun ? (
          <>
            <Text style={styles.outputFont}>Output</Text>
            <RenderHtml
              contentWidth={width}
              source={outputSource}
              tagsStyles={outputStyles}
            />
          </>
        ) : null}
      </View>
    )
  );
};

const descriptionStyles = {
  body: {
    fontSize: 16,
  },
  code: {
    backgroundColor: colors.black,
    color: colors.white,
    padding: 20,
    borderRadius: 15,
  },
};

const outputStyles = {
  body: {
    fontSize: 16,
    backgroundColor: colors.black,
    color: colors.white,
    padding: 10,
    borderRadius: 15,
  },
  code: {
    backgroundColor: colors.black,
    color: colors.white,
    padding: 10,
    borderRadius: 15,
  },
};

const styles = StyleSheet.create({
  runBtnContainer: {
    marginVertical: 10,
  },
  runBtn: {
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: 100,
    fontSize: 16,
    color: colors.white,
    textAlign: "center",
  },
  outputFont: {
    fontSize: 18,
    fontWeight: 600,
    marginVertical: 10,
  },
});
export default ContentItem;
