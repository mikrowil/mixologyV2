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
    OpenSans_300Light,
    OpenSans_800ExtraBold,
    OpenSans_600SemiBold

} from '@expo-google-fonts/open-sans';
import {Poppins_800ExtraBold}from '@expo-google-fonts/poppins'
import SearchScreen from "./src/screens/SearchScreen";
import SearchStack from "./src/stacks/SearchStack";
import {ActivityIndicator, Text, View} from "react-native";

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
        OpenSans_800ExtraBold,
        Poppins_800ExtraBold,
        OpenSans_600SemiBold
    })

    useEffect(()=>{
        dispatch(checkAuth())
    },[])

    useEffect(()=>{
        if(loggedIn){
            dispatch(fetchFavorites())
        }
    },[loggedIn])

    if((loggedIn && isLoading) || !fontsLoaded && loggedIn){
        return <View style={{justifyContent:'center',alignItems:'center',flex:1, backgroundColor:'#242525'}}>
            <ActivityIndicator size={'large'}/>
        </View>
    }


    return(
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                {!loggedIn?
                    <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
                    :
                    <Stack.Screen options={{gestureEnabled: false}} name={"MainApp"} component={MainApp}/>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MainApp = ()=>{

    return(

        <Drawer.Navigator drawerContentOptions={{activeTintColor:'#e67bec',inactiveTintColor:'#ebebeb'}} drawerStyle={{
            backgroundColor: '#242525',
        }} drawerType="back">
            <Drawer.Screen options={{drawerIcon: ({focused, size}) => (
                    <AntDesign  name={"home"} color={focused?"#e67bec":"#ebebeb"} size={24}/>
                ),}} name={"Home"} component={HomeStack}/>
            <Drawer.Screen options={{drawerIcon: ({focused, size}) => (
                    <AntDesign name={"meh"} color={focused?"#e67bec":"#ebebeb"} size={24}/>
                ),}} name={"Mood"} component={MoodStack}/>
            <Drawer.Screen  name={"Favorites"} component={FavoriteStack} options={{title:"Favorites",
                drawerIcon:({focused,size}) =>(
                    <AntDesign size={24} color={focused?"#e67bec":"#ebebeb"} name={"hearto"}/>
                )}}/>
            <Drawer.Screen name={"SearchStack"} component={SearchStack}/>

        </Drawer.Navigator>

    )
}


export default App
