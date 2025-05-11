import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import Toast from 'react-native-toast-message';
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { Course, UserEnrolledCourses } from "../utils/types";
import { BackIcon } from "../assets/icons";
import DetailSection from "../components/courseDetail/DetailSection";
import ChapterSection from "../components/courseDetail/ChapterSection";
import { colors } from "../utils/colors";
import { ScrollView } from "react-native-gesture-handler";
import { enrollCourse, getUserEnrollCourse } from "../services";
import { useUser } from "@clerk/clerk-expo";

export default function CourseDetailScreen() {
  const navigation = useNavigation();
  const params = useRoute().params as { course: Course };
  const [userEnrolledCourseList, setUserEnrolledCourse] = useState<UserEnrolledCourses>([]);
  const {user} = useUser();

  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const courseId = params?.course?.id;
    
  const notify = (type: string, message: string) => {
    Toast.show({
      type: type, // info | success | error
      text1: message,
      position: 'bottom'
    });
  }

  useEffect(() => {
    console.log("Course params:", params?.course);
    if (user&&params.course) {
      GetUserEnrolledCourse();
    }
  }, [params.course]);

  const UserEnrollCourse = () => {    
    
    if (!userEmail) {
      console.error("User email address is undefined");
      return;
    } 

    if (!courseId) {
      console.error("Course ID is undefined");
      return;
    } 
    
    enrollCourse(courseId, userEmail)
    .then (resp => {
      console.log("Enroll response:", resp);
      if (resp) {
        GetUserEnrolledCourse(); // Relooad after enrolling
        notify("success", "Successfully enrolled in the course!"); // Show success message
      }
    })
    .catch((error) => {
      console.error("Enroll error:", error);
      notify("error", "An error occurred while enrolling. Please try again."); // Show error message
    });
  }

  const GetUserEnrolledCourse = () => {
    
    if (!userEmail) {
      console.error("User email address is undefined");
      return;
    } 

    if (!courseId) {
      console.error("Course ID is undefined");
      return;
    } 

    getUserEnrollCourse(courseId, userEmail)
    .then (resp => {
      console.log("User enrolled coures:", resp.userEnrolledCourses);
      setUserEnrolledCourse(resp.userEnrolledCourses);
    })
    .catch((error) => {
      console.error("Enroll error:", error);
    });
  }

  return (
    params.course && (
      <SafeAreaView style={{ padding: 20, marginTop: 10 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
            <BackIcon size={40} color={colors.black} />
        </TouchableOpacity>
        <ScrollView 
          showsVerticalScrollIndicator={false}
        >
          <DetailSection 
            course={params.course} 
            userEnrolledCourses={userEnrolledCourseList}
            enrollCourse={UserEnrollCourse}
          />
          <ChapterSection 
            chapterList={params.course.chapters || []}
            userEnrolledCourses={userEnrolledCourseList}
          />
        </ScrollView>
      </SafeAreaView>
    )
  );
}