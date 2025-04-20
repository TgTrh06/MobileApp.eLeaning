import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User } from '../utils/types';
import { currentUser } from '../data/users';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserPoints: (points: number) => void;
  updateUserProgress: (courseId: string, chapterId: string) => void;
}

const AUTH_STORAGE_KEY = 'codebox_auth_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load user data from AsyncStorage on startup
  useEffect(() => {
    const loadUserFromStorage = async () => {
      try {
        const userJson = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        if (userJson) {
          const userData = JSON.parse(userJson);
          setUser(userData);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to load user data from storage', error);
      } finally {
        setIsInitialized(true);
      }
    };

    loadUserFromStorage();
  }, []);

  // Save user data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveUserToStorage = async () => {
      try {
        if (user) {
          await AsyncStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        } else {
          await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Failed to save user data to storage', error);
      }
    };

    if (isInitialized) {
      saveUserToStorage();
    }
  }, [user, isInitialized]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would validate credentials with an API
      // For now, we'll simulate a login check with a mock user
      
      // Simple validation - in a real app, this would be a server API call
      if (!email || !password) {
        Alert.alert('Error', 'Email and password are required');
        return false;
      }
      if (email.toLowerCase() === currentUser.email.toLowerCase() && password === currentUser.password) {
        setUser(currentUser);
        setIsLoggedIn(true);
        return true;
      }
      return false;
    } catch (error) {
      Alert.alert('Error', 'Wrong email or password');
      return false;
    }
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // In a real app, this would register a new user with an API
      // For now, we'll create a new user based on the current user template
      
      const newUser: User = {
        ...currentUser,
        id: `user_${Date.now()}`,
        name,
        email,
        points: 0,
        enrolledCourses: [],
        completedCourses: [],
        progress: {}
      };
      
      setUser(newUser);
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
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
      register, 
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
