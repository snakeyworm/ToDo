
import React, { useEffect, useRef, } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";

const styles = StyleSheet.create( {
    container: {
        flex: 0.15,
        flexDirection: "column-reverse",
        alignItems: "center",
        backgroundColor: "#ffd700",
        borderRadius: 20,
    },
    plusIcon: {
        width: "75%",
        height:  "10%",
        marginRight: 5,
    }
} );

export default function ActionBar() {

    return (
        <View
            style={{
                ...styles.container,   
            }}
        >
            <Image
                style={styles.plusIcon}
                source={require( "../assets/icons/add.png" )}>    
            </Image>
        </View>
    );

}
