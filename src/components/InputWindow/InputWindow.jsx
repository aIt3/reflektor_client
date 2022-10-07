import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";


import axios from "axios";
import './InputWindow.css'


function InputWindow({getPastQuestions}){

    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState('')
    const [button, setButton] = useState(false)
    const { user } = useContext(AuthContext);
    const storedToken = localStorage.getItem('authToken')
    let questionId
    let questionOfTheDay
    let questionType
    let questionDate

    console.log()

    

    if(question){
        questionId = question[0]._id
        questionOfTheDay = question[0].question
        questionType = question[0].questionType
        questionDate = question[0].date

        console.log(question)
    }

    


    const navigate = useNavigate();


    const handleAnswer = (e) => setAnswer(e.target.value);

    // PROCESS THE ANSWER
    const handlePost = e => {
        e.preventDefault();

        if(button === false){
            setButton(true)
            getPastQuestions()
            
        const requestBody = { answer, questionId}
        axios.post(`${process.env.REACT_APP_API_URL}/api/answers`, requestBody,
        {headers: {Authorization: `Bearer ${storedToken}`}}
        )
          .then((response) => {

          })
          .catch((error) => {
            const errorDescription = error.response.data.message;
            // setErrorMessage(errorDescription);
          })
    }else{
        console.log('der button ist grün')
    }
}
    
    // GET THE QUESTION OF THE DAY
    const getTodaysQuestion = () => { 
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/questions/today`)
          .then((response) => 
                setQuestion(response.data))
          .catch((error) => console.log(error));
    
      };
      useEffect(() => { 
        getTodaysQuestion();
      }, [] );

    return(
        <div className='wrapper'>
            <div className='inputQuestion'>
                <span className="marker">
                    <h3>{questionDate}</h3>
                <h1>{questionOfTheDay}</h1>
                </span>
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
                    {(!user &&
                    <div className="pleaseLogin">
                        <p>Please Login to post</p>
                        <button className="postButton" type="submit" disabled>Post</button>
                        </div>
                        )}
                    {(user &&
                    <div>
                        <button className={"postButton " + (button && 'done')} type="submit">
                        {(!button &&
                        <svg className="postIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>
                        )}
                        {(button &&
                        <svg className="postIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z" /></svg>
                        )}
                            Post
                        </button>
                        </div>
                        )}
                </div>
            </form>


        </div>
    )
}

export default InputWindow