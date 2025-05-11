import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { getCourseListLevel } from "../services";
import { Course } from "../utils/types";

import {
  courses,
  getBasicCourses,
  getAdvancedCourses,
  getProjectCourses,
  getCourseById,
} from "../data/courses";


interface CoursesContextType {
  allCourses: Course[];
  searchResults: Course[];
  enrolledCourses: Course[];
  inProgressCourses: Course[];
  loading: boolean;
  error: string | null;
  fetchCourses: () => Promise<void>;
  searchCourses: (query: string) => void;
  fetchEnrolledCourses: (userId: string) => Promise<void>;
}

// interface CoursesContextType {
//   allCourses: Course[];
//   basicCourses: Course[];
//   advancedCourses: Course[];
//   projectCourses: Course[];
//   enrolledCourses: Course[];
//   inProgressCourses: Course[];
//   getCourse: (id: string) => Course | undefined;
//   enrollInCourse: (courseId: string) => void;
//   searchCourses: (query: string) => Course[];
// }

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [allCourses, setAllCourses] = useState<Course[]>([]);
  // const [basicCourses] = useState<Course[]>(getBasicCourses());
  // const [advancedCourses] = useState<Course[]>(getAdvancedCourses());
  // const [projectCourses] = useState<Course[]>(getProjectCourses());
  const [searchResults, setSearchResults] = useState<Course[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [inProgressCourses, setInProgressCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const levels = ["basic", "moderate", "advance"];
      let courses: Course[] = [];

      for (const level of levels) {
        const resp = await getCourseListLevel(level);
        courses = [...courses, ...resp.courses];
      }

      const validCourses = courses.filter((course) => course.banner?.url);
      setAllCourses(validCourses);
      setError(null);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const searchCourses = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const filteredCourses = allCourses
      .filter((course) => course.banner?.url)
      .filter((course) => {
        const q = query.toLowerCase();
        const tags = Array.isArray(course.tags)
          ? course.tags
          : typeof course.tags === "string"
          ? course.tags.split(",").map((tag) => tag.trim())
          : [];
        return (
          course.name.toLowerCase().includes(q) ||
          tags.some((tag) => tag.toLowerCase().includes(q)) ||
          course.author.toLowerCase().includes(q) ||
          course.level.toLowerCase().includes(q)
        );
      });

    setSearchResults(filteredCourses);
  };

  const fetchEnrolledCourses = async (userId: string) => {
    try {
      setLoading(true);
      // Placeholder: Fetch enrolled courses (e.g., from 'basic' as a demo)
      const resp = await getCourseListLevel("basic"); // Replace with actual endpoint
      const validCourses = resp.courses.filter((course) => course.banner?.url);
      setEnrolledCourses(validCourses);
      setInProgressCourses(validCourses.slice(0, 3)); // Demo: First 3 as in-progress
      setError(null);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      setError("Failed to load enrolled courses");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider
      value={{
        allCourses,
        searchResults,
        enrolledCourses,
        inProgressCourses,
        loading,
        error,
        fetchCourses,
        searchCourses,
        fetchEnrolledCourses,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = (p0: string) => {
  const context = useContext(CoursesContext);
  if (!context) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};