import React from "react";
import {Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "../screens/HomeScreen";
import ShowDrinkScreen from "../screens/ShowDrinkScreen";

const Stack = createStackNavigator()

const HomeStack = (props) =>{

    const favoriteList = props.route.params

    return <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name={"HomeScreen"} initialParams={{favoriteList}} component={HomeScreen}/>
        <Stack.Screen name={"ShowScreen"} component={ShowDrinkScreen}/>
    </Stack.Navigator>
}

export default HomeStack
