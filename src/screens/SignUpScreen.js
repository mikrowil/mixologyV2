import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import {Button, Input, Text} from 'react-native-elements'
import {signUp} from '../redux/actions/authActions'
import {useDispatch} from "react-redux";

/**
 * The sign up screen is used for creating a user from the provided username and password.
 * @returns {JSX.Element}
 * @constructor
 */
export default function SignUpScreen() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <Text h1>Sign up screen</Text>
            <Input
                autoCapitalize={"none"}
                autoCorrect={false}
                placeholder={"Username"}
                onChangeText={setEmail}
                value={email}
            />
            <Input
                secureTextEntry
                autoCapitalize={"none"}
                autoCorrect={false}
                placeholder={"Password"}
                onChangeText={setPassword}
                value={password}
            />

            <Button
                title={"Sign up"}
                onPress={() => dispatch(signUp({email, password}))}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: "center", alignItems: "center"
    },
    title: {
        marginVertical: 'auto',
    },
    errMessage: {
        fontSize: 16,
        color: 'red',
    }
})
