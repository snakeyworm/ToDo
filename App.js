
import React from "react";
import { View, StyleSheet, } from "react-native"
import List from "./components/List";

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  }
} );

export default function App() {

  return (
    <View style={styles.container}>
      <List data={[
       { name: "Item1", checked: true },
       { name: "Item2", checked: true },
       { name: "Item3", checked: false },
       { name: "Item4", checked: true },
       { name: "Item5", checked: false },
      ]}/>
    </View>
  );

}
