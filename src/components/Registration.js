import React, { useState, useContext } from "react"
import { useHistory } from "react-router"
import axios from "axios"

export const Register = () => {
    const [form, setForm] = useState({
        username : '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
    })

    const history = useHistory()

    const changeInputHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const submitRegistration = async () =>{
        const body = {
            username: form.username,
            email: form.email,
            first_name: form.firstName,
            last_name: form.lastName,
            password: form.password,
        }
        const createdUser = await axios.post(`http://127.0.0.1:8000/api/v1/users/register/`, body)
        if (createdUser) {
            history.push('/login')
        }
    }

    return (
        <form>
            <h3>Register</h3>

            <div className="form-group">
                <label>Username</label>
                <input name='username' className="form-control" value={form.username} onChange={(e) => changeInputHandler(e)} placeholder="Enter username" />
            </div>

            <div className="form-group">
                <label>E-mail</label>
                <input name='email' className="form-control" value={form.email} onChange={(e) => changeInputHandler(e)} placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>First name</label>
                <input name='firstName' className="form-control" value={form.firstName} onChange={(e) => changeInputHandler(e)} placeholder="Enter first name" />
            </div>

            <div className="form-group">
                <label>Last name</label>
                <input name='lastName' className="form-control" value={form.lastName} onChange={(e) => changeInputHandler(e)} placeholder="Enter last name" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input name='password' type="password" className="form-control" value={form.password}  onChange={(e) => changeInputHandler(e)} placeholder="Enter password" />
            </div>

            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                </div>
            </div>

            <button type="button" className="btn btn-primary btn-block" onClick={submitRegistration}>Submit</button>
            <p className="forgot-password text-right">
                Forgot <a href="#">password?</a>
            </p>
        </form>
    )
}