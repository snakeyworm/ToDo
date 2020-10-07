
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



// TODO Implement user data storage(Use AsyncStorage.getAllKeys())
// Main component
export default function App() {

  let [ list, setList ] = useState( [] );

  // Method for storing data
  const storeData = async ( key, value ) => {
    try {
      await AsyncStorage.setItem( key, JSON.stringify( value ) )
    } catch ( e ) {
      alert( "Data error" ); // TODO add better error handling
    }
  }

  storeData( [
    { name: "Item1", checked: true },
    { name: "Item2", checked: true },
    { name: "Item3", checked: false },
    { name: "Item4", checked: true },
    { name: "Item5", checked: false },
  ] );

  // Method for retrieving data
  const getData = async ( key ) => {

    try {
      const data = await AsyncStorage.getItem( key );

      if ( data ) {
        setList( JSON.parse( data ) );
      }

    } catch ( e ) {
      alert( "Data error" ); // TODO add better error handling
    }

  };

  // Retrieve intial data
  useEffect( () => {
    getData();
  } );

  return (
    // Container
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={"#000000"} />
      <List data={list}/>
      <ActionBar />
    </KeyboardAvoidingView>
  );

}
