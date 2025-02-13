import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import chevron from "../../assets/chevron.svg";
import LoadingSpinner from "../../components/elements/LoadingAni";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const DebateTopic = () => {
  const [subID, setSubID] = useState([]); 
  const location = useLocation();
  const selectedTags = location.state?.selectedTopics || [];
  const selectedSubject = location.state?.selectedSubject || [];
  const navigate = useNavigate();

  const topic = selectedTags.map((tag) => tag.topic);
  const combinedArray = [...topic, selectedSubject];
  console.log(combinedArray);

  console.log(selectedSubject);

  const handleBack = () => {
    navigate("/townhall/subject");
  };

  const handleStart = async () => {
    const debateData = {
      debate_code: uuidv4(),
      subjects: selectedSubject,
      topics: selectedTags, 
      sub_topics: [],
    };

    console.log("Subjects:", selectedSubject);
    console.log("Debate Data", debateData);

    try {
      // Create Debate API
      const response = await axios.post(
        "/debate/createDebate/",
        debateData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTczMjU0ODE1MiwiZXhwIjoxNzMzNTQ4MTUyfQ.5P2Vg3S1UiPIBgCapCLzJAT5qWu_gNvviMjznz9RyHE",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Debate Created Successfully:", response.data);
      const debate_id = response.data.data.debate_id;

      // Create Debate User API
      const debateUserResponse = await axios.post(
        "/debate/createDebateUser",
        {
          debate_id: debate_id,
          user_id: "3",
        },
        {
          headers: {
            Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTczMjU0ODE1MiwiZXhwIjoxNzMzNTQ4MTUyfQ.5P2Vg3S1UiPIBgCapCLzJAT5qWu_gNvviMjznz9RyHE",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Debate User Created Successfully:", debateUserResponse.data);
      const debate_user_id = debateUserResponse.data.data.debate_user_id;

      navigate(`/townhall/${debate_id}`, {
        state: {
          selectedTopics: selectedTags,
          debate_user_id: debate_user_id,
        },
      });
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container mx-auto w-1/2 rounded-lg my-14 px-10 py-10 border border-grey-300">
      <div className="flex justify-between items-center">
        <button
          className="flex items-center bg-white rounded-lg px-4 py-2 my-4 text-black font-semibold"
          onClick={handleBack}
        >
          <img src={chevron} alt="chevron icon" className="h-4 w-4 mr-2" />
          Back
        </button>
        <div className="text-base border-2 border-grey-outline px-2 py-1 rounded-full">
          5 Questions
        </div>
      </div>

      <div className="text-lg font-semibold text-gray-800 mb-2">
        You can answer all 5 questions regarding the following topics
      </div>
      <p className="text-grey mb-4">These topics covered:</p>

      <div className="container flex flex-wrap space-x-2">
        {combinedArray.length === 0 ? (
          <LoadingSpinner />
        ) : (
          combinedArray.map((selections, index) => (
            <div
              key={index}
              className="m-1 font-xl py-3 px-2.5 rounded-full cursor-pointer flex justify-center items-center border border-grey-outline"
            >
              <span className="text-xs font-normal leading-none">
                {selections}
              </span>
            </div>
          ))
        )}
      </div>

      <div className="flex my-5">
        <span className="text-base border-2 border-grey-outline px-2 py-1 rounded-full">
          Time for each question:{" "}
          <span className="text-purple">01m 25 sec</span>
        </span>
      </div>

      <div className="flex justify-end">
        <button
          className="bg-purple text-white px-4 py-2 rounded-lg"
          onClick={handleStart}
        >
          Let's Start
        </button>
      </div>
    </div>
  );
};

export default DebateTopic;
