
import React, { useCallback } from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import Item from "./Item";

const styles = StyleSheet.create( {
    list: {
        flex: 1,
        backgroundColor: "#000000",
    },
} );

// Component for showing user saved lists
export default function HomeList( props ) {

    const getKey = useCallback( ( _, index ) =>
        `${index}`
    );

    const handleRender = useCallback( ( { item } ) => {

        const onItemClick = () => {
            props.onItemClick( item )
        };

        return ( <TouchableOpacity 
            onPress={onItemClick}
            onLongPress={onItemClick}
        >
            <Item
                itemName={item}
                editable={false}
            />
        </TouchableOpacity> );
        }
    );

    return (
        <FlatList 
            style={styles.list}
            data={props.keys}
            renderItem={handleRender}
            keyExtractor={getKey}
        />
    )

}
