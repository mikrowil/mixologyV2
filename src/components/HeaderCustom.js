import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {toggleDrawer} from '../configs/RootNav'
import SearchBar from "./SearchBar";

/**
 * Header for the application.
 * @param withSearch
 * @returns {JSX.Element}
 * @constructor
 */
const HeaderCustom = ({withSearch = false}) => {

    if (withSearch) {
        return <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                toggleDrawer()
            }}>
                <Feather style={styles.icon_menu} color={"#ebebeb"} size={24} name={"menu"}/>
            </TouchableOpacity>
            <View style={{width: "90%", marginBottom: 10,}}>
                <SearchBar/>
            </View>

        </View>
    }

    return <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            toggleDrawer()
        }}>
            <Feather style={[styles.icon_menu, {marginBottom: 10}]} color={"#ebebeb"} size={24} name={"menu"}/>
        </TouchableOpacity>
        <View style={{width: "90%"}}>

        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomWidth: 2,

        paddingHorizontal: 15,
        paddingTop: '15%',

        backgroundColor: "#323233",

    },

    icon_menu: {
        marginTop: 20,
        shadowColor: "#000000",
        shadowOpacity: 0.9,
        shadowOffset: {width: 2, height: 3},
        shadowRadius: 3,
        elevation: 5,
    },
})

export default HeaderCustom
