import React from "react";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from '@react-navigation/native';

/**
 Card meant to be displayed on the ResultList component when
 horizontal is set to false
 @param {object} item - the drink to be shown
 @param {bool} isFave - determines if drink is in the users favorite list
 @returns {JSX.Element} The drink card component
 */
const DrinkCardVertical = ({item, isFave}) => {
    const navigation = useNavigation()

    /**Extracting id from item being rendered*/
    const id = item.idDrink

    /**
     Handles the navigation to the show drink screen from the id provided to the
     DrinkCardVertical component
     */
    const handleNavigation = () => {
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
                                  borderRadius: 20,
                                  marginHorizontal: 5,
                              }}
            >

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
        width: 150,
        height: 150,
        alignSelf: "center",
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        resizeMode: "contain",
        borderWidth: 2,
    },

    container: {
        marginHorizontal: 5,

        width: "90%",
        height: 120,
        borderColor: 'black',


        marginVertical: 10,
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
        elevation: 1,

    },

})

export default DrinkCardVertical
