import Navbar from "../components/elements/navbar";
import Profile from "./dashboard";
import LoginPage from "./Login";
import { useEffect } from "react";

const Home=()=>{

  useEffect(() => {
      // Check if script already exists
      if (!document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
        const script = document.createElement("script");
        script.src = "https://elevenlabs.io/convai-widget/index.js";
        script.async = true;
        script.type = "text/javascript";
        document.body.appendChild(script);
      }
    }, []);

    return(
      <>
       <Profile/>
      <elevenlabs-convai agent-id="umdCXLg9IZq6ZvJMP8N1"></elevenlabs-convai>

      </>

    )



}

export default Home;