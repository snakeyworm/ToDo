
import React, { useCallback } from "react";
import { FlatList, StyleSheet } from "react-native";
import Item from "./Item";

const styles = StyleSheet.create( {
    list: {
        flex: 1,
        marginTop: "5%",
        backgroundColor: "#ffffff",
    },
} )

export default function List( props ) {

    const handleRender = useCallback( ( { item } ) =>
        <Item
            itemName={item.name}
            checked={item.checked}
        />
    );

    return (
        <FlatList
            style={styles.list}
            data={props.data}
            renderItem={handleRender}
        />
    )

}
