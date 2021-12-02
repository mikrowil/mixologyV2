import React, {useState} from "react";
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {AnimatedBackgroundColorView} from 'react-native-animated-background-color-view';
import randomColor from 'randomcolor'
import cocktailsApi from "../api/cocktailApi";
import DrinkCard from "../components/DrinkCard";

/**
 * Mood screen - When a touch is detected, the background color will become
 * animated. Presents the user with a random beverage under the false pretenses, that
 * the device is reading the users mood.
 * @returns {JSX.Element}
 * @constructor
 */
const MoodScreen = () => {

    //Determines if input is valid from a user
    const [screenDisabled, setScreenDisabled] = useState(false)

    const [cocktails, setCocktails] = useState([])

    //Initial color for color changing screen
    const [color, setColor] = useState("#323233")

    const [intervalId, setIntervalId] = useState(0)
    const [message, setMessage] = useState("")


    const searchApi = async () => {
        try {
            const response = await cocktailsApi.get('random', [])
            setCocktails(response.data.drinks)

        } catch (e) {
            console.log(e)
        }
    }

    /**
     * Color changing screen start function
     */
    const start = () => {
        if (screenDisabled) {
            return
        }
        setScreenDisabled(true)
        setIntervalId(setInterval(() => {
            setColor(randomColor());
        }, 800))
    }

    /**
     * Color changing screen stop function
     * @returns {Promise<void>}
     */
    const stop = async ()=>{
        clearInterval(intervalId)
        await searchApi()
        setScreenDisabled(false)
        setColor("#323233")
        setMessage(" ")
    }

    //Displays before user interaction
    if(message === ""){
        setMessage("Hold your thumb on the screen to sense your mood. Or just tap for a quick random selection")

    }

    return <Pressable style={styles.container} onPressIn={() => {
        start()
    }} onPressOut={() => {
        stop()
    }}>

        <AnimatedBackgroundColorView color={color} style={{flex: 1}}>
            {!cocktails.length ? <View style={styles.empty_list_container}/> : <View style={styles.list_container}>
                <FlatList keyExtractor={(item, index) => 'key' + index} data={cocktails} renderItem={({item}) => (
                    <DrinkCard item={item}/>
                )}/>
            </View>}
            <Text style={styles.text_message}>{message}</Text>

        </AnimatedBackgroundColorView>
    </Pressable>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323233',

    },

    list_container: {
        marginVertical: 10,
        height: "50%"
    },
    empty_list_container: {
        height: "50%",
        marginVertical: 10,
    },
    text_mood: {
        shadowColor:"#000000",
        shadowOpacity:0.7,
        shadowOffset:{width:2,height:3},
        shadowRadius:3,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginHorizontal: 15,
        marginTop: "30%",
        fontFamily: "OpenSans_800ExtraBold",
        color: '#ebebeb',
        textShadowRadius: 1,
        textShadowColor: '#000000',
    },
    text_message: {
        fontSize: 24,
        fontWeight: "bold",
        marginHorizontal: 15,
        textAlign: "center",
        fontFamily: "OpenSans_800ExtraBold",
        color: '#ebebeb',
        textShadowRadius: 1,
        textShadowColor: '#000000',
        shadowColor:"#000000",
        shadowOpacity:0.7,
        shadowOffset:{width:2,height:3},
        shadowRadius:3,
    },
    thumbprint: {
        marginTop: "20%",
        width: 100,
        height: 150,
        alignSelf: "center",
        resizeMode: "contain"
    }
})

export default MoodScreen
