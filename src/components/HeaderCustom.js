import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {toggleDrawer,push} from '../configs/RootNav'
import {searchApi,setSearchTerm} from "../redux/actions/fetchActions";
import SearchBar from "./SearchBar";
import {useDispatch, useSelector} from "react-redux";
import {useNavigation} from "@react-navigation/native";

const HeaderCustom = ({withSearch=false}) => {
    const searchTerm = useSelector(state => state.fetch.searchTerm)
    const dispatch = useDispatch()

    if(withSearch){
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
            <Feather style={[styles.icon_menu,{marginBottom:10}]} color={"#ebebeb"} size={24} name={"menu"}/>
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
        shadowColor:"#000000",
        shadowOpacity:0.9,
        shadowOffset:{width:2,height:3},
        shadowRadius:3,
    },
})

export default HeaderCustom
