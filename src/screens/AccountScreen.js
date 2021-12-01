import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {auth} from '../configs/firebaseSetup'

/**
 * Account screen
 * @param navigation navigation passed down from react navigation
 * @returns {JSX.Element}
 * @constructor
 */
const AccountScreen = ({navigation}) => {

    return <View style={styles.container}>
        <View style={styles.sub_container}>
            <Text style={styles.text}><Text style={{color: "#e67bec"}}>Name: </Text>{auth.currentUser.displayName}
            </Text>

            <TouchableOpacity
                style={styles.btn_signout}
                onPress={() => {
                    auth.signOut().then(() => {
                        navigation.goBack()
                    })
                }}>
                <Text style={styles.text}>
                    Sign out
                </Text>

            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#323233',
        alignItems: 'center',
        justifyContent: 'center',

    },
    sub_container: {
        height: '75%',
        justifyContent: "space-around",
        alignItems: 'center',
    },
    text: {
        color: '#ebebeb',
        fontSize: 24,
        fontFamily: 'OpenSans_600SemiBold',
        textShadowColor: '#000000',
        textShadowRadius: 5,
    },
    btn_signout: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: "#e67bec",
        paddingHorizontal: '5%',
        paddingVertical: '3%',
        textShadowColor: '#000000',
        textShadowRadius: 5,
        backgroundColor: '#242525',
    },
});

export default AccountScreen
