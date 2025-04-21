import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Exam } from '../utils/types';
import { exams } from '../data/exams';
import { useAuth } from './AuthContext';

interface ExamsContextType {
  allExams: Exam[];
  getExam: (id: string) => Exam | undefined;
  enrollInExam: (examId: string) => void;
  searchExams: (query: string) => Exam[];
}

const ExamsContext = createContext<ExamsContextType | undefined>(undefined);

export const ExamsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [allExams] = useState<Exam[]>(exams);

  const getExam = (id: string): Exam | undefined => {
    return allExams.find(exam => exam.id === id);
  };

  const enrollInExam = (examId: string) => {
    // This would typically involve an API call
    console.log(`Enrolled in exam with ID: ${examId}`);
  };

  const searchExams = (query: string): Exam[] => {
    return allExams.filter(exam =>
      exam.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <ExamsContext.Provider value={{ allExams, getExam, enrollInExam, searchExams }}>
      {children}
    </ExamsContext.Provider>
  );
};

export const useExams = () => {
  const context = useContext(ExamsContext);
  if (context === undefined) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }
  return context;
};