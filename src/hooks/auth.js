import { React, useState, useEffect } from 'react'

import axios from "axios"

const jwt = require('jsonwebtoken')


export const useAuth = () => {
    const [access, setAccess] = useState(null)
    const [refresh, setResfresh] = useState(null)

    const grantAccess = (access) => {
        setAccess(access)
        localStorage.setItem('access', access)
    }

    const closeAccess = () => {
        setAccess(null)
        localStorage.removeItem('access')
    }

    const validateRefresh = (history) => {
        const {exp} = jwt.decode(refresh)
        if (exp * 1000 < (new Date().getTime() + 1)){
            logout(history)
            return false
        }else{
            return true
        }
    }

    const validateAccess = async (history) => {
        
        if (validateRefresh(history)){
            const {exp} = jwt.decode(access)
            if (exp * 1000 < (new Date().getTime() + 1)){
                const body = {
                    refresh: refresh
                }
                const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/token/refresh/`, body)
                grantAccess(response.data['access'])
                return response.data['access']
            }
            return access
        }     

    }

    const login = (access, refresh) => {
        grantAccess(access)
        setResfresh(refresh)
        localStorage.setItem('refresh', refresh)
    }

    const logout = (history) => {
        closeAccess()
        setResfresh(null)
        localStorage.removeItem('refresh')
        history.push('/login')
    } 

    useEffect(() => {
        const access = localStorage.getItem('access')
        const refresh = localStorage.getItem('refresh')
        access && refresh && login(access, refresh) 
    }, [])

    return { refresh, access, validateAccess, validateRefresh, login, logout }
}