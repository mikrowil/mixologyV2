import React from 'react'
import {StyleSheet, TextInput, View} from 'react-native'
import {Feather} from '@expo/vector-icons'
import {useDispatch, useSelector} from "react-redux";
import {searchApi, setSearchTerm} from "../redux/actions/searchActions";


const SearchBar = () => {
    const dispatch = useDispatch()

    const searchTerm = useSelector((state) => state.search.searchTerm)

    const endEditing = () =>{
        dispatch(searchApi(searchTerm))
    }

    return (
        <View style={styles.background}>
            <Feather style={styles.icon} size={30} name="search"/>
            <TextInput autoCorrect={false}
                       value={searchTerm}
                       onChangeText={(newTerm) => {
                           dispatch(setSearchTerm(newTerm))
                       }}
                       placeholder={"Search"}
                       style={styles.search_text}
                       autoCapitalize={"none"}
                       onEndEditing={() => endEditing()}/>
        </View>
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: "#ebebeb",
        height: 50,
        borderRadius: 25,
        marginHorizontal: 15,
        marginVertical: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: "flex-start",


    },
    search_text: {
        flex: 1,
        fontSize: 25,
        justifyContent: "space-evenly",
        alignSelf: "center",
        color: '#c0c0c0',
        fontFamily: "OpenSans_600SemiBold"
    },
    icon: {
        alignSelf: 'center',
        marginHorizontal: 10,
    }
})

export default SearchBar;
