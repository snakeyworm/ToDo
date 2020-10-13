
import React, { useCallback } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, PixelRatio, Dimensions } from "react-native";
import { useFonts } from "expo-font";

// Styling

const width = Dimensions.get( "window" ).width;

const styles = StyleSheet.create( {
    list: {
        flex: 1,
        backgroundColor: "#000000",
    },
    itemContainer: {
        width: 10000,
        padding: 10
    },
    itemText: {
        fontSize: PixelRatio.getFontScale() * width * 0.075,
        textAlign: "left",
        color: "#ffffff",
    },
} );

// Component for showing user saved lists
export default function HomeList( props ) {

    const getKey = useCallback( ( _, index ) =>
        `${index}`
    );

    let [ loaded, error ] = useFonts( {
        LemonMilk: require( "../assets/fonts/LemonMilkRegular-X3XE2.otf" )
    } );

    let fontFamily = "LemonMilk";

    if ( !loaded ) {
        fontFamily = null;
    }

    // Render list
    const handleRender = useCallback( ( { item } ) => {

        const onItemClick = () => {
            props.onItemClick( item )
        };

        return (
            <View
                onStartShouldSetResponder={() => true}
                onResponderGrant={() => {}} // TODO Maybe add a touch animation here
                onResponderRelease={onItemClick}
                style={styles.itemContainer}
            >
                <Text 
                style={{
                    ...styles.itemText,
                    fontFamily,
                }}>
                    {item.name}
                </Text>
            </View>
        );

    } );

    return (
        <FlatList
            style={styles.list}
            data={props.keys}
            renderItem={handleRender}
            keyExtractor={getKey}
        />
    )

}
