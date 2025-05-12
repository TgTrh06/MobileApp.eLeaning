import { ViewStyle } from 'react-native';
import { courses } from './../data/courses';

export interface UserDetailVariables {
  email: string;
  point: number;
  userName: string;
  profileImage: string;
}

export interface User {
  detail: {
    id: string;
    email: string;
    point: number;
    userName: string;
    profileImage: string;
  }
}

export interface CourseProgress {
  completedChapters: string[];
  lastChapter: string;
  percentage: number;
}

export interface CategorySectionProps {
  title: string;
  level: string; // e.g., "Basic", "Moderate", "Advance"
  seeMoreEnabled?: boolean;
  containerStyle?: ViewStyle;
  horizontal?: boolean;
}

export interface Course {
  id: string;
  name: string;
  level: string;
  price: number;
  tags: string[] | string;
  time: string;
  author: string;
  description: {
    markdown: string;
  };
  banner?: {
    url: string;
  };
  chapters: Chapter[];
}

export interface Chapter {
  id: string;
  title: string;
  content: Content[];
}

export interface Content {
  id: string;
  heading: string;
  content: {
    markdown?: string; // Made optional
    html: string;
  };
  output: {
    markdown?: string; // Made optional
    html: string;
  } | null;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  passingScore: number; // percentage
  totalScore: number; // total score for the exam
  coursesCategory: string; // category of the course
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  selectedAnswer?: string; // for tracking user's answer
  isCorrect?: boolean; // for tracking if the answer is correct
  score: number; // score for the question
  isLocked?: boolean; // for tracking if the question is locked
  duration: number; // duration for the question
  examCategory: string; // category of the course
}


export interface CreateUserEnrolledResponse {
  createUserEnrolledCourse: { 
    id: string;
  };
}

export interface PublishUserEnrolledResponse {
  publishUserEnrolledCourse: {
    id: string;
  };
}

export interface EnrollCourseVariables {
  courseIdString: string;
  courseIdID: string;
  userEmail: string;
}

export interface UserEnrolledCourse {
    id: string;
    courseId: string;
    completedChapter: {
      chapterId: string;
    }[];
}

export type UserEnrolledCourses = UserEnrolledCourse[];

export interface UserEnrolledCourseList {
    userEnrolledCourses: UserEnrolledCourses;
}

export interface LeaderboardUser {
  id: string;
  name: string;
  points: number;
  avatar?: string;
  country?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  duration: "month" | "year";
  features: string[];
  pricePerMonth: number;
}

export type RootStackParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Register: undefined;
  Main: undefined;
  Home: undefined;
  CourseDetail: { course: Course };
  ChapterContent: { chapter: Chapter; enrollmentId: string};
  Profile: undefined;
  Leaderboard: undefined;
  Subscription: undefined;
  Achievement: { points: number, Coursecategory: string };
  CourseExam: { Coursecategory: string };
};
