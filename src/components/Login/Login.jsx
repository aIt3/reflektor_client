import { useState, useContext } from "react"; // <== IMPORT useContext
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../../context/auth.context";  

 

function Login () {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken } = useContext(AuthContext); 
  
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };
        
        axios.post(`${process.env.REACT_APP_API_URL}/auth/Login`, requestBody)
          .then((response) => {

            storeToken(response.data.authToken);  
            navigate('/');                              
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
          })
      };

    return(
            <div className="windowWrapper">
                <div className="window">
                    <div className="content">
                        <div className='text'>
                            <h2>Lorem ipsum dolor sit amet, consetetur sadipscing </h2>
                            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
                        </div>
                        <form onSubmit={handleLoginSubmit}>
                            <label>Your E-Mail</label>
                            <input  
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleEmail} 
                                placeholder="reflecting@mylife.com" 
                                />
    
                            <label>Your Password</label>
                            <input 
                                type="text"
                                name="password"
                                value={password}
                                onChange={handlePassword}
                                placeholder="*******"
                            />
                            <button type="submit" >Login</button>
                        </form>  
                        { errorMessage && <p className="error-message">{errorMessage}</p> }  
                        </div>
                </div>
            </div>
        )
    }

export default Login