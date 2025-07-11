import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import City from "./components/City";
import './styles/index.css';
import Form from "./components/Form";
import CityList from "./components/CityList";
import Country from "./components/CountryList";
import CitiesProvider from "./contexts/CitiesContext";
import Login from "./pages/login";
import { lazy, Suspense } from "react";
import Spinner from "./components/Spinner";
import Signup from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./contexts/AuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";
import Features from "./pages/Features";

import Trip from "./pages/Trip";
import Trips from "./pages/Trips";
import TravelLoadingAnimation from "./Trip-Fetching-Firebase/TravelLoadingAnimation";
const HomePage=lazy(()=>import("./pages/Homepage"));
const AppLayout=lazy(()=>import("./pages/AppLayout"));
const PagenotFound=lazy(()=>import("./pages/PagenotFound"));

export default function App() {
  return (

      <AuthProvider>
      <CitiesProvider>
      <BrowserRouter>
      <Suspense  fallback={<Spinner/>}>
      <Routes>
              <Route index element={<HomePage />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
              <Route path="*" element={<PagenotFound />} />
              <Route path="features" element={<Features />} />
                <Route path="tripplan" element={<ProtectedRoute><Trip /></ProtectedRoute>} />
                <Route path="trips" element={<ProtectedRoute><Trips /></ProtectedRoute>} />
                <Route path="loading" element={<TravelLoadingAnimation />} />
              <Route
                path="Applayout"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                
                 
                <Route index element={<Navigate replace to ="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<Country />} />
                <Route path="form" element={<Form />} />
                
              </Route>
            </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "black",
          },
        }}
      />
    </CitiesProvider>
    </AuthProvider>
  );
}
