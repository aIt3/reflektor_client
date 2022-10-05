import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './InputWindow.css'


function InputWindow(){

    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const storedToken = localStorage.getItem('authToken')
    let questionId
    let questionOfTheDay
    let questionType
    

    if(question!== ''){
        questionId = question[0]._id
        questionOfTheDay = question[0].question
        questionType = question[0].questionType
    }

    console.log(question)
    


    const navigate = useNavigate();


    const handleAnswer = (e) => setAnswer(e.target.value);

    // PROCESS THE ANSWER
    const handlePost = e => {
        e.preventDefault();

        const requestBody = { answer, questionId}
     console.log(requestBody)
        axios.post(`${process.env.REACT_APP_API_URL}/api/answers`, requestBody,
        {headers: {Authorization: `Bearer ${storedToken}`}}
        )
          .then((response) => {
            console.log(response)
            setAnswer('')
            getTodaysQuestion()
          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            // setErrorMessage(errorDescription);
          })
    }
    
    // GET THE QUESTION OF THE DAY
    const getTodaysQuestion = () => { 
        axios({
            method: "get",
            url: process.env.REACT_APP_API_URL + "api/questions/today",
        })
          //.get(`${process.env.REACT_APP_API_URL}/api/questions/today`)
          .then((response) => setQuestion(response.data))
          .catch((error) => console.log(error));
      };
      useEffect(() => { 
        getTodaysQuestion();
      }, [] );

    return(
        <div className='wrapper'>
            <div className='inputQuestion'>
                <h1>{questionOfTheDay}</h1>
            </div>
            <form className="answerForm" onSubmit={handlePost}>
            {questionType === 'text' && (
                <textarea  
                    type="text"
                    name="answer"
                    value={answer}
                    onChange={handleAnswer} 
                    placeholder="Drop a text ... " 
                ></textarea>
                )}
                {questionType === 'link' && (
                <textarea  
                    type="text"
                    name="answer"
                    value={answer}
                    onChange={handleAnswer} 
                    placeholder="Drop a link ... " 
                ></textarea>
                )}

                <div className='buttonWrapper'>
                    <button className="postButton" type="submit" >Post</button>
                </div>
            </form>


        </div>
    )
}

export default InputWindow