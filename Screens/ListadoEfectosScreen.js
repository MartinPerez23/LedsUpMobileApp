import React from 'react';
import { View, Button } from 'react-native';

function ListadoEfectosScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Button
          title="Color"
          onPress={() => navigation.navigate('Color')}
        />
        <Button
          title="Scan"
          onPress={() => navigation.navigate('Scan')}
        />
        <Button
          title="Scroll"
          onPress={() => navigation.navigate('Scroll')}
        />
        <Button
          title="Estrellas"
          onPress={() => navigation.navigate('Estrellas')}
        />      
      </View>
    );
  }

export default ListadoEfectosScreen;