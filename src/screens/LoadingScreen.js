import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {auth} from '../configs/firebaseSetup'
import {useDispatch} from "react-redux";
import {fetchFavorites} from "../redux/actions/fetchActions";

/**
 * Screen that displays while user is attempting to login
 * @param navigation
 * @returns {JSX.Element}
 * @constructor
 */
const LoadingScreen = ({navigation}) => {

    const dispatch = useDispatch()

    /**
    Checks if the user has logged in and starts a listener for auth changes
     */
    const checkIfLoggedIn = () => {
        auth.onAuthStateChanged((user) => {
            if (user) {
                loadData()

            } else {
                navigation.navigate('LoginScreen')
            }
        })
    }

    /**
    pre-loads data before main app opens
     */
    const loadData = async () => {

        await dispatch(fetchFavorites())

        //Navigates towards the main app
        navigation.navigate('MainApp')
    }

    useEffect(() => {
        checkIfLoggedIn()
    })

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large"/>
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
