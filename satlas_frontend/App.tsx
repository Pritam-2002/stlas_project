import React, { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as ExpoSplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';
import { RootStackParamList } from './app/types/navigation.types';

import SplashScreen from './app/screens/SplashScreen';
import LoginScreen from './app/screens/LoginScreen';
import WelcomeScreen from './app/screens/WelcomeScreen';

// Keep the expo splash screen visible while we fetch resources
ExpoSplashScreen.preventAutoHideAsync();

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  const [fontsLoaded] = useFonts({
    'Urbanist': require('./assets/fonts/Urbanist-Regular.ttf'),
    'Urbanist-Regular': require('./assets/fonts/Urbanist-Regular.ttf'),
    'Urbanist-Medium': require('./assets/fonts/Urbanist-Medium.ttf'),
    'Inter': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the expo splash screen to hide immediately
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  // Safe way to handle navigation container props based on platform
  const navigationProps = Platform.OS === 'web'
    ? { onReady: onLayoutRootView }
    : { onReady: onLayoutRootView };

  return (
    <NavigationContainer {...navigationProps}>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;