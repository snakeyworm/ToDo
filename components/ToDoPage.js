
import React, { useCallback } from "react";
import { View, FlatList, StyleSheet, Dimensions, PixelRatio, } from "react-native";
import Item from "./Item";

// Styling

const width = Dimensions.get( "window" ).width;
const height = Dimensions.get( "window" ).height;

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        backgroundColor: "#000000",
    },
    heading: {
        fontSize: PixelRatio.getFontScale() * width * 0.1,
        height: height * 0.1,
    }
} )

// Component for rending user items
export default function ToDoPage( props ) {

    return (
        <View
            style={styles.container}
        >
            <View
                style={{
                    borderBottomColor: "#ffffff",
                    borderBottomWidth: height * 0.01,
                }}
            >
                {props.header}
            </View>
            <FlatList
                style={styles.list}
                data={props.data}
                renderItem={props.onRender}
                keyExtractor={props.getKey}
            />
        </View>
    )

}
