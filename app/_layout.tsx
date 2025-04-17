import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './navigation';
import { AuthProvider } from './context/AuthContext';
import { CoursesProvider } from './context/CoursesContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationIndependentTree } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationIndependentTree>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <AuthProvider>
            <CoursesProvider>
              <StatusBar style="auto" />
              <Navigation />
            </CoursesProvider>
          </AuthProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </NavigationIndependentTree>
  );
}
