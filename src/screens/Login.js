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

    const isUserEqual = (googleUser, firebaseUser) => {
        if (firebaseUser) {
            const providerData = firebaseUser.providerData;
            for (let i = 0; i < providerData.length; i++) {
                if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
                    providerData[i].uid === googleUser.user.id) {
                    // We don't need to reauth the Firebase connection.
                    return true;
                }
            }
        }
        return false;
    }


    const onSignI = (googleUser) => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!isUserEqual(googleUser, firebaseUser)) {
                // Build Firebase credential with the Google ID token.
                const credential = firebase.auth.GoogleAuthProvider.credential(
                    googleUser.idToken,
                    googleUser.accessToken);

                // Sign in with credential from the Google user.
                auth.signInWithCredential(credential).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // The email of the user's account used.
                    const email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    const credential = error.credential;
                    // ...
                });
            } else {
                console.log('User already signed-in Firebase.');
            }
        });
    }

    /**
     * Attempts a sign in to google
     * @returns {Promise<{error: boolean}|{cancelled: boolean}|*>}
     */
    const signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "165595614793-ijttomns4tn5mgqb12cn1208fnk24coc.apps.googleusercontent.com",
                iosClientId: "165595614793-f9m4u18tmj7r4rcsb12d02dfknrb1nck.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                onSignI(result)
                return result.accessToken;
            } else {
                return {cancelled: true};
            }
        } catch (e) {
            return {error: true};
        }
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

                <SocialIcon style={{padding: 10,}} button raised title='Sign In With Google' type='google'
                            onPress={() => signInWithGoogleAsync()}
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
