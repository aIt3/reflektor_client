import './Navbar.css'
import { Link } from "react-router-dom";
import { useContext } from "react";                    
import { AuthContext } from "./../../context/auth.context";  

function Navbar(){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);   // <== ADD

    return(
       <header>
        <div className='navWrapper'>
        <nav className='navLinks'>
        <div className='centered'>
            <Link to="/">
                    <div className="logo">
                    <svg width="auto" height="18" viewBox="0 0 44 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M35.6855 0.905762V71.0476" stroke="#0C0C0C" strokeWidth="16"/>
                        <path d="M0.614563 35.9768L35.9267 35.9768" stroke="#0C0C0C" strokeWidth="16"/>
                        <path d="M10.8865 11.178L36.201 36.4924" stroke="#0C0C0C" strokeWidth="16"/>
                        <path d="M36.7166 34.9456L10.8866 60.7758" stroke="#0C0C0C" strokeWidth="16"/>
                    </svg>
                    <h1 id="appLogo">Reflektor</h1>
                    </div>
                </Link>
            </div>
            <div className='right'>
            <ul>
            {isLoggedIn && (
                <>
                <Link to={`/Profile/${user._id}`}> {user.username} </Link>
                <button onClick={logOutUser} >Logout</button>
                </>
            )}
            {!isLoggedIn && (
                <>
                <Link to="/Register">Register</Link>
                <Link to="/Login"> Login</Link>
                </>
                )}
            </ul>
            </div>
        </nav>
        </div>
       </header>

    )
}
export default Navbar