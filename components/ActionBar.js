
import React, { useEffect, useRef, } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    PixelRatio,
    Dimensions,
} from "react-native";

// Styling

const width = Dimensions.get( "window" ).width;
const height = Dimensions.get( "window" ).height;

const styles = StyleSheet.create( {
    container: {
        flex: 0.15,
        flexDirection: "column-reverse",
        alignItems: "center",
        backgroundColor: "#ffd700",
        borderRadius: width * 0.05,
    },
    plusIcon: {
        width: width*0.15 * 0.75,
        height: width*0.15 * 0.75,
        marginBottom: height * 0.025,
    },
} );

// Container component for app actions
export default function ActionBar() {

    return (
        // Container
        <View
            style={{
                ...styles.container,   
            }}
        >
            {/* Add item button */}
            <Image
                style={styles.plusIcon}
                source={require( "../assets/icons/add.png" )}>    
            </Image>
        </View>
    );

}
