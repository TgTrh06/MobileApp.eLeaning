import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { colors } from '../utils/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { AppIcon, LockIcon, CheckIcon } from '../assets/icons';

import { useSignIn, useSignUp } from '@clerk/clerk-expo';

const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const isLoaded = useSignIn;
  const signIn = useSignIn();  // Clerk sign-in hook
  const signUp = useSignUp(); // Clerk sign-up hook

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (!validatePassword(password)) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    if (!isLogin) {
      if (!name) {
        Alert.alert('Error', 'Please enter your name');
        return;
      }
      
      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }
    }

    setIsLoading(true);
    
    // try {
    //   if (isLogin) {
    //     // Handle login with Clerk
    //     const signInAttempt = await signIn.create({
    //       identifier: email,
    //       password,
    //     });

    //     if (signInAttempt.status === 'complete') {
    //       Alert.alert('Success', 'You are now logged in!');
    //     } else {
    //       Alert.alert('Error', 'Invalid email or password');
    //     }
    //   } else {
    //     // Handle registration with Clerk
    //     const signUpAttempt = await signUp.create({
    //       emailAddress: email,
    //       password,
    //       firstName: name,
    //     });

    //     if (signUpAttempt.status === 'complete') {
    //       Alert.alert('Success', 'Account created successfully!');
    //     } else {
    //       Alert.alert('Error', 'Registration failed. Please try again.');
    //     }
    //   }
    // } catch (error: any) {
    //   Alert.alert('Error', error.message || 'An error occurred. Please try again later.');
    //   console.error(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView style={styles.scrollView}>
          <View style={styles.formContainer}>
            <View style={styles.logoContainer}>
              <AppIcon name="CodeBox" size={60} color={colors.primary} />
              <Text style={styles.appName}>CodeBox</Text>
              <Text style={styles.appTagline}>Learn coding with interactive courses</Text>
            </View>

            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tabButton, isLogin && styles.activeTab]}
                onPress={() => setIsLogin(true)}
              >
                <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, !isLogin && styles.activeTab]}
                onPress={() => setIsLogin(false)}
              >
                <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputsContainer}>
              {!isLogin && (
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                  />
                </View>
              )}

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              {!isLogin && (
                <View style={styles.inputWrapper}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                  />
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text style={styles.submitButtonText}>
                  {isLogin ? 'Login' : 'Sign Up'}
                </Text>
              )}
            </TouchableOpacity>

            {isLogin && (
              <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            )}

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>or</Text>
              <View style={styles.dividerLine} />
            </View>

            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{ uri: 'https://www.google.com/favicon.ico' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialButtonText}>Continue with Google</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.heroSection}>
            <LinearGradient
              colors={[colors.primary, colors.secondary]}
              style={styles.heroGradient}
            >
              <View style={styles.heroContent}>
                <Text style={styles.heroTitle}>Start Your Coding Journey</Text>
                <Text style={styles.heroSubtitle}>
                  Learn programming with interactive courses
                </Text>

                <View style={styles.featureRow}>
                  <CheckIcon size={20} color={colors.white} />
                  <Text style={styles.featureText}>
                    Access 100+ coding courses
                  </Text>
                </View>
                
                <View style={styles.featureRow}>
                  <CheckIcon size={20} color={colors.white} />
                  <Text style={styles.featureText}>
                    Learn at your own pace
                  </Text>
                </View>
                
                <View style={styles.featureRow}>
                  <CheckIcon size={20} color={colors.white} />
                  <Text style={styles.featureText}>
                    Track your progress
                  </Text>
                </View>
                
                <View style={styles.featureRow}>
                  <CheckIcon size={20} color={colors.white} />
                  <Text style={styles.featureText}>
                    Join coding challenges
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get('window');
const isLaptop = width >= 1024;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: isLaptop ? 100 : 0, // Add padding for larger screens
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  formContainer: {
    flex: 2.5,
    padding: isLaptop ? 48 : 24, // Adjust padding for laptop screens
    maxWidth: isLaptop ? 600 : '100%', // Limit width on laptops
    alignSelf: isLaptop ? 'center' : 'stretch', // Center content on laptops
  },
  logoContainer: {
    alignItems: 'center',
    marginVertical: 30,
  },
  appName: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    marginTop: 12,
  },
  appTagline: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 12,
    backgroundColor: colors.lightGray,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '600',
  },
  inputsContainer: {
    marginBottom: 24,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  submitButton: {
    backgroundColor: colors.primary,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginTop: 16,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textSecondary,
    marginHorizontal: 12,
    fontSize: 14,
  },
  socialButton: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: '500',
  },
  heroSection: {
    flex: 1,
    margin: isLaptop ? 48 : 24, // Adjust margin for larger screens
    marginTop: 0,
    borderRadius: 20,
    overflow: 'hidden',
  },
  heroGradient: {
    flex: 1,
    padding: 24,
  },
  heroContent: {
    flex: 1,
    justifyContent: 'center',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.9,
    marginBottom: 24,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureText: {
    fontSize: 16,
    color: colors.white,
    marginLeft: 12,
  },
});

export default AuthScreen;