
import React, { useCallback } from "react";
import { View, Text, StyleSheet, Animated, PixelRatio, Dimensions } from "react-native";
import Item from "./Item";
import ToDoPage from "./ToDoPage";

// Styling

const width = Dimensions.get( "window" ).width;
const height = Dimensions.get( "window" ).height;

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
    heading: {
        fontSize: PixelRatio.getFontScale() * width * 0.1,
        height: height * 0.1,
    }
} );

// Component for showing user saved lists
export default function HomeList( props ) {

    const getKey = useCallback( ( _, index ) =>
        `${index}`
    );

    // Render list
    const handleRender = useCallback( ( { item } ) => {

        const onItemClick = () => {
            props.onItemClick( item )
        };

        return (
            <View
                onStartShouldSetResponder={() => true}
                onResponderRelease={onItemClick}
                style={styles.itemContainer}
            >
                <Text 
                    style={{
                        ...styles.itemText,
                        fontFamily: "LemonMilk",
                    }}>
                    {item.name}
                </Text>
            </View>
        );

    } );

    return ( <ToDoPage 
        header={
            <Item
                style={styles.heading}
                itemName={"ToDo"}
                editable={false}
            />
        }
        data={props.data}
        onRender={handleRender}
        getKey={getKey}
    />)
    

}
