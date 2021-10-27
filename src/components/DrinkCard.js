import React from "react";
import {View, ImageBackground, StyleSheet, Text, TouchableOpacity} from "react-native";
import {useNavigation} from '@react-navigation/native';


const DrinkCard = ({item, isFave}) => {
    const navigation = useNavigation()

    const id = item.idDrink

    return (
        <View>
            <TouchableOpacity onPress={() => {
                navigation.navigate("ShowScreen", {
                    id: id,
                    isFave,
                    item
                })
            }}
                              style={{
                                  shadowColor: "#000000",
                                  shadowOffset: {
                                      width: 5,
                                      height: 10
                                  },
                                  shadowOpacity: 0.7,
                                  shadowRadius: 5,

                                  marginHorizontal: 5,
                              }}>
                <ImageBackground imageStyle={{borderRadius: 25}} source={{uri: item.strDrinkThumb}}
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
    },
    container: {
        marginHorizontal: 5,

        width: 200,
        height: 250,
        borderColor: 'black',
        borderRadius: 25,
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
    },

})

export default DrinkCard
