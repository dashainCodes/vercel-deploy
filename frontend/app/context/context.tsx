"use client"
import React, {
  createContext,
  ReactNode,
  useState,
  Dispatch,
  useEffect,
  SetStateAction,
} from "react";
import { AxiosInstance } from "../repositories/config";

export interface ContextValue {
  isSignUp: boolean;
  isLogin: boolean;
  isLoginOpen: boolean;
  isSignUPOpen: boolean;
  isOpen: boolean;
  isOpenInquery: boolean;
  openForm: boolean;
  isLoggedIn: boolean;
  user: Record<string, unknown>;
  loading: boolean;
  setIsSignUp: Dispatch<SetStateAction<boolean>>;
  setIsLogin: Dispatch<SetStateAction<boolean>>;
  setIsLoginOpen: Dispatch<SetStateAction<boolean>>;
  setIsSignUPOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setIsOpenInquery: Dispatch<SetStateAction<boolean>>;
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<Record<string, unknown>>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export const Context = createContext<ContextValue | undefined>(undefined);

interface AppContextProps {
  children: ReactNode;
}

export const AppContext: React.FC<AppContextProps> = ({ children }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUPOpen, setIsSignUPOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenInquery, setIsOpenInquery] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const contextValue: ContextValue = {
    isSignUp,
    isLogin,
    isSignUPOpen,
    isLoginOpen,
    isOpen,
    isOpenInquery,
    openForm,
    user,
    loading,
    setLoading,
    setIsSignUp,
    setIsLogin,
    setIsSignUPOpen,
    setIsLoginOpen,
    setIsOpen,
    setIsOpenInquery,
    setOpenForm,
    isLoggedIn,
    setIsLoggedIn,
    setUser,
  };

 ""
  console.log(isLoggedIn)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const { data } = await AxiosInstance.get("/users/user-from-token");
        setIsLoggedIn(true)
        setUser(data.data);
      } catch (error: any) {
        console.log(error.message);
        setUser({});
      }
    };
    fetchUserData();
  }, []);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export default AppContext;
