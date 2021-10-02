import React, {useEffect, useState} from "react";
import {Text, View, Pressable, FlatList, Button, StyleSheet,Image} from "react-native";
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';
import randomColor from 'randomcolor'
import cocktailsApi from "../api/cocktailApi";
import DrinkCard from "../components/DrinkCard";
import HeaderCustom from "../components/HeaderCustom";


const MoodScreen = () => {
    const [screenDisabled,setScreenDisabled] = useState(false)
    const [cocktails,setCocktails] = useState([])
    const [color,setColor] = useState("#323233")
    const [intervalId, setIntervalId] = useState(0)
    const [message, setMessage] = useState("")


    const searchApi = async ()=>{
        try{
            const response = await cocktailsApi.get('Random.php',[])
            setCocktails(response.data.drinks)

        }catch (e){
            console.log(e)
        }
    }

    const start = ()=>{
        if(screenDisabled){
            return
        }
        setScreenDisabled(true)
        setIntervalId(setInterval(() => {
            setColor(randomColor());
        }, 800))
    }

    const stop = async ()=>{
        clearInterval(intervalId)
        await searchApi()
        setScreenDisabled(false)
        setColor("#323233")
        setMessage(" ")
    }
    if(message === ""){
        setMessage("Hold your thumb on the screen to sense your mood. Or just tap for a quick random selection")
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

        </AnimatedBackgroundColorView>
    </Pressable>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#323233',

    },

    list_container:{
        marginVertical:10,
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
        fontFamily: "OpenSans_800ExtraBold",
        color:'#ebebeb',
        textShadowRadius:1,
        textShadowColor:'#000000',
    },
    text_message:{
        fontSize:24,
        fontWeight:"bold",
        marginHorizontal:15,
        textAlign:"center",
        fontFamily: "OpenSans_800ExtraBold",
        color:'#ebebeb',
        textShadowRadius:1,
        textShadowColor:'#000000',
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
