import { useContext } from "react";
import { Authcontext } from "./AuthContext";

export function useAuth() {
    const context = useContext(Authcontext);
    if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
  }