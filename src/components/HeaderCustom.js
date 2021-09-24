import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {Feather} from '@expo/vector-icons'
import {toggleDrawer,push} from '../configs/RootNav'
import {searchApi} from "../redux/actions/fetchActions";
import SearchBar from "./SearchBar";
import {useDispatch} from "react-redux";
import {useNavigation} from "@react-navigation/native";

const HeaderCustom = ({withSearch=false}) => {
    const [searchTerm, setSearchTerm] = useState("")
    const dispatch = useDispatch()

    if(withSearch){
        return <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                toggleDrawer()
            }}>
                <Feather style={styles.icon_menu} color={"#ebebeb"} size={24} name={"menu"}/>
            </TouchableOpacity>
            <View style={{width: "90%", marginBottom: 10,}}>
                <SearchBar
                    term={searchTerm}
                    onTermChange={setSearchTerm}
                    onTermSubmit={() => {
                        dispatch(searchApi(searchTerm))

                    }
                    }
                />
            </View>

        </View>
    }

    return <View style={styles.container}>
        <TouchableOpacity onPress={() => {
            toggleDrawer()
        }}>
            <Feather style={styles.icon_menu} color={"#ebebeb"} size={24} name={"menu"}/>
        </TouchableOpacity>
        <View style={{width: "90%", marginBottom: 10,}}>

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

        backgroundColor: "#242525",

    },

    icon_menu: {
        marginTop: 20,
    },
})

export default HeaderCustom
