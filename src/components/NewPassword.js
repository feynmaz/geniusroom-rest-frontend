import React, { useState, useEffect } from "react"
import axios from "axios"


export const NewPassword = ({ params }) => {
    
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    const changePass1 = (event) =>  {
        setPassword1(event.target.value)
    }
    const changePass2 = (event) =>  {
        setPassword2(event.target.value)
    }

    async function changePassword(){
        if(password1 && password2 && password1 === password2){
            const token = params['token']

            const body = {
                'token': token,
                'password': password1,
            }

            const response = await axios.post(`http://127.0.0.1:8000/api/v1/users/password_reset/confirm/`, body)
        }
        else{
            alert('Неверный ввод')
        }
    }

    return (
        <div>
            <form action="">
                <div class="form-group">
                    <label for="exampleInputPassword1">Введите пароль</label>
                    <input onChange={(event) => {return changePass1(event)}} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Повторите пароль</label>
                    <input onChange={(event) => {return changePass2(event)}} type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" class="btn btn-primary" onClick={changePassword}>Submit</button>
            </form>
        </div>
    )

}