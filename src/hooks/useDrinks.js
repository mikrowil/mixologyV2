import React,{useState,useEffect} from 'react'
import cocktailApi from "../api/cocktailApi";
import cocktailsApi from "../api/cocktailApi";
import {auth, firestore} from "../configs/firebaseSetup";

export default ()=>{
    const [cocktails,setCocktails] = useState([])

    const [favorites,setFavorites] = useState([])
    const [isFaveSet,setIsFaveSet] = useState(false)

    const searchApi = async (searchTerm)=>{
        try{
            const response = await cocktailsApi.get(`/search.php?s=${searchTerm}`,[])

            setCocktails(response.data.drinks)

        }catch (e){
            console.log(e)
        }
    }

    const getFavorites = async ()=>{
        try{
            const response = await firestore.collection("users").doc(auth.currentUser.uid).get()
            const res = response.data().favorites
            setFavorites(res)

        }catch (e){
            //console.log(e)
        }
    }


    const getPopular = async () =>{
        try{
            const response = await cocktailsApi.get("/popular.php",[])
            setCocktails(response.data.drinks)

        }catch (e){
            //console.log(e)
        }
    }


    const isAFave = (id) =>{
        let found = false

        if(!favorites){
            return false
        }

        if(!favorites.length){
            return false
        }

        for(let i =0;i<favorites.length;i++){
            if(favorites[i].id === id){
                return true;
            }
        }
        return found

    }

    useEffect(()=>{
        getFavorites().then(getPopular())


    },[])

    return [cocktails,searchApi,isAFave]
}
