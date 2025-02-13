import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Entry = () => {
  const [loading, setLoading] = useState(true); // Loading state to prevent rendering while checking IP
  const navigate = useNavigate();

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // Fetching user's IP address
        const response = await fetch("https://api64.ipify.org?format=json");
        const data = await response.json();
        const userIP = data.ip;
        const storedIP = sessionStorage.getItem("mocktest_ip");
        console.log("Stored IP:",storedIP)
        console.log("User IP:",userIP)
        sessionStorage.setItem("mocktest_ip", userIP);

        if (storedIP === userIP) {
          navigate("/mocktest");
        }
        if(storedIP===null){
          navigate("/questionnaire");
        }
      } catch (error) {
        console.error("Failed to fetch IP:", error);
      } finally {
        setLoading(false); // Set loading to false once the check is complete
      }
    };

    checkAccess();
  }, [navigate]);

  if (loading) {
    // Prevent rendering any content while loading
    return null;
  }

  return null; // No need to return anything here, navigation will handle the redirection
};

export default Entry;
