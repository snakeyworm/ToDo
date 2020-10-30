
import { Audio } from "expo-av";

// Convenience method for playing a sound
export async function playSound( source ) {

    const sound = new Audio.Sound();

    // Unload sound when finished
    sound.setOnPlaybackStatusUpdate( async ( status ) => {
        if ( status.didJustFinish ) {
            await sound.unloadAsync();
        }
    } );

    try {

        await sound.loadAsync( source );
        await sound.playAsync();

    } catch ( e ) {
        console.error( "Sound error" );
    }

}
