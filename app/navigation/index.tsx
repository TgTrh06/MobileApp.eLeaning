import React, { useState } from 'react'; // Import useState
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/HomeScreen';
import AchievementScreen from '../screens/AchievementScreen';

import { colors } from '../utils/colors';
import {
  HomeIcon,
  ProfileIcon,
  AwardIcon,
  BookIcon
} from '../assets/icons';
import { SignedIn, SignedOut } from '@clerk/clerk-expo';
import CourseExamScreen from '../screens/CourseExamScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import MyCoursesScreen from '../screens/MyCoursesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LeaderboardScreen from '../screens/LeaderboardScreen';
import CourseDetailScreen from '../screens/CourseDetailScreen';
import ChapterContentScreen from '../screens/ChapterContentScreen';
import { CoursesProvider } from '../context/CoursesContext';
import { CompleteChapterProvider } from '../context/CompleteChapterContext'; // Import the context
import { UserPointProvider } from '../context/UserPointContext';

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
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="ChapterContent" component={ChapterContentScreen} />
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
      <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
      <Stack.Screen name="ChapterContent" component={ChapterContentScreen} />
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
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('HomeTab'); // Navigate to the root screen of the tab
          },
        })}
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
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('LeaderboardTab'); // Navigate to the root screen of the tab
          },
        })}
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
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('MyCourses'); // Navigate to the root screen of the "MyCourses" stack
          },
        })}
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
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate('ProfileTab'); // Navigate to the root screen of the "ProfileTab"
          },
        })}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => {

  return (
    <NavigationContainer>
      {/* Hiển thị màn hình chính khi đã đăng nhập */}
      <SignedIn>
        <CoursesProvider>
          <CompleteChapterProvider>
            <UserPointProvider>
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Main" component={MainTabs} />
              </Stack.Navigator>
            </UserPointProvider>
          </CompleteChapterProvider>
        </CoursesProvider>
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