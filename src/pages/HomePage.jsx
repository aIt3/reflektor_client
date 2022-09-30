import logo from "../logo.svg";
import Navbar from "../components/Navbar/Navbar";
import SignIn_Window from "../components/SignIn_Window/SignIn_Window";
import InputWindow from "../components/InputWindow/InputWindow";
import Timeline from "../components/Timeline/Timeline";
import "../App.css";

function HomePage() {
  return (
    <div>
      <Navbar />
      <div className="backgroundImage">
      <InputWindow />
      </div>
      <Timeline />
    </div>

    
    
  );
}

export default HomePage;
