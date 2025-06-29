import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

const Authcontext = createContext();

const getToken = () => localStorage.getItem("token");
const getUser = () => JSON.parse(localStorage.getItem("user")) || null;
const getTrips = () =>(localStorage.getItem("trips")) || [];

const initialState = {
  user: getUser(),
  isAuthenticated: !!getToken(),
  loading: true,
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
  const setTrips = (value) => dispatch({ type: "setTrips", payload: value });

  return (
    <Authcontext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        setTrips,
        trips,
      }}
    >
      {children}
    </Authcontext.Provider>
  );
}

export { Authcontext };
