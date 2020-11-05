
import React, { useState, useCallback, useEffect, } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Alert,
    Animated,
} from "react-native";

// Styling

const width = Dimensions.get( "window" ).width;
const height = Dimensions.get( "window" ).height;

const ICON_SIZE = width * 0.15 * 0.75; // Parent flex * Scale factor

const HL_BUTTONS_MAX_Y = height - height * 0.12; // Max Y for HomeList button view
const L_BUTTONS_MAX_Y = height - height * 0.12 - height * 0.02 - height * 0.12; // Max Y for List button view

const styles = StyleSheet.create( {
    container: {
        flex: 0.15,
        alignItems: "center",
        backgroundColor: "#ffd700",
        borderRadius: width * 0.05,
    },
    buttonContainer: {
        // height: iconSize * 2, // Parent flex * Scale factor for two icons
    },
    icon: {
        width: ICON_SIZE,
        height: ICON_SIZE,
    },
} );

// Container component for app actions
export default function ActionBar( props ) {

    let updateAnim = useState( false );
    let opacity = new Animated.Value( 0 );

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

    // TODO Fix animation so it only runs when pages are switched
    // Opening animation
    useEffect( () => {

        Animated.timing( opacity, {
            toValue: 1,
            timing: 2000,
            useNativeDriver: true,
        } ).start();

    }, [ updateAnim ] );

    // Animatable TouchableOpacity
    const AnimatedTouchableOpacity = Animated.createAnimatedComponent( TouchableOpacity );

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
                            props.onDelete ? L_BUTTONS_MAX_Y : HL_BUTTONS_MAX_Y, // TODO Fix HomeList/List views
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
