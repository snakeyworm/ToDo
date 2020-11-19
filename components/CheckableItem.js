
import React, { useCallback, useState } from "react";
import { View, TouchableWithoutFeedback, StyleSheet, PixelRatio, Dimensions } from "react-native";
import Item from "./Item";

// Styling

const width = Dimensions.get( "window" ).width;
const height = Dimensions.get( "window" ).height;

const styles = StyleSheet.create( {
    container: {
        // flex: 1,
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
        props.onCheck();
    } );

    // Handle long press
    const handleLongPress = useCallback( () => {
        setChecked( !checked );
        props.onLongPress();
    } );

    return (
        // Container
        <View style={styles.container}>
            {/* Toggle button */}
            <TouchableWithoutFeedback
                onPress={handlePress}
                onLongPress={handleLongPress}
            >
                <View style={{
                    width: width * 0.1,
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
                style={{
                    width: width * 0.5,
                    marginLeft: width * 0.025,
                }}
                itemName={props.itemName}
                editable={props.editable}
                onRename={props.onRename}
                allowEmpty={true}
            />
        </View>
    );

}
