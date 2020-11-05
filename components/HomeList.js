
import React, { useCallback, useEffect, } from "react";
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
        fontFamily: "LemonMilk",
        color: "#ffffff",
    }
} );

// Component for showing user saved lists
export default function HomeList( props ) {

    const opacity = new Animated.Value( 0 );

    const getKey = useCallback( ( _, index ) =>
        `${index}`
    );

    // Opening animation
    useEffect( () => {

        Animated.timing( opacity, {
            toValue: 1,
            timing: 2000,
            useNativeDriver: true,
        } ).start();

    }, [] );
    
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
            <Animated.Text
                style={{
                    ...styles.heading,
                    opacity,
                    transform: [ {
                        translateX : opacity.interpolate( {
                            inputRange: [ 0, 1 ],
                            outputRange: [ width, 0 ],
                        } )
                    } ],
                }}
            >TODO
            </Animated.Text>
        }
        data={props.data}
        onRender={handleRender}
        getKey={getKey}
    />)
    

}
