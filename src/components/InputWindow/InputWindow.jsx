import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './InputWindow.css'

const API_URL = "http://localhost:5005";

function InputWindow(){
    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    console.log(question)
    const storedToken = localStorage.getItem('authToken')

    const navigate = useNavigate();


    const handleAnswer = (e) => setAnswer(e.target.value);

    // PROCESS THE ANSWER
    const handlePost = e => {
        e.preventDefault();

        const requestBody = { answer };
     
        axios.post(`${API_URL}/api/answers`, requestBody,
        {headers: {Authorization: `Bearer ${storedToken}`}}
        )
          .then((response) => {
            navigate('/');
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            // setErrorMessage(errorDescription);
          })
    }
    
    // GET THE QUESTION OF THE DAY
    const getTodaysQuestion = () => { 
        axios
          .get(`${API_URL }/api/questions/today`)
          .then((response) => setQuestion(response.data))
          .catch((error) => console.log(error));
      };
      useEffect(() => { 
        getTodaysQuestion();
      }, [] );

    return(
        <div className='wrapper'>
            <div className='question'>
                <h1>{question[0].question}</h1>
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