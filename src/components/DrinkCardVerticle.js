import React, {useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useNavigation} from '@react-navigation/native';
import {AntDesign} from "@expo/vector-icons";
import firebase from "firebase";
import {auth, firestore} from "../configs/firebaseSetup";

const DrinkCardVerticle = ({item, addFave, isFave}) => {
    const navigation = useNavigation()
    const [starOn, toggleStar] = useState(isFave ? "star" : "staro")
    const [isFavorite, setIsFavorite] = useState(isFave)
    const [isAvailable, setIsAvailable] = useState(true)
    const id = item.idDrink

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

            toggleStar("star")
        }


    }

    return (
        <View style={styles.container}>
            <TouchableOpacity disabled={!isAvailable} onPress={() => initToggle()} style={styles.star_container}>
                <AntDesign style={styles.star} size={25} name={`${starOn}`}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate("ShowScreen", {
                    id: id
                })
            }}>

                <Image style={styles.image} source={{uri: item.strDrinkThumb}}/>
                <Text numberOfLines={1} style={styles.text_drink}>{item.strDrink}</Text>

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
    },
    container: {
        marginHorizontal: 5,
        marginVertical: 15,
        borderWidth: 1,
        width: "80%",
        borderColor: 'black',
        borderRadius: 5,
        backgroundColor: "#ffffff",

        alignSelf: "center",

    },
    text_drink: {
        marginHorizontal: 10,
        marginVertical: 10,
        fontFamily: 'OpenSans_300Light',
        alignSelf: "center",
        fontSize: 24,

    },

})

export default DrinkCardVerticle
