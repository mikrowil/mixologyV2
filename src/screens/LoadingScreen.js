
import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {auth, firestore} from '../configs/firebaseSetup'
import {Context} from "../context/UserContext";
import {useDispatch} from "react-redux";

import {CHECK_AUTH} from "../redux/types";
import {fetchFavorites} from "../redux/actions/fetchActions";

const LoadingScreen=({navigation})=>{

    const dispatch = useDispatch()


    const checkIfLoggedIn = () => {
        auth.onAuthStateChanged((user) =>{
            if(user){
                loadData()

            }else {
                navigation.navigate('LoginScreen')
            }
        })
    }

    const loadData = async () =>{

        await dispatch(fetchFavorites())



        navigation.navigate('MainApp')
    }

    useEffect(()=>{
        checkIfLoggedIn()
    })

    return (
            <View style={styles.container}>
                <ActivityIndicator size = "large"/>
            </View>
        );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323233',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoadingScreen
