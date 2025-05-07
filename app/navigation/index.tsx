import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
// import CourseDetailScreen from '../screens/CourseDetailScreen';
// import CourseContentScreen from '../screens/CourseContentScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import MyCoursesScreen from '../screens/MyCoursesScreen';
// import LeaderboardScreen from '../screens/LeaderboardScreen';
// import SubscriptionScreen from '../screens/SubscriptionScreen';
import AchievementScreen from '../screens/AchievementScreen';

import { colors } from '../utils/colors';
import { 
  HomeIcon, 
  ProfileIcon, 
  AwardIcon, 
  BookIcon 
} from '../assets/icons';
// import CourseExamScreen from '../screens/CourseExamScreen';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
// import CourseDetailScreen from '../screens/CourseDetailScreen';
// import CourseContentScreen from '../screens/CourseContentScreen';
import CourseExamScreen from '../screens/CourseExamScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import MyCoursesScreen from '../screens/MyCoursesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="CourseContent" component={CourseContentScreen} /> */}
      <Stack.Screen name="Achievement" component={AchievementScreen} />
      <Stack.Screen name="CourseExam" component={CourseExamScreen} />
      <Stack.Screen name="Subscription" component={SubscriptionScreen} />
    </Stack.Navigator>
  );
};

const MyCoursesStack = () => {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="MyCourses" component={MyCoursesScreen} />
      {/* <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="CourseContent" component={CourseContentScreen} /> */}
      <Stack.Screen name="Achievement" component={AchievementScreen} />
      <Stack.Screen name="CourseExam" component={CourseExamScreen} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.darkGray,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="LeaderboardTab" 
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ color, size }) => (
            <AwardIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="MyCourses" 
        component={MyCoursesStack} 
        options={{
          tabBarLabel: 'My Courses',
          tabBarIcon: ({ color, size }) => (
            <BookIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="ProfileTab" 
        component={ProfileScreen} 
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <ProfileIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const { isSignedIn } = useUser(); // Check if the user is signed in

  return (
    <NavigationContainer>
      {/* Hiển thị màn hình chính khi đã đăng nhập */}
      <SignedIn>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainTabs} />
        </Stack.Navigator>
      </SignedIn>

      {/* Hiển thị màn hình đăng nhập/đăng ký khi chưa đăng nhập */}
      <SignedOut>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="Register" component={SignUpScreen} />
        </Stack.Navigator>
      </SignedOut>
    </NavigationContainer>
  );
};

export default Navigation;
