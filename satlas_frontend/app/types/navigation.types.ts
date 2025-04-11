import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
  Welcome: undefined;
  Splash: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Home: undefined;
};

export type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;
export type SplashScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Splash'>;
export type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;
export type SignUpScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignUp'>;
export type ForgotPasswordScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ForgotPassword'>;
export type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>; 