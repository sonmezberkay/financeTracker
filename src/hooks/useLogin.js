import { useState, useEffect } from 'react';
import { projectAuth } from "../firebase/config";
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false);  // for cleaning up, when we change the page before the component completes its func

    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    
    const { dispatch } = useAuthContext();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        // sign the user out
        try {
            const response = await projectAuth.signInWithEmailAndPassword(email, password);

            // dispatch logout action
            dispatch({ type: 'LOGIN', payload: response.user }) // here we need a payload and that is the user credentials being passed to reducer

            if (!isCancelled) {                 // before updating the logout status, it checks if we cancel the function (change the page)
                setIsPending(false);
                setError(null);
            }

        } catch (err) {
            if (!isCancelled) {
                console.log(err.message);
                setError(err.message);
                setIsPending(false);
            }
        }
    };

    useEffect(() => {           // we just return a clean up function in useEffect because this is what we need here
        return  () => setIsCancelled(true);
    }, [])

    return { login, error, isPending }
};