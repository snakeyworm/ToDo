
import React, { useState, useRef, useCallback, useEffect, } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Alert,
    Animated,
    PixelRatio
} from "react-native";

// Styling

const width = Dimensions.get( "window" ).width;
const height = Dimensions.get( "window" ).height;

const ICON_SIZE = height * 0.15 / 2; // Parent flex * Scale factor
const HL_BUTTONS_MAX_Y = ( 1 - 0.23 ) * height + ICON_SIZE;// Max Y for HomeList button view
const L_BUTTONS_MAX_Y = ( 1 - 0.23 ) * height;// Max Y for HomeList button view

const styles = StyleSheet.create( {
    container: {
        flex: 0.15,
        alignItems: "center",
        backgroundColor: "#ffd700",
        borderRadius: width * 0.05,
    },
    buttonContainer: {
        position: "absolute",
        height: height * 0.15, // Parent flex * Scale factor for two icons
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
    },
} );

// Animatable TouchableOpacity
const AnimatedTouchableOpacity = Animated.createAnimatedComponent( TouchableOpacity );

// Container component for app actions
export default function ActionBar( props ) {

    let opacity = useRef( new Animated.Value( 0 ) ).current;

    // Prompt user to confirm delete
    const handleDelete = useCallback( () => {
        Alert.alert(
            "Delete List",
            `Are you sure you want to delete this list?`,
            [
                {
                    text: "No",
                },
                {
                    text: "Yes",
                    onPress: () => {
                        props.onDelete()
                    },
                    style: "destructive"
                }
            ]
        )
    } );

    // Opening animation
    useEffect( () => {

        Animated.timing( opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        } ).start();

        // Reset opacity
        return () => {
            opacity.setValue( 0 )
        }

    }, [ props.isHome ] );

    return (
        // Container
        <View
            style={{
                ...styles.container,
            }}
        >
            {
                props.onHome ?
                    <AnimatedTouchableOpacity
                        onPress={props.onHome}
                        onLongPress={props.onHome}
                        style={{
                            marginTop: height * 0.02,
                            opacity,
                        }}
                    >
                        <Image
                            style={styles.icon}
                            source={require( "../assets/icons/home.png" )}>
                        </Image>
                    </AnimatedTouchableOpacity> :
                    null
            }
            {/* Add item button */}
            <Animated.View style={{
                ...styles.buttonContainer,
                transform: [ {
                    translateY: opacity.interpolate( {
                        inputRange: [ 0, 1, ],
                        outputRange: [
                            0,
                            props.onDelete ? L_BUTTONS_MAX_Y : HL_BUTTONS_MAX_Y,
                        ],
                    } ),
                } ],
            }}>
                {
                    props.onDelete ?
                        <AnimatedTouchableOpacity
                            onPress={handleDelete}
                            onLongPress={handleDelete}
                            style={{
                                opacity,
                            }}
                        >
                            <Image
                                style={styles.icon}
                                source={require( "../assets/icons/trash.png" )}>
                            </Image>
                        </AnimatedTouchableOpacity> :
                        null
                }
                <AnimatedTouchableOpacity
                    onPress={props.onPlus}
                    onLongPress={props.onPlus}
                    style={{
                        opacity,
                    }}
                >
                    <Image
                        style={{
                            ...styles.icon,
                        }}
                        source={require( "../assets/icons/add.png" )}>
                    </Image>
                </AnimatedTouchableOpacity>
            </Animated.View>
        </View>
    );

}
