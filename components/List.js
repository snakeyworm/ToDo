
import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import Item from "./Item";

// Styling

const styles = StyleSheet.create( {
    list: {
        flex: 1,
        backgroundColor: "#000000",
    },
} )

// Component for rending user items
export default function List( props ) {

    const getKey = useCallback( ( _, index ) =>
        `${index}`
    );

    // Render item
    const handleRender = useCallback( ( { item, index } ) => {
        return <Item
            itemName={item.name}
            checked={item.checked}
        />
    } );

    return (
        <FlatList
            style={styles.list}
            data={props.data}
            renderItem={handleRender}
            keyExtractor={getKey}
        />
    )

}
