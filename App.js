
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  AppState,
} from "react-native"
import HomeList from "./components/HomeList";
import List from "./components/List";
import ActionBar from "./components/ActionBar";
import AsyncStorage from "@react-native-community/async-storage";

// Name of newly created lists
const NEW_LIST_NAME = "New list";

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

  // State

  // Lists of names of user saved lists
  let [ savedLists, setSavedLists ] = useState( [] );

  // Name and data of current list
  let [ name, setName ] = useState( "" );
  let [ list, setList ] = useState( [] );

  // Is user on homescreen
  let [ isHome, setIsHome ] = useState( true );

  // Method for storing data
  const storeData = async ( key, value ) => {
    try {
      await AsyncStorage.setItem( key, JSON.stringify( value ) )
    } catch ( e ) {
      console.error( e );
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

  // Create a new list
  const newList = useCallback( () => {

    // Load list into view
    setName( NEW_LIST_NAME );
    setList( [] );
    setIsHome( false );

    // Put new list in data
    setSavedLists( savedLists.concat( [ NEW_LIST_NAME ] ) );
    storeData( savedLists.length.toString(), [] );
    storeData( "saved_lists", savedLists.concat( NEW_LIST_NAME ) ); // Save all list names
    
  } );

  const newItem = useCallback( () => {
    console.log( "Adding new item" );
  } );

  const handleHome = useCallback( () => {
    setIsHome( true );
  } );

  useEffect( () => {

    // Load user data
    ( async () => {

      try {
        const data = await AsyncStorage.getItem( "saved_lists" );

        if ( data ) {
          setSavedLists( JSON.parse( data ) );
        }

      } catch ( e ) {
        alert( "Data error(Get)" ); // TODO add better error handling
      }

    } )();

  }, [] );

  // Simulate

  // name = "list1"

  // list = [
  //   { name: "Item1", checked: true, },
  //   { name: "Item2", checked: true, },
  //   { name: "Item3", checked: true, },
  //   { name: "Item4", checked: true, },
  //   { name: "Item5", checked: true, },
  // ];

  return (
    // Container
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"#000000"}
      />
      {isHome ?  // TODO Fix display on tablets(Doesn't start at top)
        <HomeList keys={savedLists} /> :
        <List name={name} data={list} />
      }
      <ActionBar
        onPlus={isHome ? newList : newItem}
        onHome={handleHome}
      />
    </KeyboardAvoidingView>
  );

}
