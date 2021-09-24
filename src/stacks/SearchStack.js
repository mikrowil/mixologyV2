import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import ShowDrinkScreen from "../screens/ShowDrinkScreen";
import SearchScreen from "../screens/SearchScreen";

const Stack = createStackNavigator()

const SearchStack = () =>{
    return <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name={"SearchScreen"} component={SearchScreen}/>
        <Stack.Screen name={"ShowScreen"} component={ShowDrinkScreen}/>
    </Stack.Navigator>
}

export default SearchStack
