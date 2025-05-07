import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useSignUp } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp(); // Clerk hooks
  const navigation = useNavigation(); // React Navigation hook

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSignIn = () => {
    navigation.navigate('SignIn' as never);
  };  
  const handleMain = () => {
    navigation.navigate('Main' as never);
  };

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) {
      Alert.alert('Error', 'Authentication service is not ready. Please try again later.');
      return;
    }

    setIsLoading(true);

    try {
      // Start sign-up process using email and password provided
      await signUp.create({
        emailAddress,
        password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      setPendingVerification(true);
      Alert.alert('Verification', 'A verification code has been sent to your email.');
    } catch (err: any) {
      console.error('Sign-up error:', JSON.stringify(err, null, 2));
      Alert.alert('Error', err.message || 'An error occurred during sign-up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) {
      Alert.alert('Error', 'Authentication service is not ready. Please try again later.');
      return;
    }

    setIsLoading(true);

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      // If verification was completed, set the session to active
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId });
        Alert.alert('Success', 'Your account has been verified!');
        handleMain(); // Navigate to the Home screen
      } else {
        console.error('Verification requires additional steps:', JSON.stringify(signUpAttempt, null, 2));
        Alert.alert('Error', 'Verification requires additional steps. Please check your email or contact support.');
      }
    } catch (err: any) {
      console.error('Verification error:', JSON.stringify(err, null, 2));
      Alert.alert('Error', err.message || 'An error occurred during verification. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Verify your email</Text>
        <TextInput
          value={code}
          placeholder="Enter your verification code"
          onChangeText={(code) => setCode(code)}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={onVerifyPress}
          style={styles.button}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(email) => setEmailAddress(email)}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={onSignUpPress}
        style={styles.button}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Continue</Text>
        )}
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => handleSignIn()}>
          <Text style={styles.linkText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  linkText: {
    color: '#007BFF',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});