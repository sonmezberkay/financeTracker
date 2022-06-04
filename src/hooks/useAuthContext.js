import { AuthContext } from "../context/AuthContext";
import { useContext } from 'react';


export const useAuthContext = () => {
    const authCtx = useContext(AuthContext);

    if (!authCtx) {
        throw Error ('useAuthContext must be inside an AuthContextProvider')
    }

    return authCtx;
};