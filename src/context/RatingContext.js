import { createContext } from "react";
import { useContext } from "react";
import { React } from 'react'

export const RatingContext = createContext({
    rating: null,
})