import { createContext, useReducer, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { redirect, useNavigate } from "react-router-dom";

const Authcontext = createContext();

const getToken = () => localStorage.getItem("token");
const getUser = () => {
  try {
    const item = localStorage.getItem("user");
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Failed to parse user from localStorage:", error);
    return null;
  }
};
const getSavedTrips=()=>
  JSON.parse(localStorage.getItem("savedTrips")) || [];

const getTrips = () =>JSON.parse(localStorage.getItem("trips")) || [];
const initialState = {
  user: getUser(),
  isAuthenticated: !!getToken(),
  loading: false,
  error: null,
  savedTrips:getSavedTrips(),
  trips: getTrips(),
  
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, loading: false, error: null };
    case "logout":
      return { ...state, user: null, isAuthenticated: false, loading: false, trips: [] };
    case "loading":
      return { ...state, loading: action.payload ?? true, error: null };
    case "error":
      return { ...state, loading: false, error: action.payload };
    case "setTrips":
      localStorage.setItem("trips", JSON.stringify(action.payload));
      return { ...state, trips: action.payload };
      case "setSavedTrips":
      localStorage.setItem("savedTrips", JSON.stringify(action.payload));
      return { ...state, savedTrips: action.payload };
    case "setUser":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    default:
      throw new Error("Unknown action type");
  }
}

export default function AuthProvider({ children }) {
  const API_BASE_URL = "https://worldwise-backend-iota.vercel.app/";
  const [{ user, isAuthenticated, loading, error,savedTrips ,trips }, dispatch] = useReducer(reducer, initialState);
  
  const fetchUserProfile = async () => {
    try {
      dispatch({ type: "loading", value:true});
      const token = getToken();
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(`${API_BASE_URL}api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "setUser", payload: response.data });

    } catch (err) {
      console.error("Error fetching user profile:", err);
      dispatch({ type: "error", payload: err.response?.data?.error || "Failed to fetch user profile" });
    }
  };
  const setSavedTrips=(value)=>dispatch({type:"setSavedTrips",payload:value});
    const setTrips = (value) => dispatch({ type: "setTrips", payload: value });
    const setLoading=(value)=>dispatch({type:"loading",payload:value});
      const fetchSavedTrips=async()=>{
    try{
      const response =await axios.get(`${API_BASE_URL}api/auth/trips/fetch?userId=${user._id}`);
      setSavedTrips(response.data);
      console.log("Saved Trips",response.data)
      console.log("Saved trips fetched successfully:", response.data);
    }
    catch(error){
      console.error("Error fetching saved trips:", error);
      toast.error("Failed to fetch saved trips.");
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
    } else {
      dispatch({ type: "loading", payload: false });
    }
  }, [isAuthenticated]);

  const login = () => dispatch({ type: "login" });
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("trips");
    dispatch({ type: "logout" });
  };
  const saveTrip=async(tripData)=>{
    const imageUrl=await fetchImage(tripData.cityName)
    const newTrip={
      destination:tripData.cityName,
      strength:tripData.strength,
      startDate:tripData.startDate,
      endDate:tripData.endData,
      tripType:tripData.tripType,
      budget:tripData.budget,
      userId:tripData.userId,
      imageUrl
    }
    try{
      const response=await axios.post(`${API_BASE_URL}api/auth/trips/tripregister`,newTrip);
      toast.success("Trip saved successfully!");
    }
    catch(error){
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip.");
    }
  }
  async function fetchImage(query) {
    const API_KEY = import.meta.env.GOOGLE_SEARCH_API_KEY;
    const CX = import.meta.env.GOOGLE_SEARCH_CX;
    const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(query)}&searchType=image&key=${API_KEY}&cx=${CX}`;
  
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data?.items?.[0]?.link || null;
    } catch (err) {
      console.error("Image fetch failed:", err);
      return null;
    }
  }
  const createTrip=async(tripData)=>{
    console.log(tripData)
    
    try {
      const response = await axios.post(`${API_BASE_URL}api/auth/tripplan/firebase`, tripData);
      await saveTrip(tripData);
      toast.success("Trip planned successfully!");
      window.location.href="/tripplan"
    } catch (error) {
      console.error("Error fetching trip:", error);
      toast.error("Trip planning failed.");
    } finally {
      setLoading(false);
    }
  }
  const fetchTripbyUser=async()=>{
    try {
      const response=await axios.get(`${API_BASE_URL}api/auth/trips/all?userId=${user._id}`);

      console.log("Trips Response",response);
    } catch (error) {
      toast.error("Error in Loading your Trips");
      console.log(error);
    }
  }
  const fetchTrip=async(cityName)=>{
    try {
          if(trips?.metadata?.city!==cityName){
          const response = await axios.get(`${API_BASE_URL}api/auth/tripplan/firebase?userId=${user._id}&city=${cityName}`);
          console.log("Fetched trip data:", response.data);
          setTrips(response.data)}
    
        } catch (error) {
          toast.error("Error fetching trip data: " + error.message);
          console.error("Error fetching trip data:", error);
        }
  }
  return (
    <Authcontext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        trips,
        savedTrips,
        login,
        logout,
        setTrips,
        saveTrip,
        createTrip,
        setLoading,
        fetchSavedTrips,
        fetchTripbyUser,
        fetchTrip,
      }}>
      {children}
    </Authcontext.Provider>
  );
}

export { Authcontext };
