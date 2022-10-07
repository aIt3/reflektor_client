import './SignIn_window.css'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
 

function SignIn_Window(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')

    const navigate = useNavigate();
  
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleUsername = (e) => setUsername(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        // Create an object representing the request body
        const requestBody = { email, password, username };
     
        // Make an axios request to the API
        // If POST request is successful redirect to login page
        // If the request resolves with an error, set the error message in the state
        axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
          .then((response) => {
            navigate('/login');
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            // setErrorMessage(errorDescription);
          })
      };

    return(
        <div className="windowWrapper">
            <div className="window">
                <div className="content">
                    <div className='text'>
                        <h2 className='heading'>Lorem ipsum dolor sit amet, consetetur sadipscing </h2>
                        <p className='explanation'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. </p>
                    </div>
                    <form onSubmit={handleSignupSubmit}>
                        <label>Your E-Mail</label>
                        <input  
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleEmail} 
                            placeholder="reflecting@mylife.com" 
                            />
                            
                        <label>Your Name</label>
                        <input   
                            type="name"
                            name="username"
                            value={username}
                            onChange={handleUsername}
                            placeholder="LaoTze" 
                        />

                        <label>Your Password</label>
                        <input 
                            type="text"
                            name="password"
                            value={password}
                            onChange={handlePassword}
                            placeholder="*******"
                        />

                        <button className="postButton" type="submit" >Sign Up</button>

                    </form>    
                    </div>
            </div>
        </div>
    )
}
export default SignIn_Window