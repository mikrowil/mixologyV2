import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {auth} from "../configs/firebaseSetup";
import firebase from "firebase";
import {Button, Input, SocialIcon} from 'react-native-elements'
import {signIn} from "../redux/actions/authActions";
import {useDispatch} from "react-redux";



const LoginScreen = ({navigation}) => {

    const dispatch = useDispatch()

    const goToSignUp = () =>{
        navigation.navigate('signup')
    }

    //Calls the signIn action from authActions
    const callSignIn = () => {
        dispatch(signIn)
    }


    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Text style={styles.head}>Mixology</Text>

                <TextInput placeholder={"Email Address"} style={styles.txt_input}/>
                <TextInput placeholder={"Password"} style={styles.txt_input}/>
                <Button
                    title={"Sign in"}
                    onPress={callSignIn}
                />
                <Button
                    title={"Sign up"}
                    onPress={goToSignUp}
                />

            </View>
        </View>
    );

}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323233',
        alignItems: 'center',
        justifyContent: 'center',

    },
    head: {
        fontFamily: 'Poppins_800ExtraBold',
        fontSize: 42,
        color: "#e67bec",
        textShadowColor: '#000000',
        textShadowRadius: 5,
    },
    subContainer: {
        height: '70%',


        justifyContent: 'space-between'
    },
    btn_style: {},
    txt_input:{
        borderRadius:10,
        backgroundColor: '#989898',
        height: 30
    }
});
