import React, { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

const SelectSubject = ({
  apiEndpoint,
  navigateBackTo,
  navigateNextTo,
  loadingComponent: LoadingComponent,
  backText = "Back",
  nextText = "Next",
  headerText = "Select a subject you want to discuss about",
  subText = "Pick a few topics you’d like to discuss, and we’ll get started with your personalized session.",
  sessionStorageKey = "tagsData",
}) => {
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const navigate = useNavigate();

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

  const handleNextClick = () => {
    navigate(navigateNextTo, { state: { selectedSubject: selectedTags } });
  };

  const handleBackClick = () => {
    navigate(navigateBackTo);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedTags = sessionStorage.getItem(sessionStorageKey);
        if (storedTags) {
          setTags(JSON.parse(storedTags));
        } else {
          const response = await axios.get(apiEndpoint);
          const tagsData = response.data.data.subjects.map((subject) => ({
            id: subject._id,
            topic: subject.subject_name,
          }));
          setTags(tagsData);
          sessionStorage.setItem(sessionStorageKey, JSON.stringify(tagsData));
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [apiEndpoint, sessionStorageKey]);

  return (
    <div className="container mx-auto w-1/2 rounded-lg my-14 px-10 py-10 border border-grey-300">
      <button
        className="flex items-center bg-white rounded-lg px-4 py-2 my-4 text-black font-semibold"
        onClick={handleBackClick}
      >
        <img src="/path-to-chevron.svg" alt="chevron icon" className="h-4 w-4 mr-2" />
        {backText}
      </button>

      <div className="text-lg font-semibold text-gray-800 mb-2">{headerText}</div>
      <p className="text-grey mb-4">{subText}</p>

      <div className="container flex flex-wrap space-x-2">
        {tags.length === 0 ? (
          <LoadingComponent />
        ) : (
          tags.map((tag) => (
            <div
              key={tag.id}
              onClick={() => handleClick(tag)}
              className={`m-1 font-xl py-3 px-2.5 rounded-full cursor-pointer ${getTagClass(
                tag
              )} flex justify-center items-center border border-grey`}
            >
              <span className="text-xs font-normal leading-none">{tag.topic}</span>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-end">
        <button
          className={`bg-purple text-white px-4 py-2 rounded-lg ${
            selectedTags.length === 0 ? "opacity-60" : ""
          }`}
          onClick={handleNextClick}
          disabled={selectedTags.length === 0}
        >
          {nextText}
        </button>
      </div>
    </div>
  );
};

SelectSubject.propTypes = {
  apiEndpoint: PropTypes.string.isRequired,
  navigateBackTo: PropTypes.string.isRequired,
  navigateNextTo: PropTypes.string.isRequired,
  loadingComponent: PropTypes.elementType.isRequired,
  backText: PropTypes.string,
  nextText: PropTypes.string,
  headerText: PropTypes.string,
  subText: PropTypes.string,
  sessionStorageKey: PropTypes.string,
};

export default SelectSubject;
