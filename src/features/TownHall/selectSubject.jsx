import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import chevron from "../../assets/chevron.svg";
import axios from "axios";
import LoadingSpinner from "../../components/elements/LoadingAni";

const SelectSubject = () => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleClick = (tag) => {
    if (selectedTags.length > 0 && selectedTags[0].id === tag.id) {
      setSelectedTags([]);
    } else {
      setSelectedTags([tag]);
    }
  };

  const getTagClass = (tag) => {
    const selectedIds = selectedTags.map((selected) => selected.id);

    return selectedIds.includes(tag.id)
      ? "bg-teal-300 text-white border border-teal-300"
      : "bg-white";
  };

  const navigate = useNavigate();

  const handleNextClick = () => {
    navigate("/townhall/topic", { state: { selectedSubject: selectedTags } });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTags = sessionStorage.getItem("tagsData");

        if (storedTags) {
          setTags(JSON.parse(storedTags));
        } else {
          const response = await axios.get("/debate/getSubjects");
          const tagsData = response.data.data.subjects.map((subject) => ({
            id: subject._id,
            topic: subject.subject_name,
          }));
          setTags(tagsData);
          sessionStorage.setItem("tagsData", JSON.stringify(tagsData));
          console.log(tagsData);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate("/townhall");
  };

  return (
    <>
      <div className="container mx-auto w-1/2 rounded-lg my-14 px-10 py-10 border border-grey-300">
        <button
          className="flex items-center bg-white rounded-lg px-4 py-2 my-4 text-black font-semibold"
          onClick={() => handleBackClick()}
        >
          <img src={chevron} alt="chevron icon" className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="text-lg font-semibold text-gray-800 mb-2">
          Select a subject you want to discuss about
        </div>
        <p className="text-grey mb-4">
          Pick a few topics you’d like to discuss, and we’ll get started with
          your personalized session.
        </p>

        <div className="container flex flex-wrap space-x-2">
          <>
            {tags.length === 0 ? (
              <LoadingSpinner />
            ) : (
              tags.map((tag) => (
                <div
                  key={tag.id}
                  onClick={() => handleClick(tag)}
                  className={`m-1 font-xl py-3 px-2.5 rounded-full cursor-pointer ${getTagClass(
                    tag
                  )} flex justify-center items-center border border-grey`}
                >
                  <span className="text-xs font-normal leading-none">
                    {tag.topic}
                  </span>
                </div>
              ))
            )}
          </>
        </div>

        <div className="flex justify-end">
          {selectedTags.length === 1 || selectedTags.length > 1 ? (
            <button
              className="bg-purple text-white px-4 py-2 rounded-lg"
              onClick={handleNextClick}
              disabled={false}
            >
              Next
            </button>
          ) : (
            <button
              className="bg-purple text-white px-4 py-2 rounded-lg opacity-60"
              onClick={handleNextClick}
              disabled={true}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectSubject;
