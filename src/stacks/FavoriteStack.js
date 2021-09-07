import React from 'react'
import {createStackNavigator} from "@react-navigation/stack";
import ShowDrinkScreen from "../screens/ShowDrinkScreen";
import FavoriteScreen from "../screens/FavoritesScreen";

const Stack = createStackNavigator()

const FavoriteStack = () =>{
    return(
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name={"FavoriteScreen"} component={FavoriteScreen}/>
            <Stack.Screen name={"ShowScreen"} component={ShowDrinkScreen}/>
        </Stack.Navigator>
    )
}

export default FavoriteStack
