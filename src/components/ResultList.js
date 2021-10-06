import React, {useCallback, useRef} from 'react'
import {ActivityIndicator, Animated, FlatList, StyleSheet, Text, View} from 'react-native'
import DrinkCard from "./DrinkCard";
import {useSelector} from "react-redux";
import DrinkCardVertical from "./DrinkCardVertical";

const ResultList = ({cocktails, isAFave, refreshControl, isLoading, title, horizontal = false}) => {

    const scrollX = useRef(new Animated.Value(0)).current
    const scrollY = useRef(new Animated.Value(0)).current

    const refreshing = useSelector(state => state.fetch.isRefreshing)

    const onRefresh = useCallback(() => {
        refreshControl()
    }, []);


    const ItemToRender = ({item, index}) => {

        let scale = 0

        if(horizontal){
            scale = scrollX.interpolate({
                inputRange:[-1,0, 220 * index, 220 * (index + 2)],
                outputRange:[1,1,1,0]
            })
        }else {
            scale = scrollY.interpolate({
                inputRange:[-1,0, 140 * index, 140 * (index + 2)],
                outputRange:[1,1,1,0]
            })
        }

        return horizontal ?
            <Animated.View style={{transform:[{scale}]}}><DrinkCard isFave={isAFave(item.idDrink)} item={item} /></Animated.View> :
            <Animated.View style={{transform:[{scale}]}}><DrinkCardVertical isFave={isAFave(item.idDrink)} item={item}/></Animated.View>
    }

    if (!isLoading) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{title}</Text>
                <View style={styles.lineBreak}/>
                {horizontal ?
                    <Animated.FlatList style={styles.list_container} contentContainerStyle={{paddingBottom: 20}}
                                       keyExtractor={(item, index) => 'key' + index} data={cocktails}
                                       renderItem={ItemToRender}
                                       onRefresh={() => {
                                           onRefresh()
                                       }}
                                       refreshing={refreshing}
                                       horizontal={horizontal}
                                       scrollIndicatorInsets={{right: 1}}
                                       onScroll={Animated.event([{nativeEvent:{contentOffset:{x:scrollX}}}], {useNativeDriver:true})}
                                       scrollEventThrottle={20}
                    />
                    :
                    <Animated.FlatList style={styles.list_container} contentContainerStyle={{paddingBottom: 100}}
                              keyExtractor={(item, index) => 'key' + index} data={cocktails}
                              renderItem={ItemToRender}
                              onRefresh={() => {
                                  onRefresh()
                              }}
                              refreshing={refreshing}
                              horizontal={horizontal}
                              scrollIndicatorInsets={{right: 1}}
                                       onScroll={Animated.event([{nativeEvent:{contentOffset:{y:scrollY}}}], {useNativeDriver:true})}
                                       scrollEventThrottle={20}
                    />}

            </View>
        )
    } else {
        return (
            <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
                <ActivityIndicator size={"large"}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 5,


    },
    text: {
        fontFamily: "OpenSans_800ExtraBold",
        marginLeft: 5,
        fontSize: 32,
        color: '#ebebeb',
        shadowColor: "#000000",
        shadowOpacity: 0.9,
        shadowOffset: {width: 2, height: 3},
        shadowRadius: 3,

    },
    lineBreak: {
        borderBottomWidth: 2,
        borderColor: "#e67bec",
        width: "100%",
        height: 1,
        marginHorizontal: '2%',

        shadowColor: "#000000",
        shadowOpacity: 0.7,
        shadowOffset: {width: 2, height: 3},
        shadowRadius: 3,
    },
    list_container: {
        paddingVertical: '3%',
    }
})

export default ResultList
