import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Course } from '../utils/types';
import { 
  courses, 
  getBasicCourses, 
  getAdvancedCourses, 
  getProjectCourses,
  getCourseById
} from '../data/courses';
import { useAuth } from './AuthContext';

interface CoursesContextType {
  allCourses: Course[];
  basicCourses: Course[];
  advancedCourses: Course[];
  projectCourses: Course[];
  enrolledCourses: Course[];
  inProgressCourses: Course[];
  getCourse: (id: string) => Course | undefined;
  enrollInCourse: (courseId: string) => void;
  searchCourses: (query: string) => Course[];
}

const CoursesContext = createContext<CoursesContextType | undefined>(undefined);

export const CoursesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [allCourses] = useState<Course[]>(courses);
  const [basicCourses] = useState<Course[]>(getBasicCourses());
  const [advancedCourses] = useState<Course[]>(getAdvancedCourses());
  const [projectCourses] = useState<Course[]>(getProjectCourses());
  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [inProgressCourses, setInProgressCourses] = useState<Course[]>([]);

  useEffect(() => {
    if (user) {
      // Get enrolled courses
      const enrolled = allCourses.filter(course => 
        user.enrolledCourses.includes(course.id)
      );
      setEnrolledCourses(enrolled);

      // Get in-progress courses (enrolled but not completed)
      const inProgress = enrolled.filter(course => 
        !user.completedCourses.includes(course.id) && 
        user.progress[course.id]?.percentage > 0
      );
      setInProgressCourses(inProgress);
    } else {
      setEnrolledCourses([]);
      setInProgressCourses([]);
    }
  }, [user, allCourses]);

  const getCourse = (id: string): Course | undefined => {
    return getCourseById(id);
  };

  const enrollInCourse = (courseId: string) => {
    // This would typically involve an API call
    // For now, we'll just update our local state via AuthContext
    if (user && !user.enrolledCourses.includes(courseId)) {
      // Would update via auth context in a real implementation
      console.log(`Enrolled in course: ${courseId}`);
    }
  };

  const searchCourses = (query: string): Course[] => {
    if (!query.trim()) return [];
    
    const lowercaseQuery = query.toLowerCase().trim();
    return allCourses.filter(course => 
      course.title.toLowerCase().includes(lowercaseQuery) ||
      course.description.toLowerCase().includes(lowercaseQuery) ||
      course.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  return (
    <CoursesContext.Provider value={{
      allCourses,
      basicCourses,
      advancedCourses,
      projectCourses,
      enrolledCourses,
      inProgressCourses,
      getCourse,
      enrollInCourse,
      searchCourses
    }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => {
  const context = useContext(CoursesContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};
