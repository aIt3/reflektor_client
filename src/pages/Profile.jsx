import axios from "axios";
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import Answer from "../components/Answer/Answer";


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
        <div>
            {profile && (
            <p>{profile.username}</p>
            )}  
        </div>
        <div>
        {profile.answersByUsers && (
            <Answer key = {profile.id} className="answerbox" answer = {profile}/>
            )} 
        </div>
        </div>
    )
}
export default Profile