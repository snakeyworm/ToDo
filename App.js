
import React from "react";
import { 
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import List from "./components/List";
import ActionBar from "./components/ActionBar";

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    marginTop: "5%",
    backgroundColor: "#000000",
  }
} );

export default function App() {

  return (
    <KeyboardAvoidingView
      behavior= {Platform.OS == "ios" ? "padding" : "height" }
      style={styles.container}
    >
      <StatusBar backgroundColor={"#000000"} />
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
