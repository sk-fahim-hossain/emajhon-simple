import React, { useContext, useState } from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProviders';

const SignUp = () => {
    const [error,setError] = useState('')
    const {createUser} = useContext(AuthContext)

    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        setError('')
        if(password.length < 6){
            setError('Password Must be at least 6 characters long')
            return
        }
        else if(password !== confirm){
            setError('Your password did not matched')
            return
        }

        createUser(email,password)
        .then(result => console.log(result.user))
        .catch(error => {
            setError(error.result)
            console.log(error.message)
        })
        console.log('click')
        form.reset()
    }


    return (
        <div className='form-container'>
            <form onSubmit={handleSignUp}>
                <h2 className='form-title'>Sign Up</h2>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Confirm Password</label>
                    <input type="password" name="confirm" id="" required />
                </div>
                <input type="submit" className="btn-submit" value="Sign Up" />
            </form>
            <p><small>Already have an account? <Link to="/login">Login</Link></small></p> 
            {error && <p className='error-notify'>{error}</p>}
        </div>
    );
};

export default SignUp;