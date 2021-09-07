import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeStack from "./src/stacks/HomeStack";
import MoodStack from "./src/stacks/MoodStack";
import {navigationRef} from "./src/configs/RootNav";
import FavoriteStack from "./src/stacks/FavoriteStack";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./src/screens/Login";
import { AntDesign } from '@expo/vector-icons';
import {checkAuth} from "./src/redux/actions/authActions";
import {fetchFavorites} from "./src/redux/actions/fetchActions";
import {Provider, useDispatch, useSelector} from 'react-redux';
import {store} from './src/redux/store'
import {
    useFonts,
    OpenSans_300Light


} from '@expo-google-fonts/open-sans';
import {
    Poppins_600SemiBold
} from '@expo-google-fonts/poppins'

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const App = () => {

  return (
      <Provider store={store}>
        <NavContainer/>
      </Provider>
  );
}

const NavContainer = ()=>{

    const isLoading = useSelector((state)=>state.fetch.isLoadingFavorites)

    let dispatch = useDispatch()

    const loggedIn = useSelector((state)=>state.auth.loggedIn)

    const[fontsLoaded] = useFonts({
        OpenSans_300Light,
        Poppins_600SemiBold
    })

    useEffect(()=>{
        dispatch(checkAuth())
    },[])

    useEffect(()=>{
        if(loggedIn){
            dispatch(fetchFavorites())
        }
    },[loggedIn])

    if(isLoading || !fontsLoaded){
        return <>
            <StatusBar style={"auto"}/>
        </>
    }
    return(
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {!loggedIn || isLoading?
                    <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
                    :
                    <Stack.Screen options={{gestureEnabled: false}} name={"MainApp"} component={MainApp}/>
                    }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MainApp = () =>{

    return(
        <>
            <Drawer.Navigator drawerType="back">
                <Drawer.Screen options={{drawerIcon: ({focused, size}) => (
                        <AntDesign name={"home"} size={24}/>
                    ),}} name={"Home"} component={HomeStack}/>
                <Drawer.Screen options={{drawerIcon: ({focused, size}) => (
                        <AntDesign name={"meh"} size={24}/>
                    ),}} name={"Mood"} component={MoodStack}/>
                <Drawer.Screen  name={"Favorites"} component={FavoriteStack} options={{title:"Favorites",
                drawerIcon:({focused,size}) =>(
                    <AntDesign size={24} name={"hearto"}/>
                )}}/>
            </Drawer.Navigator>
        </>
    )
}

export default App
