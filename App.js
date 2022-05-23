/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
*/
import React from 'react';
import { useColorScheme, LogBox } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Home from './src/components/Home';
import Crud from './src/components/Crud';
import Camera from './src/components/Camera';
import Bluetooth from './src/components/Bluetooth';
import BluetoothList from './src/components/BluetoothList';
import PaymentView from './src/components/PaymentView';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: '#0c9abe',
          headerStyle: {
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Crud" component={Crud} />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Bluetooth" component={Bluetooth} />
        <Stack.Screen name="BluetoothList" component={BluetoothList} />
        <Stack.Screen name="PaymentView" component={PaymentView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
