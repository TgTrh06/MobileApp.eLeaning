import { Exam, Question } from "../utils/types";

export const exams: Exam[] = [
  {
    id: "1",
    title: "HTML Basics Exam",
    description: "Test your knowledge of HTML basics.",
    questions: [
      {
        id: "q1",
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlinks and Text Markup Language"],
        correctAnswer: "Hyper Text Markup Language",
        score: 10,
        examCategory: "Basic Courses",
        duration: 30, // in minutes
      },
      {
        id: "q2",
        question: "Which HTML element is used to define the title of a document?",
        options: ["<title>", "<head>", "<meta>"],
        correctAnswer: "<title>",
        score: 10,
        examCategory: "Basic Courses",
        duration: 30, // in minutes
      }
    ],
    passingScore: 70, // percentage
    totalScore: 20, // total score for the exam
    coursesCategory: "Basic Courses"
  },
  {
    id: "2",
    title: "CSS Fundamentals Exam",
    description: "Assess your understanding of CSS fundamentals.",
    questions: [
      {
        id: "q1",
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"],
        correctAnswer: "Cascading Style Sheets",
        score: 10,
        examCategory: "Basic Courses",
        duration: 30, // in minutes
      },
      {
        id: "q2",
        question: "Which property is used to change the background color?",
        options: ["bgcolor", "background-color", "color"],
        correctAnswer: "background-color",
        score: 10,
        examCategory: "Basic Courses",
        duration: 30, // in minutes
      }
    ],
    passingScore: 70, // percentage
    totalScore: 20, // total score for the exam
    coursesCategory: "Basic Courses"
  },
  {
    id: "3",
    title: "JavaScript Basics Exam",
    description: "Evaluate your knowledge of JavaScript basics.",
    questions: [
      {
        id: "q1",
        question: "What does JS stand for?",
        options: ["JavaScript", "Java Style", "Just Script"],
        correctAnswer: "JavaScript",
        score: 10,
        examCategory: "Basic Courses",
        duration: 30, // in minutes
      },
      {
        id: "q2",
        question: "Which symbol is used for comments in JavaScript?",
        options: ["//", "#", "<!--"],
        correctAnswer: "//",
        score: 10,
        examCategory: "Basic Courses",
        duration: 30, // in minutes
      }
    ],
    passingScore: 70, // percentage
    totalScore: 20, // total score for the exam
    coursesCategory: "Basic Courses"
  },
  {
    id: "4",
    title: "Advanced CSS Exam",
    description: "Test your knowledge of advanced CSS concepts.",
    questions: [
      {
        id: "q1",
        question: "What is the use of z-index in CSS?",
        options: ["To set the stacking order of elements", "To set the font size", "To set the background color"],
        correctAnswer: "To set the stacking order of elements",
        score: 10,
        examCategory: "Advance Courses",
        duration: 30, // in minutes
      },
      {
        id: "q2",
        question: "Which property is used to create a flex container?",
        options: ["display: flex;", "flex-direction:", "flex-wrap:"],
        correctAnswer: "display: flex;",
        score: 10,
        examCategory: "Advance Courses",
        duration: 30, // in minutes
      }
    ],
    passingScore: 70, // percentage
    totalScore: 20, // total score for the exam
    coursesCategory: "Advance Courses"
  },
  {
    id: "5",
    title: "React Basics Exam",
    description: "Evaluate your knowledge of React basics.",
    questions: [
      {
        id: "q1",
        question: "What is React?",
        options: ["A JavaScript library for building user interfaces", "A CSS framework", "A database"],
        correctAnswer: "A JavaScript library for building user interfaces",
        score: 10,
        examCategory: "Advance Courses",
        duration: 30, // in minutes
      },
      {
        id: "q2",
        question: "Which method is used to update the state in React?",
        options: ["setState()", "updateState()", "changeState()"],
        correctAnswer: "setState()",
        score: 10,
        examCategory: "Advance Courses",
        duration: 30, // in minutes
      }
    ],
    passingScore: 70, // percentage
    totalScore: 20, // total score for the exam
    coursesCategory: "Advance Courses"
  }
];

export const getExamById = (id: string): Exam | undefined => {
  return exams.find((exam) => exam.id === id);
};
export const getExamsByCategory = (category: string): Exam[] => {
  return exams.filter((exam) => exam.coursesCategory === category);
};
export const getAllExams = (): Exam[] => {
  return exams;
};
export const getExamQuestions = (examId: string): Question[] | undefined => {
  const exam = getExamById(examId);
  return exam ? exam.questions : undefined;
}