import React from "react";
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker'

const EfectoColorScreen = ({ navigation }) => {
  
  function cambioColor(colorete){
    colorActual = colorete
    onChangeColor(colorete)
    onChangeRojo(colorete[1]+colorete[2])
    onChangeVerde(colorete[3]+colorete[4])
    onChangeAzul(colorete[5]+colorete[6])
  }
  
  let [colorActual, onChangeColor] = React.useState(null);
  const [rojo, onChangeRojo] = React.useState(null);
  const [verde, onChangeVerde] = React.useState(null);
  const [azul, onChangeAzul] = React.useState(null);

	const ColorSelecter = () => (
    <TriangleColorPicker
      onColorSelected ={color => cambioColor(color)}
      oldColor={colorActual}
      style={{flex: 1}}
    />    
	)
    return (
    <View style={styles.container}>
      <ColorSelecter></ColorSelecter>
      
      <View style={styles.separator}></View>
      <View style={styles.fixToText}>
        <Text>R</Text>
        <TextInput
          onChangeText={onChangeRojo}
          editable={false}
          value={rojo}
        ></TextInput>
        <Text>G</Text>
        <TextInput
          onChangeText={onChangeVerde}
          editable={false}
          value={verde}
        ></TextInput>
        <Text>B</Text>
        <TextInput
          onChangeText={onChangeAzul}
          value={azul}
          editable={false}
        ></TextInput>
        <Text>Hex</Text>
        <TextInput
          editable={false}
          value={colorActual}
          onChangeText={onChangeColor}
        ></TextInput>
      </View>
      <View style={styles.separator}></View>
      <View style={styles.fixToText}>
        <Button color="seagreen"  title="Enviar a dispositivos" onPress={() => alert('Color HEX enviado a los dispositivos: ' + colorActual)} />      
      </View>
		</View>
    );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
      marginVertical: 16,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });
  
  export default EfectoColorScreen;


  // DATOS A ENVIAR A SERVER POR API
  // 'accion': 'color',
  //'color': colorHex,
  //'lista': listaDispositivos