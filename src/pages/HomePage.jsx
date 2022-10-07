import logo from "../logo.svg";
import Navbar from "../components/Navbar/Navbar";
import SignIn_Window from "../components/SignIn_Window/SignIn_Window";
import InputWindow from "../components/InputWindow/InputWindow";
import Timeline from "../components/Timeline/Timeline";
import { useState } from "react";
import { useEffect } from "react";
import "../App.css";
import axios from "axios";


function HomePage() {
  const [questions, setQuestions] = useState([])

  const getPastQuestions = () => { 
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/questions/pastdays`)
      .then((response) => setQuestions(response.data))
      .catch((error) => console.log(error));
  };
  useEffect(() => { 
    getPastQuestions();
  }, [questions] );

  return (
    <div>
      <Navbar />
      <div className="backgroundImage">
      <InputWindow getPastQuestions = {getPastQuestions} />
      </div>
      <Timeline getPastQuestions = {getPastQuestions} questions={questions}/>
    </div>

    
    
  );
}

export default HomePage;
