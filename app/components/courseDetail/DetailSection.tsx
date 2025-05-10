import {
  View,
  Text,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "@/app/utils/colors";
import {
  BarChartIcon,
  BookIcon,
  ClockIcon,
  CrownIcon,
  SmileIcon,
} from "@/app/assets/icons";
import { Course } from "@/app/utils/types";

export default function DetailSection({ course }: { course: Course }) {
  return (
    <View
      style={{ padding: 10, borderRadius: 15, backgroundColor: colors.white }}
    >
      <Image
        source={{ uri: course?.banner?.url }}
        style={{
          width: '100%',
          height: 190,
          borderRadius: 15,
        }}
      />

      <View style={{ padding: 10 }}>
        <Text style={styles.courseName}>{course.name}</Text>
        <View style={styles.rowItem}>
          <View style={styles.metaItem}>
            <BookIcon size={18} color={colors.black} />
            <Text style={styles.metaText}>
              {course.chapters.length} {course.chapters.length === 1 ? "Chapter" : "Chapters"}
            </Text>
          </View>
          <View style={styles.metaItem}>
            <ClockIcon size={18} color={colors.black} />
            <Text style={styles.metaText}>{course.time}</Text>
          </View>
        </View>
        <View style={styles.rowItem}>
          <View style={styles.metaItem}>
            <SmileIcon size={18} color={colors.black} />
            <Text style={styles.metaText}>{course.author}</Text>
          </View>
          <View style={styles.metaItem}>
            <BarChartIcon size={18} color={colors.black} />
            <Text style={styles.metaText}>{course.level}</Text>
          </View>
        </View>
      </View>
        <View
          style={{
            height: 1,
            backgroundColor: colors.primary,
            marginVertical: 6,
            marginHorizontal: 10,
          }}
        />
      <View style={{ marginVertical: 10, paddingHorizontal: 4 }}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionInfo}>
          {course?.description?.markdown}
        </Text>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          gap: 10,
          marginBottom: 6
        }}
      >
        <TouchableOpacity style={styles.enrollButtonPr}>
          <Text style={styles.enrollText}>Enroll for free</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.enrollButtonSe}>
          <CrownIcon size={18} color={colors.yellow}/>
          <Text style={styles.enrollText}>Membership</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  courseName: {
    fontSize: 22,
    marginTop: 10,
    marginBottom: 10,
    fontWeight: 600, 
  },
  rowItem: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  metaItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 5,
    marginBottom: 5,
  },
  metaText: {
    fontSize: 16,
  },
  descriptionTitle: {
    fontSize: 20,
    fontWeight: 600, 
    padding: 5 
  },
  descriptionInfo: {
    fontSize: 16,
    color: colors.darkGray,
    lineHeight: 24,
    padding: 5,
  },
  enrollButtonPr: {
    padding: 16,
    backgroundColor: colors.primary,
    borderRadius: 15,
    width: '44%',
    alignItems: 'center',
  },
  enrollButtonSe: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 16,
    backgroundColor: colors.secondary,
    borderRadius: 15,
    width: '50%',
    alignItems: 'center',
  },
  enrollText: {
    color: colors.white,
    alignItems: "center",
    fontSize: 15,
    fontWeight: 600, 
  },
});
