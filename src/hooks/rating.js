import { useState, useEffect } from 'react'


export const useRating = () => {
    const [rating, setRating] = useState(null)


    // useEffect(() => {
    //     const access = localStorage.getItem('access')
    //     const refresh = localStorage.getItem('refresh')
    //     access && refresh && login(access, refresh) 
    // }, [])

    return { rating }
}