import { React, useState, useEffect } from 'react'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)

    const login = (token, userId) => {
        setToken(token)
        setUserId(userId)
        localStorage.setItem('token', token)
        localStorage.setItem('userId', userId)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        token && userId && login(token, userId)
    }, [])

    return { token, userId, login }
}