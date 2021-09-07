import React from 'react'
import {ActivityIndicator, StyleSheet, View} from 'react-native'
import ResultList from "../components/ResultList";
import HeaderCustom from "../components/HeaderCustom";
import {useDispatch, useSelector} from "react-redux";
import {fetchFavorites} from "../redux/actions/fetchActions";


const FavoriteScreen = () => {

    const favorites = useSelector((state) => state.fetch.favorites)
    const dispatch = useDispatch()

    const isAFave = (id) => {
        return true
    }

    const refreshControl = async () => {
        dispatch(fetchFavorites())
    }


    if (!favorites.length) {
        return <>
            <ActivityIndicator size="large"/>
        </>
    }


    return (
        <View style={styles.container}>
            <HeaderCustom/>
            <View style={styles.list_container}>
                <ResultList
                    refreshControl={refreshControl}
                    cocktails={favorites}
                    isAFave={isAFave}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#efe9ef",

    },

    list_container: {
        height: "83%",
        alignContent: "center"
    }
})

export default FavoriteScreen
