import React, { useState, useRef } from "react"
import { useHistory } from "react-router"

const axios = require('axios');

export const PasswordReset = () => {
    
    const [email, setEmail] = useState('')
    const [success, setSuccess] = useState(true)
    const history = useHistory()

    const input = useRef()

    const changeEmailValue = (event) =>  {
        setEmail(event.target.value)
    }

    async function resetPw(){

        const body = {
            'email': email
        }

        try {
            await axios.post(`http://127.0.0.1:8000/api/v1/users/password_reset/`, 
            body)
            history.push(`/reset_done`)
        }
        catch (e){
            setSuccess(false)
            input.current.style.borderColor = '#ff0000'
        }
    } 

    return (
        <div>
            <form action="">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                {!success && <span className="warning-message">Введите корректный Email</span>}
                <input ref={input} onChange={(event) => {return changeEmailValue(event)}} type="email" class="form-control email-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <button type="button" class="btn btn-primary" onClick={resetPw}>Submit</button>
            </form>
        </div>
    )
}
