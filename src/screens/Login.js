import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import * as Google from 'expo-google-app-auth';
import {auth} from "../configs/firebaseSetup";
import firebase from "firebase";
import {SocialIcon} from 'react-native-elements'


/**
 *
 */
export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);

    }

    isUserEqual = (googleUser, firebaseUser) => {
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


    onSignI = (googleUser) => {
        // We need to register an Observer on Firebase Auth to make sure auth is initialized.
        const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
            unsubscribe();
            // Check if we are already signed-in Firebase with the correct user.
            if (!this.isUserEqual(googleUser, firebaseUser)) {
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
    signInWithGoogleAsync = async () => {
        try {
            const result = await Google.logInAsync({
                androidClientId: "165595614793-ijttomns4tn5mgqb12cn1208fnk24coc.apps.googleusercontent.com",
                iosClientId: "165595614793-f9m4u18tmj7r4rcsb12d02dfknrb1nck.apps.googleusercontent.com",
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                this.onSignI(result)
                return result.accessToken;
            } else {
                return {cancelled: true};
            }
        } catch (e) {
            return {error: true};
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.head}>Mixology</Text>
                    <SocialIcon style={{padding: 10,}} button raised title='Sign In With Google' type='google'
                                onPress={() => this.signInWithGoogleAsync()}
                    />

                </View>
            </View>
        );
    }
}


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

        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn_style: {}
});
