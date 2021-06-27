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
            await fetch(`https://geniusroom-rest-backend.herokuapp.com/api/v1/users/password_reset/`, {
                method: 'POST',
                headers : { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)    
            })
            history.push(`/reset_done`)
        }
        catch (e){
            setSuccess(false)
            input.current.style.borderColor = '#ff0000'
        }
    } 

    return (
        <div className="form-container">
            <form action="">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                {!success && <span className="warning-message">Введите корректный Email</span>}
                <input ref={input} onChange={(event) => {return changeEmailValue(event)}} type="email" class="form-control email-input" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <div className="form-footer">
                <button type="button" class="btn btn-primary" onClick={resetPw}>Submit</button>
            </div>
            </form>
        </div>
    )
}
