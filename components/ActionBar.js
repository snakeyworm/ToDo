
import React, { useCallback, } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
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
    icon: {
        width: width*0.15 * 0.75,
        height: width*0.15 * 0.75,
    },
} );

// Container component for app actions
export default function ActionBar( props ) {
    
    return (
        // Container
        <View
            style={{
                ...styles.container,  
            }}
        >
            {/* Add item button */}
            <TouchableOpacity 
                onPress={props.onPlus}
                onLongPress={props.onPlus}
            >
                <Image
                    style={{
                        ...styles.icon,
                        marginBottom: height * 0.01,
                    }}
                    source={require( "../assets/icons/add.png" )}>
                </Image>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={props.onHome}
                onLongPress={props.onHome}
            >
                <Image // TODO find a way to move the home icon up.
                    style={styles.icon}
                    source={require( "../assets/icons/home.png" )}>
                </Image>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={props.onDelete}
                onLongPress={props.onDelete}
            >
                <Image
                    style={styles.icon}
                    source={require( "../assets/icons/trash.png" )}>
                </Image>
            </TouchableOpacity>
        </View>
    );

}
