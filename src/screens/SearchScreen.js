import React from "react";
import {StyleSheet, View} from "react-native";
import ResultList from "../components/ResultList";
import {useSelector} from "react-redux";
import HeaderCustom from "../components/HeaderCustom";


const SearchScreen = () => {
    const search = useSelector((state) => state.search.searchResult)
    const searchIsLoading = useSelector(state => state.search.searchLoading)
    const favorites = useSelector((state) => state.fetch.favorites)

    const isAFave = (id) => {
        let found = false

        if (!favorites) {
            return false
        }

        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].idDrink === id) {
                return true;
            }
        }
        return found
    }

    const refreshControl = () => {

    }

    return <View style={styles.container}>
        <HeaderCustom withSearch={true}/>

        <View style={styles.list_container}>
            <ResultList
                isLoading={searchIsLoading}
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
        backgroundColor: "#323233",

    },

    list_container: {
        height: "87%",


    }
})

export default SearchScreen
