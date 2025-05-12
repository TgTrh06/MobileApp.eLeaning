import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/colors";
import { ClockIcon, BookIcon } from "../../assets/icons";
import { Course, RootStackParamList } from "@/app/utils/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface CourseCardProps {
  course: Course;
  isHorizontal?: boolean;
  showPrice?: boolean;
}

// Define navigation prop type
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  isHorizontal = false,
  showPrice = true,
}) => {
  const navigation = useNavigation<NavigationProp>();

  const handlePress = () => {
    (navigation as any).navigate("CourseDetail", { course });
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isHorizontal ? styles.horizontalContainer : styles.verticalContainer,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: course.banner?.url }}
        style={{
          width: isHorizontal ? 90 : "100%",
          height: isHorizontal ? 90 : 100,
          resizeMode: "cover",
        }}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={2}>
          {course.name}
        </Text>
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <BookIcon size={14} color={colors.darkGray} />
            <Text style={styles.metaText}>
              {course.chapters.length} Chapter
            </Text>
          </View>
          <View style={styles.metaItem}>
            <ClockIcon size={14} color={colors.darkGray} />
            <Text style={styles.metaText}>{course.time}</Text>
          </View>
        </View>
        {showPrice && (
          <View
            style={[
              styles.priceTag,
              course.price === 0 ? styles.freeTag : styles.paidTag,
            ]}
          >
            <Text
              style={[
                styles.priceText,
                course.price === 0 ? styles.freeText : styles.paidText,
              ]}
            >
              {course.price === 0 ? "Free" : `$${course.price}`}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    margin: 8,
  },
  verticalContainer: {
    width: 180,
    height: 220,
  },
  horizontalContainer: {
    width: '100%',
    height: 200,
    // flexDirection: "row",
  },
  infoContainer: {
    padding: 12,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
  },
  priceTag: {
    position: "absolute",
    bottom: 12,
    right: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  freeTag: {
    backgroundColor: "rgba(46, 204, 113, 0.2)",
  },
  paidTag: {
    backgroundColor: "rgba(52, 152, 219, 0.2)",
  },
  priceText: {
    fontSize: 12,
    fontWeight: "600",
  },
  freeText: {
    color: colors.success,
  },
  paidText: {
    color: colors.info,
  },
});

export default CourseCard;
