import { LeaderboardUser, User } from '../utils/types';

export const currentUser: User = {
  id: 'u1',
  name: 'Ikienkinzero',
  email: 'Ikienkinzero.sanap@example.com',
  points: 3500,
  avatar: 'https://images.unsplash.com/photo-1599081593734-5e65dd7abfba',
  enrolledCourses: ['1', '3', '4', '5', '7'],
  completedCourses: ['1'],
  progress: {
    '1': {
      completedChapters: ['1-1', '1-2'],
      lastChapter: '1-2',
      percentage: 40
    },
    '3': {
      completedChapters: ['3-1'],
      lastChapter: '3-1',
      percentage: 33
    },
    '4': {
      completedChapters: [],
      lastChapter: '',
      percentage: 0
    },
    '5': {
      completedChapters: ['5-1'],
      lastChapter: '5-1',
      percentage: 33
    },
    '7': {
      completedChapters: [],
      lastChapter: '',
      percentage: 0
    }
  }
};

export const leaderboardUsers: LeaderboardUser[] = [
  {
    id: 'l1',
    name: 'Adison Press',
    points: 2509,
    avatar: 'https://i.pravatar.cc/150?u=l1',
    country: 'US'
  },
  {
    id: 'l2',
    name: 'Ruben Geidt',
    points: 1469,
    avatar: 'https://i.pravatar.cc/150?u=l2',
    country: 'DE'
  },
  {
    id: 'l3',
    name: 'Jakob Levin',
    points: 1053,
    avatar: 'https://i.pravatar.cc/150?u=l3',
    country: 'IL'
  },
  {
    id: 'l4',
    name: 'Madelyn Dias',
    points: 900,
    avatar: 'https://i.pravatar.cc/150?u=l4',
    country: 'BR'
  },
  {
    id: 'l5',
    name: 'Zain Vaccaro',
    points: 448,
    avatar: 'https://i.pravatar.cc/150?u=l5',
    country: 'IT'
  },
  {
    id: 'l6',
    name: 'Skylar Geidt',
    points: 380,
    avatar: 'https://i.pravatar.cc/150?u=l6',
    country: 'US'
  },
  {
    id: 'u1',
    name: 'Ikienkinzero',
    points: 3500,
    avatar: 'https://images.unsplash.com/photo-1599081593734-5e65dd7abfba',
    country: 'IN'
  }
];

export const subscriptionPlans = [
  {
    id: '1',
    name: 'Monthly Plan',
    price: 10,
    duration: 'month',
    features: ['Feature 1', 'Feature 2'],
    pricePerMonth: 10,
  },
  {
    id: '2',
    name: 'Yearly Plan',
    price: 100,
    duration: 'year',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
    pricePerMonth: 8.33,
  },
];
