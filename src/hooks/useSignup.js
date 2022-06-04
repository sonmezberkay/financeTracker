import { useState, useEffect } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);  // for cleaning up, when we change the page before the component completes its func

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const { dispatch } = useAuthContext();


    const signup = async (email, password, username) => {
        setError(null);
        setIsPending(true);

        try {
            //signup user
            const response = await projectAuth.createUserWithEmailAndPassword(email, password);
            if (!response) {
                throw new Error('Could not complete signup')
            }
            
            //add displayname to user
            await response.user.updateProfile({ displayName: username });

            //console.log(response.user);
            dispatch({ type: 'LOGIN', payload: response.user })     // we pass the user information to the authContext via useAuthCOntext hook

            if (!isCancelled) {                      // before updating the logout status, it checks if we cancel the function (change the page)
                setIsPending(false);
                setError(null);
            }

        } catch (err) {
            console.log(err.message);
            setError(err.message);
            setIsPending(false);
        }
    };

    useEffect(() => {           // we just return a clean up function in useEffect because this is what we need here
        return  () => setIsCancelled(true);
    }, [])

    return { error, isPending, signup }
    
};