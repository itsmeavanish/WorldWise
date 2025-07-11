import { createContext, useState, useEffect, useContext, useReducer } from "react";
import { useAuth } from "./useAuth";
const BASE_URL = "https://worldwise-backend-iota.vercel.app/api/auth";
const getcurrentCity = () =>JSON.parse(localStorage.getItem("currentcity")) || {};
const CitiesContext = createContext();
const cityState = {
  cities:[],
  loading:false,
  currentcity:getcurrentCity(),
};
function reducer(state,action){
  switch(action.type){
    case"setCities":
    return{...state,cities:action.payload}
    case "setLoading":
    return{...state,loading:action.payload}
    case "setCurrentCity":
      localStorage.setItem("currentcity", JSON.stringify(action.payload));
    return{...state,currentcity:action.payload}
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
 export default function CitiesProvider({children}){
  const {user}=useAuth();
  const userId = user?._id;
  
  const [{cities, loading, currentcity}, dispatch] = useReducer(reducer,cityState);
  const setLoading=(value)=>dispatch({type:"setLoading",payload:value});
      async function fetchCities(){
        try{
          dispatch({type:"setLoading",payload:true});
          const res =await fetch(`${BASE_URL}/city/fetch?userId=${userId}`);
          const data =await res.json();
          if(data.length){
            dispatch({type:"setCities",payload:data});
          }

        }
        catch{
            alert(" Error in Loading cities");
        }
        finally{
          dispatch({type:"setLoading",payload:false});
        }
      }
    async function getCity(id){

      try{
        dispatch({type:"setLoading",payload:true});
        const data = cities.find(item => item._id === id);
        
        if(data){
        dispatch({type:"setCurrentCity",payload:data});}
      }
      catch{
          alert(" Error in Loading cities1");
      }
      finally{
        dispatch({type:"setLoading",payload:false});
      }
    }
    async function createCity(newCity){
      try{
      dispatch({type:"setLoading",payload:true});
        const res =await fetch(`${BASE_URL}/city/post`,
          {method:"POST",
            body:JSON.stringify(newCity),
            headers:{
              "Content-Type":"application/json",
            },
          }
        );
        const data =await res.json();
        
        dispatch({type:"setCities",payload:[...cities,data]});
        dispatch({type:"setCurrentCity",payload:data});
      }
      catch{
          alert(" Error in Loading cities");
      }
      finally{
        dispatch({type:"setLoading",payload:false});
      }
    }
    async function deleteCity(id){
      try{
       dispatch({type:"setLoading",payload:true});
       await fetch(`${BASE_URL}/city/delete/${id}`,
          {method:"DELETE",}
        );
        
        const updatedCities = cities.filter(city => city._id !== id);
        dispatch({type:"setCities",payload:updatedCities});
      }
      catch{
          alert(" Error in deleting cities");
      }
      finally{
        dispatch({type:"setLoading",payload:false});
      }
    }
    const setcurrentcity=(value)=>{
      dispatch({type:"setCurrentCity",payload:value});
    }
    return( 
        <CitiesContext.Provider 
        value={{
          cities,loading,currentcity,getCity,createCity,deleteCity,setcurrentcity,fetchCities,setLoading
          }}>
            {children}
        </CitiesContext.Provider>
    );
};
function useCities(){
  const context=useContext(CitiesContext);
  console.log(context);
  if (context===undefined ){
    throw new Error("CitiesContext was used before cities provider")
    
  }
  return context
}
export  {CitiesContext,useCities};