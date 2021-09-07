import React, {useEffect, useState, memo} from "react";
import {Text, View, StyleSheet, Image, FlatList, ScrollView, TouchableOpacity, ActivityIndicator} from 'react-native'
import cocktailsApi from "../api/cocktailApi";
import {AntDesign} from '@expo/vector-icons'

/*
    The show drink screen shows a drink that has been selected by the user,
    and shows more info than a standard fetch from the database.
 */
const ShowDrinkScreen = ({route, navigation}) =>{

    //Id of the drink that has been selected to use
    const id = route.params.id

    //State to hold the data for the drink
    const [cocktail,setCocktails] = useState([])
    const [ingredients, setIngredients] = useState([])

    //Loading state of the drink
    const [isLoading,setIsLoading] = useState(true)

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

                if(response.name !== null){
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
                                  onPress={()=>{navigation.goBack()}}><AntDesign size={35} name={"arrowleft"}/></TouchableOpacity>
            </View>

            {!isLoading?
                <ScrollView style={styles.list_container}>

                <Image source={{uri:cocktail[0].strDrinkThumb}} style={styles.image}/>

                <View style={styles.grid_one}>
                    <View style={styles.grid_one_one}>
                        <Text style={styles.tex}>
                            <Text style={{fontWeight:"bold"}}>Name:</Text>
                        </Text>

                        <Text style={styles.tex}>
                            <Text style={{fontWeight:"bold"}}>Category:</Text>
                        </Text>
                        {cocktail[0].strIBA ? <Text style={styles.tex}><Text style={{fontWeight:"bold"}}>IBA:</Text></Text>:null}
                        <Text style={styles.tex}>
                            <Text style={{fontWeight:"bold"}}>Type:</Text>
                        </Text>
                        <Text style={styles.tex}>
                            <Text style={{fontWeight:"bold"}}>Glass:</Text>
                        </Text>
                    </View>
                    <View style={styles.grid_one_two}>
                        <Text style={styles.tex}>{cocktail[0].strDrink}</Text>
                        <Text style={styles.tex}>{cocktail[0].strCategory}</Text>
                        {cocktail[0].strIBA ? <Text style={styles.tex}>{cocktail[0].strIBA}</Text>:null}
                        <Text style={styles.tex}>{cocktail[0].strAlcoholic}</Text>
                        <Text style={styles.tex}>{cocktail[0].strGlass}</Text>
                    </View>
                </View>
                <View style={styles.txt_container}>
                    <Text style={styles.tex}><Text style={{fontWeight:"bold"}}>Instructions:</Text> {cocktail[0].strInstructions}</Text>
                </View>
                <View style={styles.txt_container}>

                    {ingredients.map((item,index)=>(
                        <Text key={index} style={styles.tex}>{item.ment} {item.name}</Text>
                    ))}
                </View>
            </ScrollView>
                :
                <ActivityIndicator
                    size={'large'}
                    style={{alignSelf: "center", marginVertical: '25%'}}
                />}
        </View>
    )
}
const styles = StyleSheet.create({
    tex:{
        fontSize:18,
        marginVertical:10,
        marginHorizontal:5,
        lineHeight:30,
        fontFamily: 'OpenSans_300Light',
    },
    tex_label:{

    },
    header:{
        paddingTop:'10%',
        backgroundColor: '#800020',
        justifyContent:'center',
        paddingHorizontal:15
    },
    back_button:{
        marginVertical:10,
    },

    container:{
        height:'100%',
        backgroundColor: "#efe9ef",
        width:'100%',

    },
    grid_one:{
        flexDirection:"row",
        marginHorizontal: 5,
        marginVertical: 10,
        borderWidth:1,
        width:"90%",
        borderColor:'black',
        borderRadius: 10,
        backgroundColor:'white',
        fontFamily: 'OpenSans_300Light',
        alignSelf: "center",
    },
    grid_one_one:{
        flex:3,
        alignItems:"flex-end",
    },
    grid_one_two:{
        flex:4,
        alignItems:"flex-start",
    },
    txt_container:{
        marginHorizontal: 5,
        marginVertical: 10,
        borderWidth:1,
        width:"90%",
        borderColor:'black',
        borderRadius: 10,
        alignItems:"center",
        backgroundColor:'white',
        alignSelf: "center",
        fontFamily: 'OpenSans_300Light',

    },
    image:{
        width:150,
        height:150,
        borderRadius:5,
        marginHorizontal:10,
        marginVertical:10,
        resizeMode:"contain",
        alignSelf:"center",
        borderColor:'black',
        borderWidth:2,

    },
})

export default ShowDrinkScreen
