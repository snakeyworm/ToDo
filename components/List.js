
import React, { useCallback, useRef, useEffect } from "react";
import { StyleSheet, Dimensions, PixelRatio, Animated, } from "react-native";
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
    }
} );

// Component for rending user items
export default function List( props ) {

    const opacity = useRef( new Animated.Value( 0 ) ).current;

    // Callbacks

    const getKey = useCallback( ( item ) => `${item.UUID}` );

    const handleRender = useCallback( ( { item, index } ) => {

        let itemComponent = <CheckableItem
            itemName={item.name}
            checked={item.checked}
            editable={true}
            onLongPress={() => { props.onDeleteItem( item ) }}
            onRename={( newName ) => { props.onItemRename( item, newName ) }}
            onCheck={() => { props.onCheck( item ) }}
        />;

        // Play add animation if is a new item
        if ( index === props.data.length - 1 ) {

            const x = new Animated.Value( width );

            Animated.timing( x, {
                toValue: 0,
                timing: 2000,
                useNativeDriver: true,
            } ).start();

            itemComponent = <Animated.View
                style={{
                    transform: [ {
                        translateX: x,
                    } ],
                }}
            >
                {itemComponent}
            </Animated.View>

        }

        return itemComponent;

    } );

    // Opening animation
    useEffect( () => {

        Animated.timing( opacity, {
            toValue: 1,
            timing: 2000,
            useNativeDriver: true,
        } ).start();

    }, [] );

    return ( <ToDoPage
        header={
            <Animated.View
                style={{
                    opacity,
                    transform: [ {
                        translateX: opacity.interpolate( {
                            inputRange: [ 0, 1 ],
                            outputRange: [ width, 0 ],
                        } )
                    } ]
                }}
            >
                <Item
                    style={styles.heading}
                    itemName={props.list.name}
                    editable={true}
                    onRename={( newName ) => { props.onListRename( newName ) }}
                />
            </Animated.View>
        }
        data={props.data}
        onRender={handleRender}
        getKey={getKey}
    /> );

}
