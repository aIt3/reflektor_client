import { useState, useEffect } from "react";
import { useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AnswerText from "../AnswerText/AnswerText";
import { AuthContext } from "../../context/auth.context";
import Answer from "../Answer/Answer";
import axios from "axios";
import './PastView.css'


function PastView (){
    const [questions, setQuestions] = useState([])
    const { user } = useContext(AuthContext);

    const navigate = useNavigate()



    const getPastQuestions = () => { 
        axios
          .get(`${process.env.REACT_APP_API_URL}/api/questions/pastdays`)
          .then((response) => setQuestions(response.data))
          .catch((error) => console.log(error));
      };
      useEffect(() => { 
        getPastQuestions();
      }, [] );

      const deletePost = (key) => {
        axios  
         .delete(`${process.env.REACT_APP_API_URL}/api/answers/delete/${key}`)
         .then((response) => {
            navigate('/')
         })
      }
    return(
      <div className="pastViewBg">
        <div className="pastViewWrapper">
          {questions.map((past => {
            return(
              <div className="oneDay">
                <h3 className="date">{past.date}</h3>
              <h1 className="pastQuestion"key={past._id}>{past.question}</h1>
              <div className="monthWrapper">
                {past.answersByUsers.map((answer => {
                  return(
                    <div>
                        <div className="editDelete">
                            {/* <Link to={`/answers/edit/${answer._id}`}>
                                <button>Edit</button>
                            </Link> */}
                            {user && (
                              <div>
                            {answer.postedByUser._id === user._id && (
                              <div>
                                 <button className="deleteButton" onClick={() => deletePost(answer._id)}>Delete</button>
                                 </div>
                                 )}
                                  </div>
                                 )}
                        </div>
                <div className="answerWrapper">
                {past.questionType === 'link' && 
                <Answer key = {past._id} className="answerbox" answer = {answer.answer}/>
                }
                {past.questionType === 'text' && 
                <AnswerText answer={answer.answer}/>
                
                }

            
                </div>
                <div>
                    {answer.postedByUser && 
                    <div className="username">
                    <p className="postedBy">posted by </p>
                    <Link className="postedByUsername"to={`/Profile/${answer.postedByUser._id}`}>
                    {answer.postedByUser.username}
                    </Link>

                    </div>
                    }
            </div>
            </div>
                )
              }))}             
              </div>
              </div>


              )
            }))}             
        </div>
        </div>

    )
}

export default PastView