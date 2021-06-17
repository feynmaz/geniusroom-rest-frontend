import { React, useState, useEffect } from 'react'

export const useAuth = () => {
    const [access, setAccess] = useState(null)

    const grantAccess = (access) => {
        setAccess(access)
        localStorage.setItem('access', access)
    }

    const closeAccess = (access) => {
        setAccess(null)
        localStorage.removeItem('access')
    }

    useEffect(() => {
        const access = localStorage.getItem('access')
        access ? grantAccess(access) : closeAccess(access)
    }, [])

    return { access, grantAccess, closeAccess }
}