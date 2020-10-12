
import React, { useCallback, useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native"
import HomeList from "./components/HomeList";
import List from "./components/List";
import ActionBar from "./components/ActionBar";

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

  const savedLists = [];
  const name = "Test";
  const list = []

  // Is user on homescreen
  let [ isHome, setIsHome ] = useState( true );

  // Event handlers

  // Create a new list
  const newList = useCallback( () => {

  } );

  // Create new item
  const newItem = useCallback( () => {
    console.log( "Adding new item" );
  } );

  // Go to home screen
  const handleHome = useCallback( () => {
    setIsHome( true );
  } );

  // Open list
  const handleItemClick = useCallback( ( item ) => {

  } );

  // Lifecycle
  useEffect( () => {

  }, [] );

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
        <HomeList
          keys={savedLists}
          onItemClick={handleItemClick}
        /> :
        <List
          name={name}
          data={list}
        />
      }
      <ActionBar
        onPlus={isHome ? newList : newItem}
        onHome={handleHome}
      />
    </KeyboardAvoidingView>
  );

}
