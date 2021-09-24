import React, {useCallback} from 'react'
import {FlatList, StyleSheet, Text, View} from 'react-native'
import DrinkCard from "./DrinkCard";
import {StatusBar} from "expo-status-bar";
import {useSelector} from "react-redux";
import DrinkCardVerticle from "./DrinkCardVerticle";

const ResultList = ({cocktails, isAFave, refreshControl, isLoading, title, horizontal = false}) => {

    const refreshing = useSelector(state => state.fetch.isRefreshing)

    const onRefresh = useCallback(() => {
        refreshControl()
    }, []);


    const ItemToRender = ({item}) => {
        return horizontal ? <DrinkCard isFave={isAFave(item.idDrink)} item={item}/> :
            <DrinkCardVerticle isFave={isAFave(item.idDrink)} item={item}/>
    }

    if (!isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                    <View style={styles.lineBreak}/>
                {horizontal?
                    <FlatList style={styles.list_container} keyExtractor={(item, index) => 'key' + index} data={cocktails}
                              renderItem={ItemToRender}
                              onRefresh={() => {
                                  onRefresh()
                              }}
                              refreshing={refreshing}
                              horizontal={horizontal}
                              scrollIndicatorInsets={{right:1}}
                    />
                :
                    <FlatList style={styles.list_container} contentContainerStyle={{paddingBottom:20}} keyExtractor={(item, index) => 'key' + index} data={cocktails}
                              renderItem={ItemToRender}
                              onRefresh={() => {
                                  onRefresh()
                              }}
                              refreshing={refreshing}
                              horizontal={horizontal}
                              scrollIndicatorInsets={{right:1}}
                    />}

            </View>
        )
    } else {
        return (
            <>
                <StatusBar style={"auto"}/>
            </>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,
        marginBottom: '7%',
        marginHorizontal: '2%',
    },
    text: {
        fontFamily: "OpenSans_800ExtraBold",
        marginLeft: 5,
        fontSize: 32,
        color:'#ebebeb',
        textShadowRadius:1,
        textShadowColor:'#000000',

    },
    lineBreak:{
        borderBottomWidth:2,
        borderColor:"#e67bec",
        width:"100%",
        height:1,
    },
    list_container:{
        paddingVertical:'3%',
    }
})

export default ResultList
