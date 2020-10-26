
import React, { useCallback, useState, } from "react";
import { TextInput, StyleSheet, PixelRatio, Dimensions, } from "react-native";
import { useFonts } from "expo-font";

// Styling

const width = Dimensions.get( "window" ).width;

const styles = StyleSheet.create( {
    itemText: {
        fontSize: PixelRatio.getFontScale() * width * 0.075,
        textAlign: "left",
        color: "#ffffff",
    }
} );

// Component for item in non-checkable item
export default function Item( props ) {

    // Handle state
    let [ itemName, setItemName ] = useState( props.itemName );

    // Change state

    const handleTextChange = useCallback( ( text ) => {
        setItemName( text );
        props.onRename( text );
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
        <TextInput
            style={{
                ...styles.itemText,
                fontFamily,
                ...props.style,
            }}
            editable={props.editable}
            onChangeText={handleTextChange}
            value={loaded ? itemName : error}
        />
    );

}
