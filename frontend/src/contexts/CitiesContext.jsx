import { createContext, useState, useEffect, useContext } from "react";


const BASE_URL = "https://worldwise-backend-iota.vercel.app/api/auth";

const CitiesContext = createContext();
 export default function CitiesProvider({children}){
    const [cities,setcities]=useState([]);
    const [loading,setloading]=useState(false);
    const [currentcity,setcurrentcity]=useState({})
    useEffect(function(){
      async function fetchCities(){
        try{
          setloading(true)
          const res =await fetch(`${BASE_URL}/cities`);
          const data =await res.json();
          setcities(data);
          
        }
        catch{
            alert(" Error in Loading cities");
        }
        finally{
          setloading(false);
        }
      }
      fetchCities();
    },[]);
    async function getCity(id){
      try{
        setloading(true)
        const res =await fetch(`${BASE_URL}/cities/${id}`);
        const data =await res.json();
        setcurrentcity(data);
      }
      catch{
          alert(" Error in Loading cities1");
      }
      finally{
        setloading(false);
      }
    }
    async function createCity(newCity){
      try{
        setloading(true)
        const res =await fetch(`${BASE_URL}/cities`,
          {method:"POST",
            body:JSON.stringify(newCity),
            headers:{
              "Content-Type":"application/json",
            },
          }
        );
        const data =await res.json();
        
        setcities((cities)=>[...cities,data])
      }
      catch{
          alert(" Error in Loading cities");
      }
      finally{
        setloading(false);
      }
    }
    async function deleteCity(id){
      try{
        setloading(true)
       await fetch(`${BASE_URL}/cities/${id}`,
          {method:"DELETE",}
        );
        
        setcities((cities)=>{cities.filter((city)=>city.id !==id)})
      }
      catch{
          alert(" Error in deleting cities");
      }
      finally{
        setloading(false);
      }
    }
    return( 
        <CitiesContext.Provider 
        value={{
          cities,loading,currentcity,getCity,createCity,deleteCity
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