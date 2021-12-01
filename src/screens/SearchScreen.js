import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import ResultList from "../components/ResultList";
import {useDispatch, useSelector} from "react-redux";
import {searchApi} from "../redux/actions/searchActions";

/**
 * Search screen - displays a list of drinks from the search term provided to the api
 * @returns {JSX.Element}
 * @constructor
 */
const SearchScreen = () => {
    const search = useSelector((state) => state.search.searchResult)
    const searchIsLoading = useSelector(state => state.search.searchLoading)
    const favorites = useSelector((state) => state.fetch.favorites)

    const dispatch = useDispatch()

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


    useEffect(()=>{
        dispatch(searchApi(""))
    },[])

    return <View style={styles.container}>

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
        flex: 1,


    }
})

export default SearchScreen
