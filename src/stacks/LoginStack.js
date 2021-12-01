import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/Login";

const Stack = createStackNavigator()

const LoginStack = () =>{
    return <Stack.Navigator screenOptions={{
        headerShown: false
    }}>
        <Stack.Screen name={"LoadingScreen"} component={LoadingScreen}/>
        <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
    </Stack.Navigator>
}

export default LoginStack
