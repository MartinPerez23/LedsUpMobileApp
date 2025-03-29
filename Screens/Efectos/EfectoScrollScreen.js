import React from "react";
import { StyleSheet, View, Button, Text } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import SelectDropdown from 'react-native-select-dropdown';

const EfectoScrollScreen = ({ navigation }) => {
  
  const direcciones = ["Izquierda", "Derecha", "Arriba", "Abajo"];
  let [direccion] = React.useState("Izquierda");

  let [velocidadScroll] = React.useState(0);
  
  const SpeedScroll = () => (
    <Slider
    minimumValue={0}
    maximumValue={10}
    step={true}
    value={velocidadScroll}
    onValueChange={value => velocidadScroll = value}
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
    <View style={styles.separator}></View>
    <Text>Velocidad Scroll</Text>
    <SpeedScroll></SpeedScroll>
    <View style={styles.separator}></View>
    <Text>Direccion Scroll</Text>
    <SelectDireccion></SelectDireccion>
    <View style={styles.fixToText}>
      <Button color="seagreen"  title="Enviar a dispositivos" onPress={() => alert('Datos a enviar:' +
      '\n*Direccion: ' + direccion +
      '\n*velocidad Scroll: ' + velocidadScroll)} />
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


  export default EfectoScrollScreen;

  // DATOS A ENVIAR A SERVER POR API
  //'accion': 'scroll',
  //'direccion': direccion,
  //'velocidad': velocidad,
  //'lista': listaDispositivos
