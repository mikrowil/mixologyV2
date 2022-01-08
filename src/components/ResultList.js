import React, {useCallback, useRef} from 'react'
import {ActivityIndicator, Animated, StyleSheet, Text, View} from 'react-native'
import DrinkCard from "./DrinkCard";
import {useSelector} from "react-redux";
import DrinkCardVertical from "./DrinkCardVertical";

/**
 Shows a list of card views containing cocktail data.
 @param {array} cocktails - an array of cocktails to be displayed
 @param {function} isAFave - function that determines if a drink is in the users
 favorites list
 @param {function} refreshControl - callback function to handle the pull down
 refresh of the result list
 @param {bool} isLoading - determines loading state of the list
 @param {string} title - title of the list
 @param {bool} horizontal - determines the direction of the list, defaults to
 false
 @returns {JSX.Element}
 @constructor
 */
const ResultList = ({cocktails, isAFave, refreshControl, isLoading, title, horizontal = false}) => {

    //Scroll references for animations
    const scrollX = useRef(new Animated.Value(0)).current
    const scrollY = useRef(new Animated.Value(0)).current

    const refreshing = useSelector(state => state.fetch.isRefreshing)

    //Creates a callback for the refresh function
    const onRefresh = useCallback(() => {
        refreshControl()
    }, []);

    /**
     Item for the list, to be rendered
     @param {object} item - drink data object to be displayed
     @param {number} index - determines the index of the item in the list
     @returns {JSX.Element}
     */
    const ItemToRender = ({item, index}) => {

        let scale = 0

        if (horizontal) {
            scale = scrollX.interpolate({
                inputRange: [-1, 0, 220 * index, 220 * (index + 2)],
                outputRange: [1, 1, 1, 0]
            })
        } else {
            scale = scrollY.interpolate({
                inputRange: [-1, 0, 140 * index, 140 * (index + 2)],
                outputRange: [1, 1, 1, 0]
            })
        }

        return horizontal ?
            <Animated.View style={{transform: [{scale}]}}><DrinkCard isFave={isAFave(item.idDrink)}
                                                                     item={item}/></Animated.View> :
            <Animated.View style={{transform: [{scale}]}}><DrinkCardVertical isFave={isAFave(item.idDrink)}
                                                                             item={item}/></Animated.View>
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
                                       onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {useNativeDriver: true})}
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
                                       onScroll={Animated.event([{nativeEvent: {contentOffset: {y: scrollY}}}], {useNativeDriver: true})}
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
        alignSelf:"center",
        fontFamily: "OpenSans_800ExtraBold",
        marginLeft: 5,
        fontSize: 32,
        color: '#ebebeb',
        shadowColor: "#000000",
        shadowOpacity: 0.9,
        shadowOffset: {width: 2, height: 3},
        shadowRadius: 3,
        elevation: 1,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10

    },
    lineBreak: {
        borderBottomWidth: 2,
        borderColor: "#e67bec",
        width: "95%",
        height: 1,

        alignSelf: "center",
        shadowColor: "#000000",
        shadowOpacity: 0.7,
        shadowOffset: {width: 2, height: 3},
        shadowRadius: 3,
        elevation: 5,
    },
    list_container: {
        paddingVertical: '3%',
    }
})

export default ResultList
