import { Course } from '../utils/types';

export const courses: Course[] = [
  {
    id: '1',
    title: 'Learn Basic HTML',
    thumbnail: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70',
    category: 'Basic Courses',
    chaptersCount: 15,
    duration: 2 * 60 + 30, // 2h 30m
    price: "Free",
    description: 'Welcome to an exciting journey of building a cutting-edge Full-stack Learning Management System (LMS) application with React.js. In this in-depth tutorial, we will explore the power of Next.js, React.js.',
    chapters: [
      {
        id: '1-1',
        title: 'Introduction',
        duration: 15,
        isLocked: false,
        content: 'Introduction to HTML and its importance in web development.'
      },
      {
        id: '1-2',
        title: 'Getting Started',
        duration: 20,
        isLocked: false,
        content: 'Setting up your development environment and creating your first HTML page.'
      },
      {
        id: '1-3',
        title: 'What is HTML',
        duration: 30,
        isLocked: true,
        content: 'Understanding HTML elements, tags, and attributes.'
      },
      {
        id: '1-4',
        title: 'HTML Structure',
        duration: 25,
        isLocked: true,
        content: 'Learning the basic structure of an HTML document.'
      },
      {
        id: '1-5',
        title: 'Text Formatting',
        duration: 35,
        isLocked: true,
        content: 'Formatting text using HTML tags.'
      }
    ],
    tags: ['HTML', 'Web Development', 'Beginner']
  },
  {
    id: '2',
    title: 'Learn Basic CSS',
    thumbnail: 'https://images.unsplash.com/photo-1599081593734-5e65dd7abfba',
    category: 'Basic Courses',
    chaptersCount: 12,
    duration: 1 * 60 + 45, // 1h 45m
    price: 1.99,
    description: 'Master the fundamentals of CSS to style your web pages and make them visually appealing.',
    chapters: [
      {
        id: '2-1',
        title: 'Introduction to CSS',
        duration: 20,
        isLocked: false,
        content: 'Understanding CSS and its role in web development.'
      },
      {
        id: '2-2',
        title: 'CSS Selectors',
        duration: 25,
        isLocked: true,
        content: 'Learning about different CSS selectors and how to use them.'
      },
      {
        id: '2-3',
        title: 'CSS Box Model',
        duration: 30,
        isLocked: true,
        content: 'Understanding the CSS box model: margin, border, padding, and content.'
      }
    ],
    tags: ['CSS', 'Web Design', 'Beginner']
  },
  {
    id: '3',
    title: 'Build LMS App in Next.js 13',
    thumbnail: 'https://images.unsplash.com/photo-1610500796385-3ffc1ae2f046',
    category: 'Project & Video Courses',
    chaptersCount: 15,
    duration: 3 * 60 + 40, // 3h 40m
    price: "Free",
    description: 'Create a full-featured Learning Management System with Next.js 13, React, and modern web technologies.',
    chapters: [
      {
        id: '3-1',
        title: 'Project Setup',
        duration: 25,
        isLocked: false,
        content: 'Setting up the Next.js project and installing required dependencies.'
      },
      {
        id: '3-2',
        title: 'Authentication',
        duration: 35,
        isLocked: true,
        content: 'Implementing user authentication and authorization.'
      },
      {
        id: '3-3',
        title: 'Course Management',
        duration: 40,
        isLocked: true,
        content: 'Building the course management system with CRUD operations.'
      }
    ],
    tags: ['Next.js', 'React', 'Project', 'Full Stack']
  },
  {
    id: '4',
    title: 'Uber Clone 2.0',
    thumbnail: 'https://images.unsplash.com/photo-1594643781026-abcb610d394f',
    category: 'Project & Video Courses',
    chaptersCount: 15,
    duration: 4 * 60 + 15, // 4h 15m
    price: "Free",
    description: 'Build a fully functional Uber clone with React Native, Google Maps API, and real-time tracking.',
    chapters: [
      {
        id: '4-1',
        title: 'Project Setup',
        duration: 30,
        isLocked: false,
        content: 'Setting up the React Native project and installing required dependencies.'
      },
      {
        id: '4-2',
        title: 'Google Maps Integration',
        duration: 45,
        isLocked: true,
        content: 'Integrating Google Maps API for location tracking and navigation.'
      },
      {
        id: '4-3',
        title: 'Real-time Features',
        duration: 50,
        isLocked: true,
        content: 'Implementing real-time tracking and communication features.'
      }
    ],
    tags: ['React Native', 'Mobile Development', 'Maps API', 'Project']
  },
  {
    id: '5',
    title: 'Python Basics',
    thumbnail: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4',
    category: 'Basic Courses',
    chaptersCount: 10,
    duration: 2 * 60, // 2h
    price: "Free",
    description: 'Python is a general-purpose, high-level programming language. Its design philosophy emphasizes code readability with its notable use of significant whitespace.',
    chapters: [
      {
        id: '5-1',
        title: 'Introduction to Python',
        duration: 25,
        isLocked: false,
        content: 'Understanding Python and its applications.'
      },
      {
        id: '5-2',
        title: 'Variables and Data Types',
        duration: 30,
        isLocked: false,
        content: 'Learning about Python variables, data types, and operations.'
      },
      {
        id: '5-3',
        title: 'Control Flow',
        duration: 35,
        isLocked: true,
        content: 'Mastering conditional statements and loops in Python.'
      }
    ],
    tags: ['Python', 'Programming', 'Beginner']
  },
  {
    id: '6',
    title: 'Advanced JavaScript',
    thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
    category: 'Advance Courses',
    chaptersCount: 12,
    duration: 3 * 60 + 15, // 3h 15m
    price: 1.99,
    description: 'Take your JavaScript skills to the next level with advanced concepts and modern practices.',
    chapters: [
      {
        id: '6-1',
        title: 'ES6+ Features',
        duration: 40,
        isLocked: false,
        content: 'Exploring modern JavaScript features and syntax.'
      },
      {
        id: '6-2',
        title: 'Asynchronous JavaScript',
        duration: 45,
        isLocked: true,
        content: 'Mastering promises, async/await, and event loop.'
      },
      {
        id: '6-3',
        title: 'Functional Programming',
        duration: 50,
        isLocked: true,
        content: 'Understanding functional programming concepts in JavaScript.'
      }
    ],
    tags: ['JavaScript', 'Advanced', 'Web Development']
  },
  {
    id: '7',
    title: 'React Native Fundamentals',
    thumbnail: 'https://images.unsplash.com/photo-1472220625704-91e1462799b2',
    category: 'Advance Courses',
    chaptersCount: 14,
    duration: 3 * 60 + 30, // 3h 30m
    price: "Free",
    description: 'Master the fundamentals of React Native and build cross-platform mobile applications.',
    chapters: [
      {
        id: '7-1',
        title: 'Introduction to React Native',
        duration: 30,
        isLocked: false,
        content: 'Understanding React Native and its ecosystem.'
      },
      {
        id: '7-2',
        title: 'Components and Props',
        duration: 35,
        isLocked: true,
        content: 'Learning about React Native components and props.'
      },
      {
        id: '7-3',
        title: 'State and Lifecycle',
        duration: 40,
        isLocked: true,
        content: 'Managing state and component lifecycle in React Native.'
      }
    ],
    tags: ['React Native', 'Mobile Development', 'Cross-platform']
  },
  {
    id: '8',
    title: 'Data Structures and Algorithms',
    thumbnail: 'https://images.unsplash.com/photo-1604933834413-4cbe62737214',
    category: 'Advance Courses',
    chaptersCount: 16,
    duration: 4 * 60, // 4h
    price: 1.99,
    description: 'Learn essential data structures and algorithms to become a better programmer.',
    chapters: [
      {
        id: '8-1',
        title: 'Introduction to Algorithms',
        duration: 35,
        isLocked: false,
        content: 'Understanding algorithms and their importance.'
      },
      {
        id: '8-2',
        title: 'Arrays and Linked Lists',
        duration: 40,
        isLocked: true,
        content: 'Exploring array and linked list data structures.'
      },
      {
        id: '8-3',
        title: 'Stacks and Queues',
        duration: 45,
        isLocked: true,
        content: 'Understanding stack and queue data structures.'
      }
    ],
    tags: ['Algorithms', 'Data Structures', 'Computer Science']
  }
];

export const getCourseByCategorySlug = (category: string): Course[] => {
  if (category === "all") return courses;
  
  return courses.filter(course => 
    course.category.toLowerCase().replace(/\s+/g, '-') === category
  );
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};

export const getBasicCourses = (): Course[] => {
  return courses.filter(course => course.category === "Basic Courses");
};

export const getAdvancedCourses = (): Course[] => {
  return courses.filter(course => course.category === "Advance Courses");
};

export const getProjectCourses = (): Course[] => {
  return courses.filter(course => course.category === "Project & Video Courses");
};
