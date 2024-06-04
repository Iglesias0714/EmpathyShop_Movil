import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './app/screens/Home';
import Login from './app/screens/Login';
import ProductAdd from './app/screens/ProductAdd';
import ProductDetails, { Params as ProductDetailsParams } from './app/screens/ProductDetails';
import { EntradasScreen, MovimientosScreenParams, SalidasScreen } from './app/screens/MovimientosScreens';
import AboutUs from './app/screens/AboutUs';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  ProductDetails: ProductDetailsParams;
  ProductAdd: undefined;
  EntradasScreen: MovimientosScreenParams;
  SalidasScreen: MovimientosScreenParams;
  AboutUs: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductAdd"
          component={ProductAdd}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
        />
        <Stack.Screen
          name="EntradasScreen"
          component={EntradasScreen}
        />
        <Stack.Screen
          name="SalidasScreen"
          component={SalidasScreen}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
