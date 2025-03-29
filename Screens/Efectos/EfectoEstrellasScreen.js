import React from "react";
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker'
import { Slider } from '@miblanchard/react-native-slider';

const EfectoEstrellasScreen = ({ navigation }) => {
    let [velocidadEstrellas] = React.useState(0);

    let [colorFondoActual, onChangeColorFondo] = React.useState('#ff0000');
    const [rojoFondo, onChangeRojoFondo] = React.useState('ff');
    const [verdeFondo, onChangeVerdeFondo] = React.useState('00');
    const [azulFondo, onChangeAzulFondo] = React.useState('00');

    let [colorActual, onChangeColor] = React.useState('#ff0000');
    const [rojo, onChangeRojo] = React.useState('ff');
    const [verde, onChangeVerde] = React.useState('00');
    const [azul, onChangeAzul] = React.useState('00');
    
    function cambioColorBackGround(colorete){
      colorFondoActual = colorete
      onChangeColorFondo(colorete)
      onChangeRojoFondo(colorete[1]+colorete[2])
      onChangeVerdeFondo(colorete[3]+colorete[4])
      onChangeAzulFondo(colorete[5]+colorete[6])
    }
    function cambioColorEstrella(colorete){
      colorActual = colorete
      onChangeColor(colorete)
      onChangeRojo(colorete[1]+colorete[2])
      onChangeVerde(colorete[3]+colorete[4])
      onChangeAzul(colorete[5]+colorete[6])
    }

    const ColorBackGroundPicker = () => (
      <TriangleColorPicker
      oldColor = {colorFondoActual}
      onColorSelected ={color => cambioColorBackGround(color)}
      style={{ flex: 1}}
      />
    )
    const ColorStarPicker = () => (
      <TriangleColorPicker
      oldColor = {colorActual}
      onColorSelected ={color => cambioColorEstrella(color)}
      style={{ flex: 1}}
      />
    )

    const SpeedStar = () => (
      <Slider
      minimumValue={0}
      maximumValue={10}
      step={true}
      value={velocidadEstrellas}
      onValueChange={value => velocidadEstrellas = value}
      />
    )
    
    return (

    <View style={styles.container}>
      <Text>Seleccione el color de Fondo</Text>
      <ColorBackGroundPicker></ColorBackGroundPicker>      
      
      <View style={styles.fixToText}>
        <Text>R</Text>
        <TextInput
          onChangeText={onChangeRojo}
          editable={false}
          value={rojoFondo}
        ></TextInput>
        <Text>G</Text>
        <TextInput
          onChangeText={onChangeVerde}
          editable={false}
          value={verdeFondo}
        ></TextInput>
        <Text>B</Text>
        <TextInput
          onChangeText={onChangeAzul}
          value={azulFondo}
          editable={false}
        ></TextInput>
        <Text>Hex</Text>
        <TextInput
          editable={false}
          value={colorFondoActual}
          onChangeText={onChangeColor}
        ></TextInput>
      </View>
      <View style={styles.separator}></View>
      <Text>Seleccione el color de las Estrellas</Text>
      <ColorStarPicker></ColorStarPicker>
      
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
      <Text>Velocidad Estrellas</Text>
      <SpeedStar></SpeedStar>
      <View style={styles.separator}></View>
      <View style={styles.fixToText}>
        <Button color="seagreen"  title="Enviar a dispositivos" onPress={() => alert('Datos a enviar:'+
        '\n*Color Estrellas: ' + colorActual +
        '\n*Color Fondo: ' + colorFondoActual +
        '\n*VelocidadEstrellas: ' + velocidadEstrellas)} />
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


  export default EfectoEstrellasScreen;


  // DATOS A ENVIAR A SERVER POR API
  //'accion': 'estrellas',
  //'colorEstrellas': colorEstrellas,
  //'colorFondo': colorFondo,
  //'velocidad': velocidad,
  //'lista': listaDispositivos