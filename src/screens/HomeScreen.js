import React, {useCallback, useEffect, useState} from 'react';
import {ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View,} from 'react-native';
import ResultList from "../components/ResultList";
import HeaderCustom from "../components/HeaderCustom";
import {useDispatch, useSelector} from "react-redux";
import {fetchCocktails, fetchNew, fetchPopular, fetchPunches, fetchShots} from "../redux/actions/fetchActions";

const HomeScreen = (props) => {

    //Search state
    const [searchTerm, setSearchTerm] = useState("")

    //main scrollview refreshing state
    const [refreshingMain,setRefreshingMain] = useState(false)

    //Dispatch
    const dispatch = useDispatch()

    //Different categories of drinks
    const favorites = useSelector((state) => state.fetch.favorites)
    const popular = useSelector((state) => state.fetch.popular)
    const newest = useSelector(state => state.fetch.newest)
    const cocktails = useSelector(state => state.fetch.cocktails)
    const shots = useSelector(state => state.fetch.shots)
    const punches = useSelector(state => state.fetch.punches)

    //Loading states
    const isLoading = useSelector((state) => state.fetch.isLoadingPopular)
    const isLoadingNew = useSelector((state) => state.fetch.isLoadingNewest)
    const isLoadingCocktails = useSelector((state) => state.fetch.isLoadingCocktails)
    const isLoadingShots = useSelector((state) => state.fetch.isLoadingShots)
    const isLoadingPunches = useSelector((state) => state.fetch.isLoadingPunches)

    //Function to check if a drink is in a users favorite list
    const isAFave = (id) => {
        let found = false

        if (!favorites) {return false}

        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].idDrink === id) {return true;}
        }
        return found
    }

    const onRefresh = useCallback(() => {
        setRefreshingMain(true)
        refreshControl().then(setRefreshingMain(false))
    }, []);

    const refreshControl = async () => {
        dispatch(fetchPopular())
        dispatch(fetchNew())
        dispatch(fetchCocktails())
        dispatch(fetchShots())
        dispatch(fetchPunches())
    }

    useEffect(() => {
        dispatch(fetchPopular())
        dispatch(fetchNew())
        dispatch(fetchCocktails())
        dispatch(fetchShots())
        dispatch(fetchPunches())
    }, [])


    return <View style={styles.container}>
        <HeaderCustom/>
        {!isLoading && !isLoadingNew && !isLoadingCocktails && !isLoadingShots && !isLoadingPunches?
            <ScrollView refreshControl={<RefreshControl refreshing={refreshingMain} onRefresh={()=>onRefresh()} />} style={styles.list_container}>

                <ResultList
                    refreshControl={refreshControl}
                    cocktails={popular}
                    isAFave={isAFave}
                    title={"Most Popular"}
                    horizontal={true}
                />
                <ResultList
                    refreshControl={refreshControl}
                    cocktails={newest}
                    isAFave={isAFave}
                    title={"Just Added"}
                    horizontal={true}
                />
                <ResultList
                    refreshControl={refreshControl}
                    cocktails={cocktails}
                    isAFave={isAFave}
                    title={"Cocktails"}
                    horizontal={true}
                />
                <ResultList
                    refreshControl={refreshControl}
                    cocktails={shots}
                    isAFave={isAFave}
                    title={"Shots"}
                    horizontal={true}
                />
                <ResultList
                    refreshControl={refreshControl}
                    cocktails={punches}
                    isAFave={isAFave}
                    title={"Party Punches"}
                    horizontal={true}
                />
            </ScrollView>
            :
            <ActivityIndicator
                size={'large'}
                style={{alignSelf: "center", marginVertical: '25%'}}
            />}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242525",

    },

    list_container: {

        height: "35%",
        alignContent: "center"
    },
    search_result_txt: {
        marginHorizontal: '20%',
        marginVertical: '1%',
        fontSize: 22,

    }
})

export default HomeScreen
