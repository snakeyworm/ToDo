
import React, { useEffect, useRef, } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    Animated,
} from "react-native";

const styles = StyleSheet.create( {
    container: {
        position: "absolute",
        top: "90%", // TODO Figure out how to maintain View distance from bottom when Keyboard is activated
        height: 40,
        width: "100%",
        flexDirection: "row-reverse",
        backgroundColor: "#00000000",
    },
    plusIcon: {
        width: "10%",
        height: "100%",
        marginRight: "5%",
    }
} );

export default function ActionBar() {

    return (
        <Animated.View
            behavior= {Platform.OS == "ios" ? "padding" : "height" }
            style={{
                ...styles.container,
            }}
        >
            <Image
                style={styles.plusIcon}
                source={require( "../assets/icons/add.png" )}>    
            </Image>
        </Animated.View>
    );

}
