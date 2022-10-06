import axios from "axios";
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Answer from "../components/Answer/Answer";
import Navbar from "../components/Navbar/Navbar";


function Profile(){

    const [profile, setProfile] = useState(null); 
    const { profileId } = useParams();
    

    const getUser = () => {
        axios
            .get(`${process.env.REACT_APP_API_URL}/api/profile/${profileId}`)
            .then((response) => {
                const oneUser = response.data;
                setProfile(oneUser);
              })
              .catch((error) => console.log(error));
          };
        
          useEffect(() => { // 4. useEffect will execute once and fetch specific project
            getUser();
            // eslint-disable-next-line
          },[])

    return(
        <div>
             <Navbar />
            <div className="backgroundImage">
                {profile && (
                <div className="userProfile">
                    <div className="userName">
                        {profile.username}
                    </div>
                        <div className="monthWrapper center">
                            {profile.answersByUsers.map((answer => {
                                return(
                                    <Answer key = {answer._id} className="answerbox" answer = {answer.answer}/>
                                )
                            }))}
                        </div>  
            </div>
            )}
            </div>
        </div>
    )
}
export default Profile