import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import axios from "axios";
import Answer from "../Answer/Answer";

import './DayView.css'

const API_URL = "http://localhost:5005";

function DayView(){
    const [answers, setAnswers] = useState([])

    const { answerId } = useParams(); // 2. Getting the projectId
    const navigate = useNavigate()

    const getAllAnswers = () => { 
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/allAnswersByUser`)
          .then((response) => setAnswers(response.data))
          .catch((error) => console.log(error));
      };

    useEffect(() => { 
        getAllAnswers();
      }, [] );

    if(answers.length === 0){ // 2. Display this while we wait for the data from the API to load
        return <p>Loading...</p>
      }

      const deletePost = (key) => {
        axios  
         .delete(`${process.env.REACT_APP_API_URL}/api/answers/delete/${key}`)
         .then((response) => {
            navigate('/')
         })
      }

    return(
        <div className="dayViewWrapper">
            {answers.map((answer => {
                return(
                    // <Answer key={answer.id} answer={answer.answer} explanation={answer.explanation} username={answer.username} />
                    <div>
                        <div className="editDelete">
                            <Link to={`/answers/edit/${answer._id}`}>
                                <button>Edit</button>
                            </Link>
                                <button onClick={() => deletePost(answer._id)}>Delete</button>
                        </div>
                    <Answer key = {answer.id} className="answerbox" answer = {answer.answer}/>
                    <div className="username">
                        <Link>
                            {answer.postedByUser?.username && <p className="postedBy">posted by {answer.postedByUser.username}</p>}
                        </Link>
                    </div>
                    </div>
                )
            }))}

        </div>
    )
}

export default DayView