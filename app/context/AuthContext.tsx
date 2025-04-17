import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../utils/types';
import { currentUser } from '../data/users';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserPoints: (points: number) => void;
  updateUserProgress: (courseId: string, chapterId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate credentials with an API
    // For now, we'll simulate a successful login with the mock user
    setUser(currentUser);
    setIsLoggedIn(true);
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  const updateUserPoints = (points: number) => {
    if (user) {
      setUser({
        ...user,
        points: user.points + points
      });
    }
  };

  const updateUserProgress = (courseId: string, chapterId: string) => {
    if (user) {
      const courseProgress = user.progress[courseId] || {
        completedChapters: [],
        lastChapter: '',
        percentage: 0
      };

      // Only add chapter if not already completed
      if (!courseProgress.completedChapters.includes(chapterId)) {
        const updatedCompletedChapters = [...courseProgress.completedChapters, chapterId];
        
        // Get the course to calculate percentage
        const course = require('../data/courses').getCourseById(courseId);
        const percentage = course 
          ? Math.round((updatedCompletedChapters.length / course.chapters.length) * 100)
          : courseProgress.percentage;

        const updatedProgress = {
          ...user.progress,
          [courseId]: {
            completedChapters: updatedCompletedChapters,
            lastChapter: chapterId,
            percentage
          }
        };

        // Update user with new progress
        setUser({
          ...user,
          progress: updatedProgress,
          // If all chapters are completed, add to completedCourses
          completedCourses: percentage === 100 && !user.completedCourses.includes(courseId)
            ? [...user.completedCourses, courseId]
            : user.completedCourses
        });
      }
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoggedIn, 
      login, 
      logout, 
      updateUserPoints,
      updateUserProgress
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
