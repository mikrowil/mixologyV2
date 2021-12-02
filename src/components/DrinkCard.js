import React from "react";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from '@react-navigation/native';

/**
    Card meant to be displayed on the ResultList component when
    horizontal is set to true
    @param {object} item - the drink to be shown
    @param {bool} isFave - determines if drink is in the users favorite list
    @returns {JSX.Element} - The drink card component
 */
const DrinkCard = ({item, isFave}) => {
    const navigation = useNavigation()

    /**Extracting id from item being rendered*/
    const id = item.idDrink

    /**
    Handles the navigation to the show drink screen from the id provided to the
    DrinkCard component
     */
    const handleNavigation = ()=>{
        navigation.navigate("ShowScreen", {
            id: id,
            isFave,
            item
        })
    }

    return (
        <View>
            <TouchableOpacity onPress={handleNavigation}
                              style={{

                                  shadowColor: "#000000",
                                  shadowOffset: {
                                      width: 5,
                                      height: 10
                                  },
                                  shadowOpacity: 0.7,
                                  shadowRadius: 5,
                                  elevation: 5,


                                  marginHorizontal: 5,
                              }}>
                <ImageBackground imageStyle={{borderRadius: 10}} source={{uri: item.strDrinkThumb}}
                                 style={[styles.container]}>
                    <Text numberOfLines={1} style={styles.text_drink}>{item.strDrink}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: undefined,
        height: undefined,
        flex:1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 2,
    },
    star_container: {
        width: 50,
        height: 50,
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 1,
    },
    star: {
        position: "absolute",
        right: 10,
        top: 10,
        textShadowColor: '#000000',
        textShadowRadius: 1,
        elevation: 5,
    },
    container: {
        marginHorizontal: 5,

        width: 200,
        height: 250,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: "#323233",

        alignSelf: "center",

    },
    text_drink: {
        marginHorizontal: 10,
        marginTop: 'auto',
        marginBottom: 10,
        color: '#ebebeb',
        fontFamily: 'Poppins_800ExtraBold',

        fontSize: 24,
        textShadowColor: '#000000',
        textShadowRadius: 5,
        elevation: 5,
    },

})

export default DrinkCard
