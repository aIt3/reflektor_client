import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './InputWindow.css'

const API_URL = "http://localhost:5005";

function InputWindow(){
    const [answer, setAnswer] = useState('')

    const navigate = useNavigate();


    const handleAnswer = (e) => setAnswer(e.target.value);

    const handlePost = e => {
        e.preventDefault();

        const requestBody = { answer };
     
        // Make an axios request to the API
        // If POST request is successful redirect to login page
        // If the request resolves with an error, set the error message in the state
        axios.post(`${API_URL}/api/answers`, requestBody)
          .then((response) => {
            navigate('/');
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            // setErrorMessage(errorDescription);
          })


    }
    return(
        <div className='wrapper'>
            <div className='question'>
                <h1>Welches Lied erinnert dich an deinen Vater?</h1>
            </div>
            <form onSubmit={handlePost}>
                <textarea  
                    type="text"
                    name="answer"
                    value={answer}
                    onChange={handleAnswer} 
                    placeholder="Drop some lines ... " 
                ></textarea>
                <div className='buttonWrapper'>
                    <button type="submit" >Post</button>
                </div>
            </form>


        </div>
    )
}

export default InputWindow