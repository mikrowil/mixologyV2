import React, {useState} from "react";
import {View, Text, StyleSheet} from "react-native";
import ResultList from "../components/ResultList";
import {useDispatch, useSelector} from "react-redux";
import HeaderCustom from "../components/HeaderCustom";
import {fetchFavorites, searchApi} from "../redux/actions/fetchActions";

const SearchScreen = ()=>{
    const [searchTerm, setSearchTerm] = useState("")
    const dispatch = useDispatch()
    const search = useSelector((state) => state.fetch.search)
    const favorites = useSelector((state) => state.fetch.favorites)

    const isAFave = (id) => {
        let found = false

        if (!favorites) {return false}

        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].idDrink === id) {return true;}
        }
        return found
    }

    const refreshControl = async () => {
        dispatch(searchApi(searchTerm))
    }

    return<View style={styles.container}>
        <HeaderCustom withSearch={true}/>

        <View style={styles.list_container}>
            <ResultList
                title={"Search Results"}
                refreshControl={refreshControl}
                cocktails={search}
                isAFave={isAFave}
            />
        </View>
    </View>
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242525",

    },

    list_container: {
        height:"87%",


    }
})

export default SearchScreen
