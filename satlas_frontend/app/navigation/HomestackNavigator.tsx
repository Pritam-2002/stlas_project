import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import SatLibaryPage from '../screens/home/SatLibaryPage'; // Example additional screen

export type HomeStackParamList = {
    HomeScreen: undefined;
    SatLibaryPage: undefined; // You can define params
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStackNavigator: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SatLibaryPage" component={SatLibaryPage} />
        </Stack.Navigator>
    );
};

export default HomeStackNavigator;
