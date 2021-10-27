import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import HomeStack from "./src/stacks/HomeStack";
import MoodStack from "./src/stacks/MoodStack";
import {navigationRef} from "./src/configs/RootNav";
import FavoriteStack from "./src/stacks/FavoriteStack";
import {createStackNavigator} from "@react-navigation/stack";
import LoginScreen from "./src/screens/Login";
import {AntDesign, Feather, MaterialCommunityIcons} from '@expo/vector-icons';
import {Provider} from 'react-redux';
import {store} from './src/redux/store'
import {OpenSans_300Light, OpenSans_600SemiBold, OpenSans_800ExtraBold, useFonts} from '@expo-google-fonts/open-sans';
import {Poppins_800ExtraBold} from '@expo-google-fonts/poppins'
import SearchStack from "./src/stacks/SearchStack";
import {ActivityIndicator, View} from "react-native";
import LoadingScreen from "./src/screens/LoadingScreen";
import AccountScreen from "./src/screens/AccountScreen";

const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

const App = () => {

    return (
        <Provider store={store}>
            <NavContainer/>
        </Provider>
    );
}

const NavContainer = () => {

    const [fontsLoaded] = useFonts({
        OpenSans_300Light,
        OpenSans_800ExtraBold,
        Poppins_800ExtraBold,
        OpenSans_600SemiBold
    })


    if (!fontsLoaded) {
        return <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: '#242525'}}>
            <ActivityIndicator size={'large'}/>
        </View>
    }


    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>

                <Stack.Screen name={'LoadingScreen'} component={LoadingScreen}/>
                <Stack.Screen name={"LoginScreen"} component={LoginScreen}/>
                <Stack.Screen options={{gestureEnabled: false}} name={"MainApp"} component={MainApp}/>


            </Stack.Navigator>
        </NavigationContainer>
    )
}

const MainApp = () => {

    return (

        <Drawer.Navigator drawerContentOptions={{
            activeTintColor: '#e67bec',
            inactiveTintColor: '#ebebeb',
            itemStyle: {marginVertical: 15}
        }} drawerStyle={{
            backgroundColor: '#242525',
            paddingTop: 20,
        }} drawerType="back">
            <Drawer.Screen options={{
                drawerIcon: ({focused, size}) => (
                    <AntDesign name={"home"} color={focused ? "#e67bec" : "#ebebeb"} size={24}/>
                ),
            }} name={"Home"} component={HomeStack}/>
            <Drawer.Screen options={{
                title: "Account",
                drawerIcon: ({focused, size}) => (
                    <AntDesign name="user" size={24} color={focused ? "#e67bec" : "#ebebeb"}/>
                ),
            }} name={"AccountScreen"} component={AccountScreen}/>
            <Drawer.Screen options={{
                drawerIcon: ({focused, size}) => (
                    <AntDesign name={"meh"} color={focused ? "#e67bec" : "#ebebeb"} size={24}/>
                ),
            }} name={"Mood"} component={MoodStack}/>
            <Drawer.Screen name={"Favorites"} component={FavoriteStack} options={{
                title: "Favorites",
                drawerIcon: ({focused, size}) => (
                    <AntDesign size={24} color={focused ? "#e67bec" : "#ebebeb"} name={"hearto"}/>
                )
            }}/>
            <Drawer.Screen name={"SearchStack"} component={SearchStack} options={{
                title: "Search",
                drawerIcon: ({focused, size}) => (
                    <Feather color={focused ? "#e67bec" : "#ebebeb"} size={24} name="search"/>
                )
            }}/>

        </Drawer.Navigator>

    )
}


export default App
