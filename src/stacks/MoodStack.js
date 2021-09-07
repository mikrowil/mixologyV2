import React from "react";
import {Text, View} from "react-native";
import {createStackNavigator} from "@react-navigation/stack";
import MoodScreen from "../screens/MoodScreen";
import ShowDrinkScreen from "../screens/ShowDrinkScreen";

const Stack = createStackNavigator()

const MoodStack = () =>{
    return <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name={"MoodScreen"} component={MoodScreen}/>
        <Stack.Screen name={"ShowScreen"} component={ShowDrinkScreen}/>
    </Stack.Navigator>
}

export default MoodStack