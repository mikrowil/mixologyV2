
import React, {useContext, useEffect} from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {auth, firestore} from '../configs/firebaseSetup'
import {Context} from "../context/UserContext";
import {useDispatch} from "react-redux";
import {fetchFavorites} from "../redux/actions/authActions";

const LoadingScreen=(props)=>{


    return (
            <View style={styles.container}>
                <ActivityIndicator size = "large"/>
            </View>
        );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default LoadingScreen
