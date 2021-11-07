import React from 'react'
import {StyleSheet, View} from 'react-native'
import ResultList from "../components/ResultList";
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


    return (
        <View style={styles.container}>

            <View style={styles.list_container}>
                <ResultList
                    horizontal={false}
                    title={"Favorites"}
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
        backgroundColor: "#323233",

    },

    list_container: {
        flex:1,
        alignContent: "center"
    }
})

export default FavoriteScreen
