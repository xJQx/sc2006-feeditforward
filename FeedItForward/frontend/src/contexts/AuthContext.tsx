import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
  useEffect
} from "react";
import { UserDisplay } from "../utils/schema";

// Define context type
interface IAuthContext {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  user: UserDisplay | null;
  setUser: Dispatch<SetStateAction<UserDisplay | null>>;
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
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  // const [user, setUser] = useState<User | null>(null);

  const contextValue: IAuthContext = {
    isLoggedIn,
    setIsLoggedIn,
    user,
    setUser
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
