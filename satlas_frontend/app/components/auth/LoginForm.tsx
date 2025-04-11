import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import CustomInput from '../common/CustomInput';
import PasswordInput from '../common/PasswordInput';
import ActionButton from '../common/ActionButton';

interface LoginFormProps {
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  testID?: string;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onForgotPassword,
  onCreateAccount,
  testID,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleLogin = (): void => {
    // Handle login logic here
    console.log('Login with:', email, password);
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  return (
    <View testID={testID}>
      {/* Email Input */}
      <CustomInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        keyboardType="email-address"
        testID="login-email-input"
      />

      {/* Password Input */}
      <PasswordInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder="Enter your password"
        showPassword={showPassword}
        toggleShowPassword={toggleShowPassword}
        testID="login-password-input"
      />

      {/* Forgot Password */}
      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={onForgotPassword}
      >
        <Text style={styles.forgotPasswordText}>Forgot password</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <ActionButton
        title="Login"
        onPress={handleLogin}
        disabled={!email || !password}
        testID="login-button"
      />

      {/* Create Account */}
      <TouchableOpacity
        style={styles.createAccountContainer}
        onPress={onCreateAccount}
      >
        <Text style={styles.createAccountText}>Create account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  forgotPasswordContainer: {
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 30,
  },
  forgotPasswordText: {
    color: '#376AED',
    fontSize: 15,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
  createAccountContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  createAccountText: {
    color: '#376AED',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
});

export default LoginForm;