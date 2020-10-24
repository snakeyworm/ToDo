
import React, { useCallback } from "react";
import { View, FlatList, StyleSheet, Dimensions } from "react-native";
import Item from "./Item";
import CheckableItem from "./CheckableItem";

// Styling

const height = Dimensions.get( "window" ).height;

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        backgroundColor: "#000000",
    },
    heading: {
        height: height * 0.1,
    }
} )

// Component for rending user items
export default function List( props ) {

    const getKey = useCallback( ( item ) => `${item.UUID}` );

    const handleRender = useCallback( ( { item } ) => {
        return <CheckableItem
            itemName={item.name}
            checked={item.checked}
            editable={true}
            onLongPress={() => {props.onDeleteItem( item ) }}
        />
    } );

    return (
        <View
            style={styles.container}
        >
            <Item // TODO Change styling to look more spiffy
                style={styles.heading}
                itemName={props.list.name}
                editable={true}
            />
            <FlatList
                style={styles.list}
                data={props.data}
                renderItem={handleRender}
                keyExtractor={getKey}
            />
        </View>
    )

}
