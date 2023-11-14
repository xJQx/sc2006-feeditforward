import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import { UserDisplay } from "../schemas/user";
import { GoogleAuthDetails } from "../schemas/auth";

// Define context type
interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: UserDisplay | null;
  setUser: Dispatch<SetStateAction<UserDisplay | null>>;
  googleAuthDetails: GoogleAuthDetails | null;
  setGoogleAuthDetails: Dispatch<SetStateAction<GoogleAuthDetails | null>>;
}

// Create context
const AuthContext = createContext<IAuthContext | undefined>(undefined);

// Custom hook to access the context
export const useAuthContext = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
};

// Provider component
export const AuthContextProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  // ---------- IsLoggedIn ---------- //
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const authStateJson = localStorage.getItem("FeedItForward_authState");
    if (authStateJson) {
      const authState = JSON.parse(authStateJson);
      return authState ? authState.isLoggedIn : false;
    }
    return false;
  });

  useEffect(() => {
    // Save the state to local storage
    localStorage.setItem(
      "FeedItForward_authState",
      JSON.stringify({ isLoggedIn: isLoggedIn })
    );
  }, [isLoggedIn]);

  // ---------- User ---------- //
  const [user, setUser] = useState<UserDisplay | null>(() => {
    const userStateJson = localStorage.getItem("FeedItForward_userState");
    if (userStateJson) {
      const userState = JSON.parse(userStateJson);
      return userState.user;
    }
    return null;
  });

  useEffect(() => {
    // Save the state to local storage
    localStorage.setItem(
      "FeedItForward_userState",
      JSON.stringify({ user: user })
    );
  }, [user]);

  // ---------- Google Auth ---------- //
  const [googleAuthDetails, setGoogleAuthDetails] =
    useState<GoogleAuthDetails | null>(() => {
      const googleAuthStateJson = localStorage.getItem(
        "FeedItForward_googleAuthState"
      );
      if (googleAuthStateJson) {
        const googleAuthState = JSON.parse(googleAuthStateJson);
        return googleAuthState.googleAuthDetails;
      }
      return null;
    });

  useEffect(() => {
    // Save the state to local storage
    localStorage.setItem(
      "FeedItForward_googleAuthState",
      JSON.stringify({ googleAuthDetails: googleAuthDetails })
    );
  }, [googleAuthDetails]);

  // ---------- Context Value ---------- //
  const contextValue: IAuthContext = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser,
    googleAuthDetails,
    setGoogleAuthDetails
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
