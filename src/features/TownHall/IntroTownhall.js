import React , {useEffect} from "react";

import { useNavigate } from "react-router-dom";
import firstguru from "../../assets/firstguru.svg";
import person from "../../assets/personspeaking.svg";

const IntroToTownhall = () => {
  const navigate = useNavigate();

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
  

  const handleClick = () => {
    navigate("/townhall/subject");
  };

  return (
    <div className="bg-white rounded-lg max-w-2xl mx-auto my-12 border border-grey-300">
      <div className="flex-1 p-6">
        <div className="text-lg font-semibold text-gray-800 mb-2">
          Talk Through Your UPSC Topics with Confidence
        </div>
        <p className="text-grey mb-4">
          Practice key topics with AI, get instant feedback, and build your
          confidence for the big exam day.
        </p>
        <button
          className="flex items-center bg-purple text-white text-base p-2 rounded text-sm"
          onClick={handleClick}
        >
          {/*<span className="ml-2">
            <img src={firstguru} alt="right arrow"/>
        </span>*/}
          Start Speaking
        </button>
      </div>

      <div className="flex flex-row justify-end">
        <img src={person} alt="Placeholder" className="object-left-bottom" />
      </div>
      <elevenlabs-convai agent-id="umdCXLg9IZq6ZvJMP8N1"></elevenlabs-convai>
      
    </div>
  );
};

export default IntroToTownhall;
