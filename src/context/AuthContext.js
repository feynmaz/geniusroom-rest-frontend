import { createContext } from "react";
import { useContext } from "react";
import { React } from 'react'

export const AuthContext = createContext({
    access: null,
    grantAccess: () => {},
    closeAccess: () => {},
})