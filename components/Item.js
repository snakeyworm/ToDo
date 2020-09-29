
import React, { useCallback, useState } from "react";
import { Text, View, TouchableWithoutFeedback, TextInput, StyleSheet, PixelRatio, useWindowDimensions } from "react-native";
import { useFonts } from "expo-font";

const styles = StyleSheet.create( {
    container: {
        // flex: 0.5,
        flexDirection: "row",
        borderRadius: 20,
    },
    checkBox: {
        width: PixelRatio.getPixelSizeForLayoutSize( 20 ),
        height: PixelRatio.getPixelSizeForLayoutSize( 20 ),
        borderRadius: 100,
    },
    itemText: {
        flex: 0.75,
        fontSize: PixelRatio.getFontScale() * PixelRatio.getPixelSizeForLayoutSize( 20 ),
        color: "#ffffff",
    }
} );

export default function Item( props ) {

    let [ itemName, setItemName ] = useState( props.itemName );
    let [ checked, setChecked ] = useState( props.checked );

    const handlePress = useCallback( () => {
        setChecked( !checked );
    } );

    const handleTextChange = useCallback( ( text ) => {
        setItemName( text );
    } );

    let [ loaded, error ] = useFonts( {
        LemonMilk: require( "../assets/fonts/LemonMilkRegular-X3XE2.otf" )
    } );

    let fontFamily = "LemonMilk";

    if ( !loaded ) {
        fontFamily = null;
    }

    return (
        <View style={styles.container}>
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
