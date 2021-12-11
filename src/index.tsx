import { StatusBar } from 'expo-status-bar';
import React, { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Camera, PickerFiles, Pictures} from './pages';

const Stack = createStackNavigator();

const index : FC = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator>
        <Stack.Screen name={'camera'} component={Camera}/>
        <Stack.Screen name={'picker'} component={PickerFiles}/>
        <Stack.Screen name={'picture'} component={Pictures}/>
      </Stack.Navigator>
      </NavigationContainer>
  );
}

export default index