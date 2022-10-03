import { useState, useEffect } from "react";
import axios from "axios";
import Answer from "../Answer/Answer";

import './DayView.css'

const API_URL = "http://localhost:5005";

function DayView(){
    const [answers, setAnswers] = useState([])

    const getAllAnswers = () => { //4.Fetch all projects and update state variable
        axios
          .get(`${API_URL }/api/allAnswersByUser`)
          .then((response) => setAnswers(response.data))
          .catch((error) => console.log(error));
      };

    useEffect(() => { // 3. useEffect will execute getAllProjects()
        getAllAnswers();
      }, [] );

    if(answers.length === 0){ // 2. Display this while we wait for the data from the API to load
        return <p>Loading...</p>
      }

    return(
        <div className="dayViewWrapper">
            {answers.map((answer => {
                return(
                    // <Answer key={answer.id} answer={answer.answer} explanation={answer.explanation} username={answer.username} />
                    <Answer className="answerbox" answer = {answer.answer}/>
                )
            }))}

        </div>
    )
}

export default DayView