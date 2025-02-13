import React, {useEffect} from 'react'
import MockTestInstructions from './MockTestInstructions'
const MockTest = () => {
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
  return (
    <div>
        <MockTestInstructions/>
        <elevenlabs-convai agent-id="umdCXLg9IZq6ZvJMP8N1"></elevenlabs-convai>

    </div>
  )
}

export default MockTest