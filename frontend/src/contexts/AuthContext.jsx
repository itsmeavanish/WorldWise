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
const getTrips = () =>JSON.parse(localStorage.getItem("trips")) || [];
const initialState = {
  user: getUser(),
  isAuthenticated: !!getToken(),
  loading: false,
  error: null,
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
  const [{ user, isAuthenticated, loading, error, trips }, dispatch] = useReducer(reducer, initialState);
  
  const fetchUserProfile = async () => {
    try {
      dispatch({ type: "loading" });
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
    const setTrips = (value) => dispatch({ type: "setTrips", payload: value });
    const setLoading=(value)=>dispatch({type:"loading",payload:value});
  const fetchTrips=async()=>{
    try{
      const token=getToken();
      if(!token) throw new Error("No Authntication Token Found and this error is found at AuthContext at fetchTrips function");
      const response=await fetch(`${API_BASE_URL}api/auth/trips?userId=${user._id}`);
      if (!response.ok) {
        throw new Error("Failed to fetch trips");
      }
      const data = await response.json();
      if (data && data.length > 0) {
        setTrips(data);
        localStorage.setItem("trips", JSON.stringify(data));
      } else {
        setTrips([]);
        localStorage.removeItem("trips");
      }
    }
    catch(error){
      console.log("Error fetching trips:", error);
      dispatch({ type: "error", payload: error.response?.data?.error || "Failed to fetch trips" });
    }
  }
  useEffect(() => {
    if (isAuthenticated) {
      fetchUserProfile();
      fetchTrips();
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
    try{
      const response=await axios.post(`${API_BASE_URL}api/auth/trips/tripregister`,tripData);
      console.log("Trip saved successfully",response.data);
      toast.success("Trip saved successfully!");
    }
    catch(error){
      console.error("Error saving trip:", error);
      toast.error("Failed to save trip.");
    }
  }
  const createTrip=async(tripData)=>{
    console.log(tripData)
    try {
       
      const response = await axios.post(`${API_BASE_URL}api/auth/tripplan/firebase`, tripData);
      saveTrip(tripData)
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
      const response=await axios.get(`http://localhost:4000/api/auth/trips/all?userId=${user._id}`);

      console.log("Trips Response",response);
    } catch (error) {
      toast.error("Error in Loading your Trips");
      console.log(error);
    }
  }
  const fetchTrip=async(currentcity)=>{
    try {
          if(trips?.metadata?.city!==currentcity?.cityName){
          const response = await axios.get(`${API_BASE_URL}api/auth/tripplan/firebase?userId=${user._id}&city=${currentcity.cityName}`);
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
        login,
        logout,
        setTrips,
        saveTrip,
        createTrip,
        setLoading,
        fetchTripbyUser,
        fetchTrip,
      }}>
      {children}
    </Authcontext.Provider>
  );
}

export { Authcontext };
