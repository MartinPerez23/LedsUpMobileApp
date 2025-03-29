import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ListadoEfectosScreen from './Screens/ListadoEfectosScreen'

import EfectoScanScreen from './Screens/Efectos/EfectoScanScreen'
import EfectoScrollScreen from './Screens/Efectos/EfectoScrollScreen'
import EfectoColorScreen from './Screens/Efectos/EfectoColorScreen'
import EfectoEstrellasScreen from './Screens/Efectos/EfectoEstrellasScreen'

function ListadoShowroomScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Button
        title="Showroom 1"
        onPress={() => navigation.navigate('Efectos')}
      />
      <Button
        title="Showroom 2"
        onPress={() => navigation.navigate('Efectos')}
      />
      <Button
        title="Showroom 3"
        onPress={() => navigation.navigate('Efectos')}
      />
    </View>
  );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tus Showrooms" component={ListadoShowroomScreen} />

      <Stack.Screen name="Efectos" component={ListadoEfectosScreen} />

      <Stack.Screen name="Scroll" component={EfectoScrollScreen} />
      <Stack.Screen name="Color" component={EfectoColorScreen} />
      <Stack.Screen name="Scan" component={EfectoScanScreen} />
      <Stack.Screen name="Estrellas" component={EfectoEstrellasScreen} />
    </Stack.Navigator>
  );
}




export default function App() {  
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}