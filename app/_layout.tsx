import React from 'react';
import Toast from 'react-native-toast-message';
import Navigation from './navigation';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationIndependentTree } from '@react-navigation/native';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'; 
import { tokenCache } from '@clerk/clerk-expo/token-cache'; 
import { CoursesProvider } from './context/CoursesContext';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error('Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY environment variable');
  }

  return (
    <ClerkProvider 
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      <ClerkLoaded>
        <NavigationIndependentTree>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <AuthProvider>
            <CoursesProvider>
            <SafeAreaProvider>
                <StatusBar style="auto" />
                <Navigation />
                <Toast /> {/*Message provider of react-native*/}
            </SafeAreaProvider>
            </CoursesProvider>
            </AuthProvider>
          </GestureHandlerRootView>
        </NavigationIndependentTree>
      </ClerkLoaded>
    </ClerkProvider>
  );
}