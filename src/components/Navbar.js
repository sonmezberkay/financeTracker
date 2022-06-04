import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

    const { logout } = useLogout();

    const { user } = useAuthContext();          // we could use useContext but we already did it in useAuthContext hook

    // display is a default property name inside of the 'user'

    return (
        <nav className={classes.navbar}>
            <ul>
                <li className={classes.title}>Finance Tracker</li>
                {!user && <li><Link to='/login'>Login</Link> </li>}
                {!user && <li><Link to='/signup'>Signup</Link> </li>}
                
                {user && <li className={classes.username}>Hello, {user.displayName}</li>}
                {user && <li><button className='btn' onClick={logout}>Logout</button></li>}
                
            </ul>
        </nav>
    )
};

export default Navbar;