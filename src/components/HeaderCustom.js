import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {toggleDrawer} from '../configs/RootNav'
import {searchApi} from "../redux/actions/fetchActions";
import SearchBar from "./SearchBar";
import {useDispatch} from "react-redux";


const HeaderCustom = () => {
    const [searchTerm, setSearchTerm] = useState("")
    const dispatch = useDispatch()
    return <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            toggleDrawer()
        }}>
            <Feather style={styles.icon_menu} color={"#ecc5cf"} size={24} name={"menu"}/>
        </TouchableOpacity>
        <View style={{width: "90%", marginBottom: 10,}}>
            <SearchBar
                term={searchTerm}
                onTermChange={setSearchTerm}
                onTermSubmit={() => dispatch(searchApi(searchTerm))}
            />
        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomWidth: 1,

        paddingHorizontal: 15,
        paddingTop: '15%',

        backgroundColor: "#3d1f1d",

    },
    icon_account: {
        marginVertical: 10,
    },
    icon_menu: {
        marginTop: 20,
    },
})

export default HeaderCustom
