import React from 'react'
import {Button, StyleSheet, Text, View,} from 'react-native'
import {auth} from '../configs/firebaseSetup'
import {useNavigation} from "@react-navigation/native";

const AccountScreen = ({navigation}) =>{

    return <View style={styles.container}>
        <View>
            <Text style={styles.text}><Text style={{color:"#e67bec"}}>Name: </Text>{auth.currentUser.displayName}</Text>
            <Button title={"Sign Out"} onPress={()=>{
                auth.signOut().then(()=>{
                    navigation.goBack()
                })
            }}/>
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
    text:{
        color:'#ebebeb',
        fontSize:24
    }
});

export default AccountScreen
