import React, { useState } from "react"
import { useHistory } from "react-router"

const axios = require('axios');

export const PasswordReset = () => {
    
    const [email, setEmail] = useState('')
    const history = useHistory()

    const changeEmailValue = (event) =>  {
        setEmail(event.target.value)
    }

    async function resetPw(){

        const body = {
            'email': email
        }
        await axios.post(`http://127.0.0.1:8000/api/v1/users/password_reset/`, 
        body)
        
        // TODO: history.push(`/reset_done`)
        
        
    } 


    return (
        <div>
            <form action="">
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input onChange={(event) => {return changeEmailValue(event)}} type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
            </div>
            <button type="submit" class="btn btn-primary" onClick={resetPw}>Submit</button>
            </form>
        </div>
    )
}
