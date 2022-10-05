import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnswerText from "../AnswerText/AnswerText";

import Answer from "../Answer/Answer";
import axios from "axios";
import './PastView.css'

const API_URL = "http://localhost:5005";

function PastView (){
    const [questions, setQuestions] = useState([])

    const navigate = useNavigate()


    const getPastQuestions = () => { 
        axios
          .get(`${API_URL }/api/questions/pastdays`)
          .then((response) => setQuestions(response.data))
          .catch((error) => console.log(error));
      };
      useEffect(() => { 
        getPastQuestions();
      }, [] );

      const deletePost = (key) => {
        axios  
         .delete(`${API_URL }/api/answers/delete/${key}`)
         .then((response) => {
            navigate('/')
         })
      }

    return(
        <div className="pastViewWrapper">
          {questions.map((past => {
            return(
              <div>
                <h3 className="date">{past.date}</h3>
              <h1 className="pastQuestion"key={past._id}>{past.question}</h1>
              <div className="monthWrapper">
                {past.answersByUsers.map((answer => {
                  return(
                    <div>
                        <div className="editDelete">
                            <Link to={`/answers/edit/${answer._id}`}>
                                <button>Edit</button>
                            </Link>
                                <button onClick={() => deletePost(answer._id)}>Delete</button>
                        </div>
                <div className="answerWrapper">
                {past.questionType === 'link' && 
                <Answer key = {past.id} className="answerbox" answer = {answer.answer}/>
                }
                {past.questionType === 'text' && 
                <AnswerText answer={answer.answer}/>
                
                }

            
                </div>
                <div className="username">
                <Link to={`/Profile/${answer.postedByUser}`}>
                    {answer.postedByUser && <p className="postedBy">posted by {answer.postedByUser}</p>}
                </Link>
            </div>
            </div>
                )
              }))}             
              </div>
              </div>


              )
            }))}             
        </div>

    )
}

export default PastView