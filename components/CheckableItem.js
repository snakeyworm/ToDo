
import React, { useCallback, useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, PixelRatio, Dimensions } from "react-native";
import Item from "./Item";

// Styling

const width = Dimensions.get( "window" ).width;
const height = Dimensions.get( "window" ).height;

const styles = StyleSheet.create( {
    container: {
        height: height * 0.1,
        flexDirection: "row",
    },
    checkBox: {
        width: width * 0.1,
        height: width * 0.1,
        borderRadius: width * 30,
    },
} );

// Component for item in checkable item
export default function CheckableItem( props ) {

    // Handle state
    let [ checked, setChecked ] = useState( props.checked );

    // Handle press
    const handlePress = useCallback( () => {
        setChecked( !checked );
    } );

    return (
        // Container
        <View style={styles.container}>
            {/* Toggle button */}
            <TouchableWithoutFeedback
                onPress={handlePress}
                onLongPress={handlePress}
            >
                <View style={{
                    flex: 0.2,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <View style={{
                        backgroundColor: checked ? "#ffd700" : "#ffffff",
                        ...styles.checkBox
                    }} />
                </View>
            </TouchableWithoutFeedback>
            {/* Name field*/ }
            <Item 
                itemName={props.itemName}
                editable={props.editable}
            />
        </View>
    );

}
