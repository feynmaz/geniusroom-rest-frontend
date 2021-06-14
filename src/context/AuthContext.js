import { createContext } from "react";
import { useContext } from "react";
import { React } from 'react'

export const AuthContext = createContext({
    token: null,
    userId: null,
    login : () => {}
})