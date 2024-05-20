import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/auth/Login.screen';
import RegisterScreen from './src/screens/auth/Register.screen';
import HomeScreen from './src/screens/home/homepage.screen';
import UserPage from './src/screens/home/user/userpage.screen';

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    console.log('Store state:', store.getState());
  }, [store]);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="User" component={UserPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
