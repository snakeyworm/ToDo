
import React, { useCallback, } from "react";
import {
    View,
    TouchableOpacity,
    StyleSheet,
    Image,
    Dimensions,
    Alert,
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
            {
            props.onHome ? 
            <TouchableOpacity 
                onPress={props.onHome}
                onLongPress={props.onHome}
            >
                <Image // TODO find a way to move the home icon up.
                    style={styles.icon}
                    source={require( "../assets/icons/home.png" )}>
                </Image>
            </TouchableOpacity> :
            null
            }
            {
            props.onDelete ?
            <TouchableOpacity 
                onPress={handleDelete}
                onLongPress={handleDelete}
            >
                <Image
                    style={styles.icon}
                    source={require( "../assets/icons/trash.png" )}>
                </Image>
            </TouchableOpacity> :
            null
            }
        </View>
    );

}
