import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Login = () => {

    const [login, setLogin] = useState({
        credentials: {
            username: '',
            password: ''
        }
    })

    const handleChanges = (e) => {
        setLogin({
            credentials: {
                ...credentials,
                [e.target.name]: e.target.value
            }
        })
    }

    const login = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/api/login", login.credentials)
            .then((res) => {
                console.log('login res: ', res)
                //window.localStorage.setItem('token', res.data.payload);
                //
            })
    }

}