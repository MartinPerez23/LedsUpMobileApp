import React from "react";
import { StyleSheet, View, Button, TextInput, Text } from 'react-native';
import { TriangleColorPicker } from 'react-native-color-picker'
import { Slider } from '@miblanchard/react-native-slider';
import SelectDropdown from 'react-native-select-dropdown';

const EfectoScanScreen = ({ navigation }) => {
  
  const direcciones = ["Izquierda", "Derecha", "Arriba", "Abajo"];
  let [direccion] = React.useState("Izquierda");

  let [velocidadScan] = React.useState(0);

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
  function cambioColor(colorete){
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
  const ColorScanPicker = () => (
    <TriangleColorPicker
    oldColor = {colorActual}
    onColorSelected ={color => cambioColor(color)}
    style={{ flex: 1}}
    />
  )

  const SpeedScan = () => (
    <Slider
    minimumValue={0}
    maximumValue={10}
    step={true}
    value={velocidadScan}
    onValueChange={value => velocidadScan = value}
    />
  )
  
  const SelectDireccion = () => (
       <SelectDropdown
           data={direcciones}           
           defaultValue={direccion}
           onSelect={(selectedItem, index) => {
            direccion = selectedItem;
           }}
           buttonTextAfterSelection={(selectedItem, index) => {
             // text represented after item is selected
             // if data array is an array of objects then return selectedItem.property to render after item is selected
             return selectedItem
           }}
           rowTextForSelection={(item, index) => {
             // text represented for each item in dropdown
             // if data array is an array of objects then return item.property to represent item in dropdown
             return item
           }}
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
    <Text>Seleccione el color del Scan</Text>
    <ColorScanPicker></ColorScanPicker>
    
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
    <Text>Velocidad Scan</Text>
    <SpeedScan></SpeedScan>
    <View style={styles.separator}></View>
    <Text>Direccion Scan</Text>
    <SelectDireccion></SelectDireccion>
    <View style={styles.separator}></View>
    <View style={styles.fixToText}>
      <Button color="seagreen"  title="Enviar a dispositivos" onPress={() => alert('Datos a enviar:'+
      '\n*Color Scan: ' + colorActual +
      '\n*Color Fondo: ' + colorFondoActual +
      '\n*Direccion: ' + direccion +
      '\n*VelocidadScan: ' + velocidadScan)} />
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


  export default EfectoScanScreen;

  // DATOS A ENVIAR A SERVER POR API
  //'accion': 'scan',
  //'direccion': direccion,
  //'velocidad': velocidad,
  //'colorScan': colorScan,
  //'colorFondo': colorFondo,
  //'lista': listaDispositivos