import React from 'react';
import { SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/home/Home';
import Gameboard from './screens/gameboard/Gameboard';

const App = () => {
  const Stack = createStackNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'Home'}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Gameboard" component={Gameboard} />
          
        </Stack.Navigator>
      </NavigationContainer>
    
    </SafeAreaView>
  );
}

export default App;
