import './Navbar.css'
import { Link } from "react-router-dom";
import { useContext } from "react";                    
import { AuthContext } from "./../../context/auth.context";  

function Navbar(){
    const { isLoggedIn, user } = useContext(AuthContext);   // <== ADD

    return(
       <header>
            <Link to="/">
                <h1 id="appLogo">Reflektor</h1>
            </Link>
        <nav>
            <ul>
            {isLoggedIn && (
                <>
                <Link to="/Profile"> Profile </Link>
                <button>Logout</button>
                </>
            )}
            {!isLoggedIn && (
                <>
                <Link to="/Register">Register</Link>
                <Link to="/Login"> Login</Link>
                </>
                )}
            </ul>
        </nav>
       </header>

    )
}
export default Navbar