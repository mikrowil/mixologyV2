import React, {useEffect, useState} from "react";
import {Text, View, Pressable, FlatList, Button, StyleSheet,Image} from "react-native";
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';
import randomColor from 'randomcolor'
import cocktailsApi from "../api/cocktailApi";
import DrinkCard from "../components/DrinkCard";
import HeaderCustom from "../components/HeaderCustom";


const MoodScreen = () => {
    const [cocktails,setCocktails] = useState([])
    const [color,setColor] = useState("#ffffff")
    const [intervalId, setIntervalId] = useState(0)
    const [message, setMessage] = useState("")

    const messages = [
        "Wish i were you",
        "Damn, who pissed you off",
        "I get it bro",
        "Wow your sick, I love it!",
        "Stop using my app and get help",
        "You could definitely use this drink",
        "Love it",
        "You saucy goat"
    ]

    const searchApi = async ()=>{
        try{
            const response = await cocktailsApi.get('Random.php',[])
            setCocktails(response.data.drinks)

        }catch (e){
            console.log(e)
        }
    }

    const start = ()=>{
        setIntervalId(setInterval(() => {
            setColor(randomColor());
        }, 500))
    }

    const stop = ()=>{
        clearInterval(intervalId)
        searchApi()
        setMessage(messages[Math.floor(Math.random() * messages.length)])
    }
    if(message === ""){
        setMessage("Hold your thumb on the screen to see what your feeling like")
    }

    return <Pressable style={styles.container} onPressIn={()=>{start()}} onPressOut={()=>{stop()}}>
        <HeaderCustom/>
        <AnimatedBackgroundColorView color={color} style={{flex:1}}>
            {!cocktails.length ? <View style={styles.empty_list_container}/> : <View style={styles.list_container}>
                <FlatList keyExtractor={(item,index)=>'key'+index} data={cocktails} renderItem={({item})=>(
                    <DrinkCard item={item} />
                )}/>
            </View>}
            <Text style={styles.text_message}>{message}</Text>
            <Image style={styles.thumbprint} source={require("../../assets/thumbprint.png")}/>
        </AnimatedBackgroundColorView>
    </Pressable>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#323233',

    },

    list_container:{
        height:"50%"
    },
    empty_list_container:{
        height:"50%",
        marginVertical:10,
    },
    text_mood:{
        textAlign: "center",
        fontSize:20,
        fontWeight:"bold",
        marginHorizontal:15,
        marginTop:"30%",

    },
    text_message:{
        fontSize:24,
        fontWeight:"bold",
        marginHorizontal:15,
        textAlign:"center"
    },
    thumbprint:{
        marginTop: "20%",
        width:100,
        height:150,
        alignSelf:"center",
        resizeMode:"contain"
    }
})

export default MoodScreen
