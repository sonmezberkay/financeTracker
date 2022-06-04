import classes from './Signup.module.css';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';



const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { signup, isPending, error } = useSignup();


    const submitHandler = (event) => {
        event.preventDefault();

        signup(email, password, username);          // signup function comes from object destructuring from upper line from inside of useSignup
    };


    return (
        <form className={classes['signup-form']} onSubmit={submitHandler}>
            <h2>Signup</h2>
            <label>
                <span>username</span>
                <input onChange={e => setUsername(e.target.value)} type='text' value={username} />
            </label>
            <label>
                <span>email</span>
                <input onChange={e => setEmail(e.target.value)} type='email' value={email} />
            </label>
            <label>
                <span>password</span>
                <input onChange={e => setPassword(e.target.value)} type='password' value={password} />
            </label>
            {!isPending && <button className='btn'>signup</button>}
            {isPending && <button className='btn' disabled>Loading...</button>}
            {error && <p>{error}</p>}
        </form>
    )
};

export default Signup;