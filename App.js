
import React from "react";
import { 
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  PixelRatio,
  Dimensions
} from "react-native"
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

  return (
    // Container
    <KeyboardAvoidingView
      behavior= {Platform.OS == "ios" ? "padding" : null }
      style={styles.container}
    >
      <StatusBar barStyle={"light-content"} backgroundColor={"#000000"} />
      {/* Show current list */}
      <List data={[
       { name: "Item1", checked: true },
       { name: "Item2", checked: true },
       { name: "Item3", checked: false },
       { name: "Item4", checked: true },
       { name: "Item5", checked: false },
      ]}/>
      <ActionBar />
    </KeyboardAvoidingView>
  );

}
