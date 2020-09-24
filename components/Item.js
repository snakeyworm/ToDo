
import React, { useCallback, useState } from "react";
import { Text, View, TouchableWithoutFeedback, TextInput, StyleSheet, PixelRatio } from "react-native";
import { useFonts } from "expo-font";

const styles = StyleSheet.create( {
    container: {
        height: 100,
        flexDirection: "row",
        backgroundColor: "#7a7a7a",
    },
    checkBox: {
        width: 30,
        height: 30,
        borderRadius: 100,
    },
    itemText: {
        flex: 0.75,
        fontSize: PixelRatio.getFontScale() * 40,
        fontFamily: "LemonMilk",
        color: "#0e22e1",
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

    if ( !loaded ) {
        return <Text>{error}</Text> // TODO Find better error handling solution
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
                        backgroundColor: checked ? "#00ff00" : "#ffffff",
                        ...styles.checkBox
                    }} />
                </View>
            </TouchableWithoutFeedback>
            <TextInput
                style={styles.itemText}
                editable={true}
                onChangeText={handleTextChange}
                value={loaded ? itemName : error}
            />
        </View>
    );

}
