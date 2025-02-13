import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import chevron from "../../assets/chevron.svg";
import axios from "axios";
import LoadingSpinner from "../elements/LoadingAni";

const SelectTopic = () => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const selectedSubject = location.state?.selectedSubject || [];
  console.log("Selected subject:", selectedSubject);

  const subId = selectedSubject.length > 0 ? selectedSubject[0]?.id : null;
  const subject = selectedSubject.length > 0 ? selectedSubject[0]?.topic : null;

  useEffect(() => {
    const fetchTopics = async () => {
      if (!subId) {
        setError("Subject ID is missing.");
        return;
      }

      const subjectData = { subject_id: subId };

      try {
        const response = await axios.post(
          "/debate/getTopics/",
          subjectData,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI4NjQwMTExLCJleHAiOjE3Mjk2NDAxMTF9._mjnpoMsUE_E04dolOY7V7Vpu2NKnWAoaFOgYSIDC-k",
              "Content-Type": "application/json",
            },
          }
        );

        if (response.data && Array.isArray(response.data.data.topics)) {
          setTags(response.data.data.topics);
        } else {
          setError("No topics found.");
        }
      } catch (error) {
        console.error(
          "Error fetching topics:",
          error.response?.data || error.message
        );
        setError("Failed to load topics. Please try again later.");
      }
    };

    fetchTopics();
  }, [subId]);

  const handleClick = (tag) => {
    // Toggle single tag in and out of selectedTags array
    if (selectedTags.length > 0 && selectedTags[0]._id === tag._id) {
      setSelectedTags([]); // Clear the selection if it's already selected
    } else {
      setSelectedTags([tag]); // Only one tag at a time
    }
  };

  const handleBackClick = () => {
    navigate("/townhall");
  };

  const handleNextClick = () => {
    // Pass single selected tag (in array) to the next route
    navigate("/townhall/topic/debateTopic", {
      state: { selectedSubject: subject, selectedTopics: selectedTags },
    });
  };

  const getTagClass = (tag) => {
    return selectedTags.length > 0 && selectedTags[0]._id === tag._id
      ? "bg-teal-300 text-white border-teal-300"
      : "bg-white text-black border-grey";
  };

  return (
    <div className="container mx-auto w-1/2 rounded-lg my-14 px-10 py-10 border border-grey-300">
      <button
        className="flex items-center bg-white rounded-lg px-4 py-2 my-4 text-black font-semibold"
        onClick={handleBackClick}
      >
        <img src={chevron} alt="chevron icon" className="h-4 w-4 mr-2" />
        Back
      </button>
      <div className="text-lg font-semibold text-gray-800 mb-2">
        Select a topic you want to discuss
      </div>
      <p className="text-grey mb-4">
        Pick a topic you’d like to discuss, and we’ll get started with your
        personalized session.
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
      {/* Display error message if any */}
      <div className="container flex flex-wrap space-x-2">
        {tags.length === 0 ? (
          <LoadingSpinner />
        ) : (
          tags.map((tag) => (
            <div
              key={tag._id}
              onClick={() => handleClick(tag)} // Call handleClick with the clicked tag
              className={`m-1 font-xl py-3 px-2.5 rounded-full cursor-pointer flex justify-center items-center border ${getTagClass(
                tag
              )}`}
            >
              <span className="text-xs font-normal leading-none">
                {tag.topic}
              </span>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end">
        <button
          className={`bg-purple text-white px-4 py-2 rounded-lg ${
            selectedTags.length ? "" : "opacity-60"
          }`}
          onClick={handleNextClick}
          disabled={selectedTags.length === 0} // Disable if no tag is selected
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectTopic;
