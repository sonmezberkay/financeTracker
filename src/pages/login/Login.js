import { useState } from 'react';
import classes from './Login.module.css';

import { useLogin } from '../../hooks/useLogin';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, isPending } = useLogin();

    const submitHandler = (event) => {
        event.preventDefault();

        login(email, password);
    }

    return (
        <form className={classes['login-form']} onSubmit={submitHandler}>
            <h2>Login</h2>
            <label>
                <span>email:</span>
                <input type='email' onChange={e => setEmail(e.target.value)} />
            </label>
            <label>
                <span>password:</span>
                <input type='password' onChange={e => setPassword(e.target.value)} />
            </label>
            {!isPending && <button className='btn'>Login</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}
            {error && <p>{error}</p>}
        </form>
    )
};

export default Login;