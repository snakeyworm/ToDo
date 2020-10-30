
import React, { useCallback } from "react";
import { StyleSheet, Dimensions, PixelRatio, } from "react-native";
import Item from "./Item";
import CheckableItem from "./CheckableItem";
import ToDoPage from "./ToDoPage";

// Styling

const width = Dimensions.get( "window" ).width;
const height = Dimensions.get( "window" ).height;

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: "space-evenly",
        backgroundColor: "#000000",
    },
    heading: {
        fontSize: PixelRatio.getFontScale() * width * 0.1,
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
            onLongPress={() => { props.onDeleteItem( item ) }}
            onRename={( newName ) => { props.onItemRename( item, newName ) }}
            onCheck={() => { props.onCheck( item ) }}
        />
    } );

    return ( <ToDoPage
        header={
            <Item
                style={styles.heading}
                itemName={props.list.name}
                editable={true}
                onRename={( newName ) => { props.onListRename( newName ) }}
            />
        }
        data={props.data}
        onRender={handleRender}
        getKey={getKey}
    /> );

}
