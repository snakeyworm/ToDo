
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from "react-native"
import List from "./components/List";
import ActionBar from "./components/ActionBar";
import AsyncStorage from "@react-native-community/async-storage";

// Styling
const height = Dimensions.get( "window" ).height;

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: height * 0.05,
    backgroundColor: "#000000",
  }
} );

// Method for storing data
const storeData = async ( key, value ) => {
  try {
    await AsyncStorage.setItem( key, JSON.stringify( value ) )
  } catch ( e ) {
    alert( "Data error(Store)" );
  }
}

// Method for retrieving data
const getData = async ( key, stateCallback ) => {

  try {
    const data = await AsyncStorage.getItem( key );

    if ( data ) {
      stateCallback( JSON.parse( data ) );
    }

  } catch ( e ) {
    alert( "Data error(Get)" ); // TODO add better error handling
  }

};

// TODO Implement user data storage(Use AsyncStorage.getAllKeys())
// Main component
export default function App() {

  let [ lists, setLists ] = useState( [] );
  let [ current, setCurrent ] = useState( [] );

  storeData(
    "list1",
    [
      { name: "Item1", checked: true },
      { name: "Item2", checked: true },
      { name: "Item3", checked: false },
      { name: "Item4", checked: true },
      { name: "Item5", checked: false },
    ] );

  // Retrieve intial data
  useEffect( () => {

    // Get lists of saved lists
    ( async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();

        if ( keys ) {
          setLists( keys );
        }
    
      } catch ( e ) {
        alert( "Data error(Keys)" ); // TODO add better error handling
      }
    } )();

    getData( "list1", setCurrent );

  }, [] );

  return (
    // Container
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={"#000000"} />
      <List data={current} />
      <ActionBar />
    </KeyboardAvoidingView>
  );

}
