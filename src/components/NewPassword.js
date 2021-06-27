import React, { useState, useEffect } from "react"
import { useHistory } from "react-router"


export const NewPassword = ({ params }) => {
    
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [isValidToken, setIsValidToken] = useState(true)
    const [isLoading, setIsLoading] = useState(true)

    const history = useHistory()

    const changePass1 = (event) =>  {
        setPassword1(event.target.value)
    }
    const changePass2 = (event) =>  {
        setPassword2(event.target.value)
    }

    useEffect(() => {
        async function checkToken() {
            const token = params['token']
            const body = {
                'token': token,
            }
      
            try {
               await fetch(`https://geniusroom-rest-backend.herokuapp.com/api/v1/users/password_reset/validate_token/`, {
                    method: 'POST',
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(body)
               })
            } catch(e) {
                setIsValidToken(false)
            //     "Введённый пароль  должен содержать как минимум 8 символов.",
            //     "Введённый пароль должен состоять не только из цифр."
            }
            setIsLoading(false)
        }

        checkToken()
    }, [])

    async function changePassword(){
        if(password1 && password2 && password1 === password2){
            const token = params['token']

            const body = {
                'token': token,
                'password': password1,
            }

            try {
                await fetch(`https://geniusroom-rest-backend.herokuapp.com/api/v1/users/password_reset/confirm/`, {
                    method: 'POST',
                    headers : { 
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(body)
                })
                history.push('/login')
            } catch(e) {
                
            }
        }
        else{
             alert('Неверный ввод')
        }
    }

    return (
        isLoading 
        ? <h1>Загрузка...</h1>
        : !isValidToken 
        ? <h1>Такой страницы не существует!</h1>
        :  
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
            <button type="button" class="btn btn-primary" onClick={changePassword}>Submit</button>
        </form>
    

    <ul>
        <li>Пароль не должен быть слишком похож на другую вашу личную информацию.</li>
        <li>Ваш пароль должен содержать как минимум 8 символов.</li>
        <li>Такой пароль часто используется.</li>
        <li>Пароль не может состоять только из цифр.</li>
    </ul>
</div>  
    )
}