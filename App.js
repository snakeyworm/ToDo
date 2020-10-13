
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
import UserList from "./src/UserList";
import UserItem from "./src/UserItem";
import AsyncStorage from "@react-native-community/async-storage";

// Constants

const NEW_LIST_NAME = "New list";
const NEW_ITEM_NAME = "New item";

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

  let [ savedLists, setSavedLists ] = useState( [] );

  let [ list, setList ] = useState( {} );
  let [ listData, setListData ] = useState( [] );

  // Is user on homescreen
  let [ isHome, setIsHome ] = useState( true );

  // Event handlers

  // Create a new list
  const newList = useCallback( async () => {

      const key = savedLists.length.toString( 16 );

      setSavedLists(
        savedLists.concat( [
          new UserList(
            NEW_LIST_NAME,
            key,
          )
        ] )
      );

      // TODO Eventually remove boilerplate code 
      try {
        await AsyncStorage.setItem( key, JSON.stringify( [] ) );
      } catch ( e ) {
        console.error( e ); // TODO Add better error handling
      }

  } );

  // Create new item
  const newItem = useCallback( async () => {
    // TODO Remove boilerplate code eventually
    try {

      const newListData = listData.concat(
        new UserItem(
          NEW_ITEM_NAME,
          false,
        )
      )

      setListData( newListData );

      await AsyncStorage.setItem(
        list.key,
        JSON.stringify( newListData )
      );

    } catch ( e ) {
      console.error( e ); // TODO Add better error handling
    }
  } );

  // Go to home screen
  const handleHome = useCallback( () => {
    setIsHome( true );
  } );

  // Open list
  const handleItemClick = useCallback( async ( item ) => {
    try {

      const data = await AsyncStorage.getItem( item.key );

      if ( data ) {
        setList( item );
        setListData( JSON.parse( data ) );
        setIsHome( false );
      } else {
        console.error( "List not found" ); // TODO Add better error handling
      }

    } catch ( e ) {
      console.error( e ); // TODO Add better error handling
    }
  } );

  // Lifecycle
  useEffect( () => {


    ( async () => {
      // TODO Remove when done testing
      try {
        await AsyncStorage.clear();
      } catch ( e ) {
        console.error( e );
      }
    } )();

    ( async () => {
      try {

        const data = await AsyncStorage.getItem( "saved_lists" );

        if ( data ) {
          setSavedLists( JSON.parse( data ) );
        } else {
          setSavedLists( [] );
        }

      } catch ( e ) {
        console.error( e ); // TODO Add better error handling
      }

    } )();

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
          list={list}
          data={listData}
        />
      }
      <ActionBar
        onPlus={isHome ? newList : newItem}
        onHome={handleHome}
      />
    </KeyboardAvoidingView>
  );

}
