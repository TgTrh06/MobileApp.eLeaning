import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useNavigation } from '@react-navigation/native';

const ErrorBox = ({ message, onClose }: { message: string; onClose: () => void }) => {
  if (!message) return null;

  return (
    <View style={styles.errorBox}>
      <Text style={styles.errorText}>{message}</Text>
      <TouchableOpacity onPress={onClose} style={styles.errorCloseButton}>
        <Text style={styles.errorCloseText}>X</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn(); // Clerk hooks
  const navigation = useNavigation(); // React Navigation hook

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // State for error message

  const handleSignUp = () => {
    navigation.navigate('Register' as never);
  };

  const handleMain = () => {
    (navigation as any).navigate('HomeTab', { screen: 'Home' });
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      setErrorMessage('Authentication service is not ready. Please try again later.');
      return;
    }

    setIsLoading(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        // handleMain(); // Navigate to the Home screen
      } else {
        setErrorMessage('Sign-in requires additional steps. Please check your email.');
      }
    } catch (err: any) {
      console.error('Sign-in error:', JSON.stringify(err, null, 2));

      if (err.code === 'identifier_not_found') {
        setErrorMessage('This account does not exist. Please sign up first.');
      } else if (err.code === 'invalid_credentials') {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage(err.message || 'An error occurred during sign-in. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <ErrorBox message={errorMessage} onClose={() => setErrorMessage('')} />
      <TextInput
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Enter email"
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        style={styles.input}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        style={styles.input}
      />
      <TouchableOpacity onPress={onSignInPress} style={styles.button} disabled={isLoading}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.linkContainer}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity onPress={() => handleSignUp()}>
          <Text style={styles.linkText}>Sign up</Text>
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
  errorBox: {
    backgroundColor: '#FFCCCC',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: '#CC0000',
    fontWeight: 'bold',
  },
  errorCloseButton: {
    padding: 5,
  },
  errorCloseText: {
    color: '#CC0000',
    fontWeight: 'bold',
  },
});