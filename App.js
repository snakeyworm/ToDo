
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from "react-native"
import HomeList from "./components/HomeList";
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

// Main component
export default function App() {

  let [ list, setList ] = useState( [] );
  let [ keys, setKeys ] = useState( [] );

  // Method for storing data
  const storeData = async ( key, value ) => {
    try {
      await AsyncStorage.setItem( key, JSON.stringify( value ) )
    } catch ( e ) {
      alert( "Data error(Store)" ); // TODO add better error handling
    }
  }

  // Method for retrieving data
  const getData = async ( key ) => {

    try {
      const data = await AsyncStorage.getItem( key );

      if ( data ) {
        setList( JSON.parse( data ) );
      }

    } catch ( e ) {
      alert( "Data error(Get)" ); // TODO add better error handling
    }

  };

  useEffect( () => {

    ( async () => {
      try {
        const keys = await AsyncStorage.getAllKeys();

        if ( keys ) {
          setKeys( keys );
        }

      } catch ( e ) {
        alert( "Data error(Keys)" ); // TODO add better error handling
      }
    } )()

  }, [] );

  list = [
    { name: "Item1", checked: true, },
    { name: "Item2", checked: true, },
    { name: "Item3", checked: true, },
    { name: "Item4", checked: true, },
    { name: "Item5", checked: true, },
  ];

  return (
    // Container
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={"#000000"} />
      {/* <HomeList keys={keys} /> */}
      <List itemName={"list1"} data={list}/>
      <ActionBar />
    </KeyboardAvoidingView>
  );

}
