import React, { useState, useContext } from "react"
import { useHistory } from "react-router"
import { Link } from "react-router-dom"
import axios from "axios"
import { AuthContext } from "../context/AuthContext"


export const Login = () => {
    const [form, setForm] = useState({
        username: '',
        password: ''
    })

    const { login } = useContext(AuthContext)
    const history = useHistory()

    const changeInputHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const submitLogin = async () =>{
        const body = {
            username: form.username,
            password: form.password,
        }
        const jwt = await axios.post(`https://geniusroom-rest-backend.herokuapp.com/api/v1/users/token/`, body, {
            headers : { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
               }
        })
        if (jwt) {
            login(jwt.data['access'], jwt.data['refresh'])
            history.push('/profile')
        }
    }

    return (
        <div className="form-container">
            <form>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>username</label>
                    <input name='username' className="form-control" value={form.username} onChange={(e) => changeInputHandler(e)} placeholder="Enter email" />
                </div>

                <div className="form-group input-password">
                    <label>password</label>
                    <input name='password' type="password" className="form-control" value={form.password}  onChange={(e) => changeInputHandler(e)} placeholder="Enter password" />
                </div>

                <div className="form-footer">
                    <button type="button" className="btn btn-primary btn-block" onClick={submitLogin}>Login</button>
                    <div className="forgot-password text-right">
                        Forgot <Link to='/reset'>password</Link>?
                    </div>
                    <div className='link-to-registration'>
                        Don`t have an account?&nbsp;<Link to='/register'>Create</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}