
import React, { useCallback, useState } from "react";
import { Text, View, TouchableWithoutFeedback, TextInput, StyleSheet, PixelRatio, Dimensions } from "react-native";
import { useFonts } from "expo-font";

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
    itemText: {
        flex: 0.75,
        fontSize: PixelRatio.getFontScale() * width * 0.075,
        textAlign: "left",
        color: "#ffffff",
    }
} );

// Component for item in List
export default function Item( props ) {

    // Handle state
    let [ itemName, setItemName ] = useState( props.itemName );
    let [ checked, setChecked ] = useState( props.checked );

    // Change state

    const handlePress = useCallback( () => {
        setChecked( !checked );
    } );

    const handleTextChange = useCallback( ( text ) => {
        setItemName( text );
    } );

    // Load fonts

    let [ loaded, error ] = useFonts( {
        LemonMilk: require( "../assets/fonts/LemonMilkRegular-X3XE2.otf" )
    } );

    let fontFamily = "LemonMilk";

    if ( !loaded ) {
        fontFamily = null;
    }

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
            <TextInput
                style={{
                    ...styles.itemText,
                    fontFamily,
                }}
                editable={true}
                onChangeText={handleTextChange}
                value={loaded ? itemName : error}
            />
        </View>
    );

}
