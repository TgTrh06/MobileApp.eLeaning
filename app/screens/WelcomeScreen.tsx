import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  Image, 
  ImageBackground,
  SafeAreaView
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../utils/colors';
// import { useAuth } from '../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen: React.FC = () => {
  // const { login } = useAuth();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = () => {
    navigation.navigate('SignIn' as never);
  };

  // const handleGoogleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     // In a real app, this would integrate with the Google Auth API
  //     await login('Ikienkinzero@example.com', '123456');
  //   } catch (error) {
  //     console.error('Login failed:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      <LinearGradient
        colors={[colors.primary, colors.primaryDark]}
        style={styles.background}
      >
        <SafeAreaView style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>{`</>`}</Text>
            <Text style={styles.appName}>CodeBox</Text>
          </View>
          
          <Text style={styles.tagline}>
            Your Ultimate Programming Learning Box
          </Text>
          
          <View style={styles.featuresContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70' }}
              style={styles.featureImage}
              resizeMode="contain"
            />
          </View>
          
          <TouchableOpacity
            style={styles.signInButton}
            onPress={handleSignIn}
          >
            <Text style={styles.signInButtonText}>
              Sign In / Create Account
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.googleButton}
            // onPress={handleGoogleLogin}
            disabled={isLoading}
          >
            <Image 
              source={{ uri: 'https://www.google.com/favicon.ico' }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>
              {isLoading ? 'Logging in...' : 'Continue with Google'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.termsText}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Text>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.white,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.white,
    marginTop: 8,
  },
  tagline: {
    fontSize: 16,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 40,
  },
  featuresContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featureImage: {
    width: '100%',
    height: 240,
    borderRadius: 12,
  },
  signInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.white,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    marginBottom: 16,
  },
  signInButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.white,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    marginBottom: 16,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  termsText: {
    fontSize: 12,
    color: colors.white,
    textAlign: 'center',
    opacity: 0.8,
  },
});

export default WelcomeScreen;
