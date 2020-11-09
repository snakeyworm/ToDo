
import React, { useCallback, useEffect, useState, } from "react";
import {
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  TextInputComponent,
  Alert,
} from "react-native"
import HomeList from "./components/HomeList";
import List from "./components/List";
import ActionBar from "./components/ActionBar";
import UserList from "./src/UserList";
import UserItem from "./src/UserItem";
import AsyncStorage from "@react-native-community/async-storage";
import { playSound } from "./src/SoundUtil";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";

// Constants

const NEW_LIST_NAME = "New list";
const NEW_ITEM_NAME = "New item";

// Styling

const height = Dimensions.get( "window" ).height;
let fontFamily = "LemonMilk";

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: height * 0.04,
    backgroundColor: "#000000",
  }
} );

// TODO Make app look cleaner with animations
// TODO Ensure a portable layout on all devices
// TODO Consider performance optimizations in the future
//      Maybe have a useEffect that updates all data when a state variable
//      is changed.
// Main component
export default function App() {
  
  // State

  let [ savedLists, setSavedLists ] = useState( [] );

  let [ list, setList ] = useState( {} );
  let [ listData, setListData ] = useState( [] );

  // Is user on homescreen
  let [ isHome, setIsHome ] = useState( true );

  const [ reRender, setReRender ] = useState( false );

  // Font

  let [ loaded, error ] = useFonts( {
    "LemonMilk": require( "./assets/fonts/LemonMilkRegular-X3XE2.otf" ),
  } );

  // Event handlers

  // Create a new list
  const newList = useCallback( async () => {

    const key = savedLists.length.toString( 16 );

    const newSavedList = savedLists.concat( [
      new UserList(
        NEW_LIST_NAME,
        key,
      )
    ] );

    setSavedLists( newSavedList );

    // Save data in AsyncStorage
    try {
      await AsyncStorage.setItem( "saved_lists", JSON.stringify( newSavedList ) );
      await AsyncStorage.setItem( key, "[]" );
    } catch ( e ) {
      console.error( "Data error" );
    }

  } );

  // Delete a list
  const deleteList = useCallback( async () => {

    const key = list.key;
    savedLists.splice( savedLists.indexOf( list ), 1 );

    setList( {} );
    setListData( [] );
    setSavedLists( savedLists );
    setIsHome( true );

    try {
      await AsyncStorage.removeItem( key );
      await AsyncStorage.setItem( "saved_lists", JSON.stringify( savedLists ) );

      playSound( require( "./assets/sounds/paper_crumple.mp3" ) );

    } catch ( e ) {
      console.error( "Data error" );
    }

  } );

  // Create new item
  const newItem = useCallback( async () => {
    try {

      const newListData = listData.concat(
        new UserItem(
          NEW_ITEM_NAME,
          false,
          list.nextUUID.toString()
        )
      );

      list.nextUUID++;

      setListData( newListData );

      // Save list in storage
      await AsyncStorage.setItem(
        list.key,
        JSON.stringify( newListData )
      );

      // Save list metadata in storage
      await AsyncStorage.setItem(
        "saved_lists",
        JSON.stringify( savedLists ),
      );

    } catch ( e ) {
      console.error( "Data error" );
    }
  } );

  // Delete the given item TODO Further integrate deleteItem
  const deleteItem = useCallback( async ( item ) => {

    listData.splice( listData.indexOf( item ), 1 )
    setListData( listData );
    setReRender( !reRender ); // Force re-render

    // Delete item in AsyncStorage
    try {
      await AsyncStorage.setItem( list.key, JSON.stringify( listData ) );
    } catch ( e ) {
      console.error( "Data error" );
    }

  } );

  // Rename an item
  const renameItem = useCallback( async ( item, newName ) => {

    // Rename item
    item.name = newName;

    // Rename item in stroage
    try {

      await AsyncStorage.setItem(
        list.key,
        JSON.stringify( listData )
      );

    } catch ( e ) {
      console.error( "Data error" );
    }

  } );

  // Rename a list
  const renameList = useCallback( async ( newName ) => {

    // Rename list in storage
    list.name = newName;

    // Rename list in storage
    try {
      await AsyncStorage.setItem( "saved_lists", JSON.stringify( savedLists ) );
    } catch ( e ) {
      console.error( "Data error" );
    }

  } );

  // Check an item
  const checkItem = useCallback( async ( item ) => {

    // Check item
    item.checked = !item.checked;

    // Check item in storage
    try {
      await AsyncStorage.setItem(
        list.key,
        JSON.stringify( listData )
      );
    } catch ( e ) {
      console.error( "Data error" );
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
        console.error( "Data error" );
      }

    } catch ( e ) {
      console.error( "Data error" );
    }
  } );

  // Lifecycle
  useEffect( () => {

    // TODO Remove when done testing
    ( async () => {
      try {
        await AsyncStorage.clear();
      } catch ( e ) {
        console.error( "Data error" );
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
        console.error( "Data error" );
      }
    } )();

  }, [] );

  return loaded ? (
    // Container
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={"#000000"}
      />
      {isHome ?
        <HomeList
          data={savedLists}
          onItemClick={handleItemClick}
        /> :
        <List
          list={list}
          data={listData}
          onDeleteItem={deleteItem}
          onListRename={renameList}
          onItemRename={renameItem}
          onCheck={checkItem}
        />
      }
      <ActionBar
        isHome={isHome}
        onPlus={isHome ? newList : newItem}
        onHome={isHome ? null : handleHome}
        onDelete={isHome ? null : deleteList}
      />
    </KeyboardAvoidingView>
  ) : <AppLoading />;

}
