
import React, { useEffect, useState, useCallback, } from "react";
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

// TODO Further integrate AsyncStorage
// Main component
export default function App() {

  let [ lists, setLists ] = useState( [] );
  let [ key, setKey ] = useState( "list1" );
  let [ currentList, setCurrentList ] = useState( [] );

  // TODO Finalize implementation item adding functionality
  const handleAddItem = useCallback( ( item ) => {
    
    setCurrentList( currentList.concat( [ {
      name: "New item",
      checked: false,
    } ] ) );

    // TODO Reconsider this
    storeData(
      key,
      currentList
    );

  } );

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

  } );

  // Get new list
  useEffect( () => {
    getData( key, setCurrentList );
  }, [ key ] );

  // Save list
  useEffect( () => {
    storeData(
      key,
      [
        { name: "Item1", checked: true },
        { name: "Item2", checked: true },
        { name: "Item3", checked: false },
        { name: "Item4", checked: true },
        { name: "Item5", checked: false },
      ] );
  }, [ key ] );

  return (
    // Container
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={"#000000"} />
      <List data={currentList}  />
      <ActionBar onAddItem={handleAddItem} />
    </KeyboardAvoidingView>
  );

}
