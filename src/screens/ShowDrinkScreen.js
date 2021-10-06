import React, {useEffect, useState, memo} from "react";
import {Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import cocktailsApi from "../api/cocktailApi";
import {AntDesign} from '@expo/vector-icons'
import {auth, firestore} from "../configs/firebaseSetup";
import firebase from "firebase";
import {fetchFavorites} from "../redux/actions/fetchActions";
import {useDispatch} from "react-redux";

/*
    The show drink screen shows a drink that has been selected by the user,
    and shows more info than a standard fetch from the database.
 */
const ShowDrinkScreen = ({route, navigation}) =>{

    //Id of the drink that has been selected to use
    const id = route.params.id
    const item = route.params.item

    const dispatch = useDispatch()

    const [starOn, toggleStar] = useState(route.params.isFave ? "star" : "staro")
    const [isFavorite, setIsFavorite] = useState(route.params.isFave)
    const [isAvailable, setIsAvailable] = useState(true)

    //State to hold the data for the drink
    const [cocktail,setCocktails] = useState([])
    const [ingredients, setIngredients] = useState([])

    //Loading state of the drink
    const [isLoading,setIsLoading] = useState(true)

    const initToggle = () => {
        if (isAvailable) {
            setIsAvailable(false)
            toggle().then(setIsAvailable(true))
        }
    }

    const toggle = async () => {

        const ref = firestore.collection("users").doc(auth.currentUser.uid)

        if (isFavorite) {
            setIsFavorite(false)

            const response = await ref.update({
                favorites: firebase.firestore.FieldValue.arrayRemove({
                    idDrink: id,
                    strDrink: item.strDrink,
                    strDrinkThumb: item.strDrinkThumb,
                })
            })

            dispatch(fetchFavorites())

            toggleStar("staro")
        } else {
            setIsFavorite(true)


            const response = await ref.update({
                favorites: firebase.firestore.FieldValue.arrayUnion({
                    idDrink: id,
                    strDrink: item.strDrink,
                    strDrinkThumb: item.strDrinkThumb,
                })
            })
            dispatch(fetchFavorites())
            toggleStar("star")
        }


    }

    //Parses the ingredients from the database
    const getIngredients = (cocktails) =>{
        let done = false
        let index = 1
        let myIngreds = []
        if(cocktails[0] !== null){
            while(!done){
                let strIngreds = `strIngredient${index}`
                let strMeasures = `strMeasure${index}`
                let response = {name:cocktails[0][`${strIngreds}`],ment:cocktails[0][`${strMeasures}`]}

                if(response.name !== null && response.name !== ""){
                    myIngreds.push(response)

                }else {

                    done = true
                }
                if (index > 14){
                    done = true
                }
                index++
            }
        }

        setIngredients(myIngreds)
    }

    //Search api for getting drink info
    const searchApi = async ()=>{
        setIsLoading(true)
        try{
            const response = await cocktailsApi.get(`lookup.php?i=${id}`,[])
            setCocktails(response.data.drinks)
            getIngredients(response.data.drinks)

        }catch (e){
            console.log(e)
        }
        setIsLoading(false)

    }

    //Calls the api to get drink data to show
    useEffect(()=>{
        searchApi()
    },[])



    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.back_button}
                                  onPress={()=>{navigation.goBack()}}><AntDesign size={35} color={"#ebebeb"} name={"arrowleft"}/></TouchableOpacity>
            </View>

            {!isLoading?
                <View style={styles.list_container}>
                    <TouchableOpacity disabled={!isAvailable} onPress={() => initToggle()} style={styles.star_container}>
                        <AntDesign color={"#e67bec"} style={styles.star} size={25} name={`${starOn}`}/>
                    </TouchableOpacity>
                    <ScrollView scrollIndicatorInsets={{right:1}}>

                        <Image source={{uri:cocktail[0].strDrinkThumb}} style={styles.image_back}/>
                        <Image source={{uri:cocktail[0].strDrinkThumb}} style={styles.image}/>


                        <View style={styles.grid_one}>


                            <Text style={styles.title}>{cocktail[0].strDrink}</Text>

                            <View style={styles.lineBreak}/>

                            <Text style={styles.text}><Text style={{fontWeight:"bold",color:"#e67bec"}}>Category: </Text>{cocktail[0].strCategory}</Text>

                            <View style={styles.lineBreak}/>

                            {cocktail[0].strIBA ? <View>
                                <Text style={styles.text}>
                                    <Text style={{fontWeight:"bold",color:"#e67bec"}}>IBA: </Text>{cocktail[0].strIBA}</Text>
                                <View style={styles.lineBreak}/>
                            </View>:null}



                            <Text style={styles.text}><Text style={{fontWeight:"bold",color:"#e67bec"}}>Type: </Text>{cocktail[0].strAlcoholic}</Text>

                            <View style={styles.lineBreak}/>


                            <Text style={styles.text}><Text style={{fontWeight:"bold",color:"#e67bec"}}>Glass: </Text>{cocktail[0].strGlass}</Text>

                            <View style={styles.lineBreak}/>



                        </View>
                        <View style={styles.txt_container}>
                            <Text style={styles.text}>
                                <Text style={{fontWeight:"bold",color:"#e67bec"}} >Instructions:</Text> {cocktail[0].strInstructions}
                            </Text>
                        </View>
                        <View style={styles.txt_container}>

                            {ingredients.map((item,index)=>(
                                <View key={index} style={styles.ingredient_container}>
                                    <Text key={index} style={styles.text_ingredients}><Text style={{color:"#e67bec"}}>{item.ment}</Text> {item.name}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                :
                <ActivityIndicator
                    size={'large'}
                    style={{alignSelf: "center", marginVertical: '25%'}}
                />}
        </View>
    )
}
const styles = StyleSheet.create({
    title:{
        fontSize:32,
        shadowColor:"#000000",
        shadowOpacity:0.9,
        shadowOffset:{width:2,height:3},
        shadowRadius:3,
        marginHorizontal:5,

        color:'#ebebeb',
        fontFamily: 'OpenSans_600SemiBold',
    },
    text:{
        shadowColor:"#000000",
        shadowOpacity:0.9,
        shadowOffset:{width:2,height:3},
        shadowRadius:3,
        fontSize:18,
        marginVertical:10,
        marginHorizontal:5,
        lineHeight:30,
        color:'#ebebeb',
        fontFamily: 'OpenSans_600SemiBold',
    },
    ingredient_container:{
       width:"90%",
        margin:20,
        backgroundColor:"#323233",
        borderRadius:10,
        borderBottomWidth:2,
        textAlign:"center",
    },
    text_ingredients:{
        shadowColor:"#000000",
        shadowOpacity:0.9,
        shadowOffset:{width:2,height:3},
        shadowRadius:3,

        fontSize:18,
        marginVertical:10,
        marginLeft:'auto',
        marginRight:"auto",
        color:'#ebebeb',
        fontFamily: 'OpenSans_600SemiBold',



    },
    list_container:{
        height:'85%',

    },
    star_container: {
        width: 50,
        height: 50,
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 1,

        shadowColor:"#000000",
        shadowOpacity:0.9,
        shadowOffset:{width:2,height:3},
        shadowRadius:2,
    },
    star: {
        position: "absolute",
        right: 10,
        top: 10,
        textShadowColor: '#000000',
        textShadowRadius: 1,
    },
    header:{
        paddingTop:'10%',
        backgroundColor: '#323233',
        justifyContent:'center',
        paddingHorizontal:15,
        borderBottomWidth:2,

    },
    back_button:{
        marginVertical:10,
    },

    container:{
        height:'100%',
        backgroundColor: "#323233",
        width:'100%',

    },
    grid_one:{
        paddingTop: 10,
        marginHorizontal: 5,
        marginVertical: 10,
        width:"90%",

        alignSelf: "center",
    },

    txt_container:{
        marginHorizontal: 5,
        marginVertical: 10,

        width:"90%",

        alignItems:"center",

        alignSelf: "center",
        fontFamily: 'OpenSans_600SemiBold',

    },
    image:{
        width:150,
        height:150,
        borderRadius:100,
        marginHorizontal:10,
        marginVertical:10,
        resizeMode:"contain",
        alignSelf:"center",
        borderColor:'black',
        borderWidth:2,

    },
    image_back:{
        position:"absolute",
        width:800,
        height:100,

        alignSelf:"center",
    },
    lineBreak:{
        shadowColor:"#000000",
        shadowOpacity:0.9,
        shadowOffset:{width:2,height:3},
        shadowRadius:3,
        borderBottomWidth:2,
        borderColor:"#e67bec",
        width:"100%",
        height:1,
    },
})

export default ShowDrinkScreen
