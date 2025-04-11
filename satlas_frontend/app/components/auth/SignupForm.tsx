import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import CustomInput from '../common/CustomInput';
import PasswordInput from '../common/PasswordInput';
import Checkbox from '../common/Checkbox';
import ActionButton from '../common/ActionButton';

interface SignupFormProps {
  testID?: string;
}

type SignupStepType = 'user-info' | 'auth';

const SignupForm: React.FC<SignupFormProps> = ({ testID }) => {
  const [step, setStep] = useState<SignupStepType>('user-info');

  // User Info state (for signup step 1)
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [grade, setGrade] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  // Auth state (for signup step 2)
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [agreeToTerms, setAgreeToTerms] = useState<boolean>(false);

  const handleNextStep = (): void => {
    // Proceed to authentication step in signup flow
    setStep('auth');
  };

  const handleBackStep = (): void => {
    // Go back to user info step
    setStep('user-info');
  };

  const handleSignUp = (): void => {
    // Handle signup logic here
    console.log('Sign up with:',
      name,
      email,
      grade,
      country,
      phoneNumber,
      password,
      confirmPassword
    );
  };

  const toggleShowPassword = (): void => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = (): void => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleCheckboxChange = (checked: boolean): void => {
    setAgreeToTerms(checked);
  };

  const renderUserInfoStep = () => {
    return (
      <>
        {/* Name Input */}
        <CustomInput
          label="Name"
          value={name}
          onChangeText={setName}
          placeholder="Enter your name"
          autoCapitalize="words"
          testID="signup-name-input"
        />

        {/* Email Input */}
        <CustomInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          testID="signup-email-input"
        />

        {/* Current Grade Input */}
        <CustomInput
          label="Current Grade"
          value={grade}
          onChangeText={setGrade}
          placeholder="Enter your current grade"
          testID="signup-grade-input"
        />

        {/* Country Input */}
        <CustomInput
          label="Country"
          value={country}
          onChangeText={setCountry}
          placeholder="Enter your country"
          testID="signup-country-input"
        />

        {/* Next Button */}
        <ActionButton
          title="Next"
          onPress={handleNextStep}
          isGreen={true}
          disabled={!name || !email || !grade || !country}
          testID="signup-next-button"
        />


      </>
    );
  };

  const renderAuthStep = () => {
    return (
      <>
        {/* Phone Number Input */}
        <CustomInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          testID="signup-phone-input"
        />

        {/* Create Password Input */}
        <PasswordInput
          label="Create Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Create a password"
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
          testID="signup-password-input"
        />

        {/* Confirm Password Input */}
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm your password"
          showPassword={showConfirmPassword}
          toggleShowPassword={toggleShowConfirmPassword}
          testID="signup-confirm-password-input"
        />

        {/* Terms and Conditions Checkbox */}
        <Checkbox
          checked={agreeToTerms}
          onChange={handleCheckboxChange}
          label="I've read and agree with the Terms and Conditions and the Privacy Policy."
          testID="signup-terms-checkbox"
        />

        {/* Sign Up Button */}
        <ActionButton
          title="Sign Up"
          onPress={handleSignUp}
          disabled={!phoneNumber || !password || !confirmPassword || !agreeToTerms || password !== confirmPassword}
          isGreen={true}
          testID="signup-button"
        />

        {/* Go Back Button */}
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={handleBackStep}
        >
          <Text style={styles.backButtonText}>Back to previous step</Text>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View testID={testID}>
      {step === 'user-info' ? renderUserInfoStep() : renderAuthStep()}
    </View>
  );
};

const styles = StyleSheet.create({
  backButtonContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#376AED',
    fontSize: 17,
    fontWeight: '500',
    fontFamily: Platform.OS === 'web' ? 'Arial' : 'Poppins-Medium',
  },
  // actionButtonDisabled: {
  //   backgroundColor: 'transparent', // Light gray when disabled
  //   opacity: 0,
  // },
});

export default SignupForm;