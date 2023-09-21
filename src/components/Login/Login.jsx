import React, { useContext, useState } from 'react';
import './Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const { signIn } = useContext(AuthContext)
    const [error, setError] = useState('')
    const [show, setShow] = useState(true)
    
    const from = location?.state?.from?.pathname || '/';

    const handleLogin = (event) => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        setError('')

        if (password.length < 6) {
            setError('Password Can not be less than 6 characters')
            return
        }

        signIn(email, password)
            .then(result => {
                form.reset()
                console.log(result.user)
                navigate(from,{replace:true})
            })
            .catch(error => {
                setError(error.message)
                console.log(error.message)
            })

        console.log('click')
        form.reset()
    }


    return (
        <div className='form-container'>
            <form onSubmit={handleLogin}>
                <h2 className='form-title'>Login</h2>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name="password" id="" required />
                    <p style={{cursor:'pointer'}} onClick={()=> setShow(!show)}><small>{show ? "Hide Password" : "Show Password"}</small></p>
                </div>
                <input type="submit" className="btn-submit" value="Login" />
            </form>
            <p ><small>New To Ema-jhon? <Link to="/signup">Create New Account</Link></small></p>
            {error && <p className='error-notify'>{error}</p>}
        </div>
    );
};

export default Login;