export interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  avatar?: string;
  enrolledCourses: string[];
  completedCourses: string[];
  progress: Record<string, CourseProgress>;
}

export interface CourseProgress {
  completedChapters: string[];
  lastChapter: string;
  percentage: number;
}

export interface Course {
  id: string;
  title: string;
  thumbnail: string;
  category: "Basic Courses" | "Advance Courses" | "Project & Video Courses";
  chaptersCount: number;
  duration: number;
  price: number | "Free";
  description: string;
  chapters: Chapter[];
  tags: string[];
}

export interface Chapter {
  id: string;
  title: string;
  duration: number;
  isLocked: boolean;
  content?: string;
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
  Main: undefined;
  Home: undefined;
  CourseDetail: { courseId: string };
  CourseContent: { courseId: string; chapterId: string };
  Profile: undefined;
  Leaderboard: undefined;
  Subscription: undefined;
  Achievement: { points: number };
};
