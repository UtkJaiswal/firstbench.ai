import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import deductionIcon from "../../assets/deductionIcon.svg";
import loader from "../../assets/loaderAnimation.webm";
import { ReactComponent as ScoreIcon } from "../../assets/score.svg";
import { ReactComponent as TimeTaken } from "../../assets/timetaken.svg";
import { useNavigate, useLocation } from "react-router-dom";
import FeedbackModal from "./Feedback";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return minutes > 0
    ? `${minutes}min ${seconds < 10 ? "0" : ""}${seconds}secs`
    : `${seconds}secs`;
};

const ResultPage = () => {
  const [apiData, setApiData] = useState({
    what: [],
    why: [],
    impact: [],
    framework: [],
    method: [],
    steps: [],
    resources: [],
    skill: [],
  });

  const [isOpen, setIsOpen] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [ques, setQues] = useState([]);
  const [timeTaken, setTimeTaken] = useState([]);
  const [score, setScore] = useState([]);
  const [dynamicScores, setDynamicScores] = useState([]);
  const [staticScores, setStaticScores] = useState([]);
  const [reasons, setReasons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeduction, setSelectedDeduction] = useState("");
  const [totaldyn, setTotalDyn] = useState(0);
  const [totalstat, setTotalStat] = useState(0);

  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const questionDisplay = [1, 2, 3, 4, 5];

  const dropdownRefs = useRef([]);

  const toggleDropdown = (index) => {
    const newIsOpen = [...isOpen];
    newIsOpen[index] = !newIsOpen[index];
    setIsOpen(newIsOpen);
  };

  const handleOpenModal = (deduction) => {
    setSelectedDeduction(deduction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDeduction(null);
  };

  const location = useLocation();
  const debateUserId = location.state?.debate_user_id || "";

  const tabs = location.state?.questions || [];
  const time = location.state?.timeTaken || [];

  useEffect(() => {
    const q = tabs.map((question) => question.text);
    setQues(q);
  }, [tabs]);
  useEffect(() => {
    setTimeTaken(time);
    console.log("Time Taken on result page is ", time);
  }, [timeTaken]);

  const fetchDeductionData = async (questionNumber) => {
    try {
      setLoading(true);
      //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI4NjQwMTExLCJleHAiOjE3Mjk2NDAxMTF9._mjnpoMsUE_E04dolOY7V7Vpu2NKnWAoaFOgYSIDC-k';
      console.log("Q number:", questionNumber);
      console.log(debateUserId);
      const response = await axios.post(
        "https://firstbench-ai-node.onrender.com/debate/scoreAndDeduction/",
        {
          question_number: questionNumber,
          debate_user_id: debateUserId,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzMwODE2MDAyLCJleHAiOjE3MzE4MTYwMDJ9.EHPDQOFr3lkXVGE71I5MpRG0IiMJQRRLLAtoc_lMlh8",
            "Content-Type": "application/json",
          },
        }
      );

      const deductionData = response.data.data.scores.deductions;

      console.log("Response:", response.data.data);
      setDeductions(deductionData);
      console.log("Deduction", deductionData);

      setIsOpen(Array(deductionData.length).fill(false));

      console.log(
        "Dynamic metrics:",
        response.data.data.scores.scores.dynamic_metrics
      );
      console.log(
        "Static metrics:",
        response.data.data.scores.scores.static_metrics
      );

      setDynamicScores(response.data.data.scores.scores.dynamic_metrics);
      setStaticScores(response.data.data.scores.scores.static_metrics);
    } catch (error) {
      console.error("Error fetching deductions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedback = async (questionNumber) => {
    try {
      console.log("Feedback Debate User ID");
      const feedbackResponse = await axios.post(
        "https://firstbench-middleware-1.onrender.com/feedback",
        {
          question_number: questionNumber,
          debate_user_id: debateUserId,
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzMwODE2MDAyLCJleHAiOjE3MzE4MTYwMDJ9.EHPDQOFr3lkXVGE71I5MpRG0IiMJQRRLLAtoc_lMlh8",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Feedback:", feedbackResponse);
      const feedbackArray = feedbackResponse?.data.data.feedback;

      setApiData((prevData) => ({
        ...prevData,
        //why: feedbackArray.map(item => item.Explanation["Why_it was_deducted"]), // Directly map and set
        what: feedbackArray.map(
          (item) => item.Explanation["What_was_deducted"]
        ),
        impact: feedbackArray.map((item) => item.Explanation["Impact"]),
        why: feedbackArray.map(
          (item) => item.Explanation["Why_it was_deducted"]
        ),
      }));
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchDeductionData(activeTab + 1);
      await fetchFeedback(activeTab + 1);
    };
    fetchData();
  }, [activeTab, debateUserId]);

  useEffect(() => {
    if (dynamicScores.length > 0) {
      console.log("Updated dynamicScores:", dynamicScores);
      setTotalDyn(
        dynamicScores
          ?.map((dynamic) => dynamic.score)
          .reduce((acc, curr) => acc + curr, 0) / 5
      );
      console.log("Avg Dynamic score value:", totaldyn);
    }
  }, [dynamicScores]);

  useEffect(() => {
    if (staticScores.length > 0) {
      console.log("Updated staticScores:", staticScores);
      setTotalStat(
        staticScores
          ?.map((stat) => stat.score)
          .reduce((acc, curr) => acc + curr, 0) / 5
      );
      console.log("Avg Stat score value:", totalstat);
    }
  }, [staticScores]);

  useEffect(() => {
    if (reasons.length > 0) {
      console.log("Reason for deduction:", reasons);
    }
  }, [reasons]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const newIsOpen = isOpen.map((open, index) => {
        if (
          dropdownRefs.current[index] &&
          !dropdownRefs.current[index].contains(event.target)
        ) {
          return false;
        }
        return open;
      });
      setIsOpen(newIsOpen);
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // Radar data for dynamicScores
  const dynamicRadarData = {
    labels: dynamicScores
      ? dynamicScores.map((dynamic) => dynamic.metric)
      : ["Dynamic Label 1", "Dynamic Label 2", "Dynamic Label 3"],
    datasets: [
      {
        label: "",
        data: dynamicScores?.map((dynamic) => dynamic.score),
        backgroundColor: "#4ED3CD80",
        opacity: "50%",
        borderColor: "#4ED3CD80",
        borderWidth: 2,
        pointBackgroundColor: "#4ED3CD80",
      },
    ],
  };

  // Radar data for staticScores
  const staticRadarData = {
    labels: staticScores
      ? staticScores.map((stat) => stat.metric)
      : ["Static Label 1", "Static Label 2", "Static Label 3"],
    datasets: [
      {
        label: "",
        data: staticScores?.map((stat) => stat.score),
        backgroundColor: "#8385D680",
        opacity: "50%",
        borderColor: "#8385D680",
        borderWidth: 2,
        pointBackgroundColor: "#8385D680",
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        grid: {
          color: "#000", // Sets the spider web color to black
        },
        min: 0,
        max: 10,
        ticks: {
          stepSize: 2,
        },
        angleLines: {
          color: "#000",
        },

        pointLabels: {
          font: {
            family: "manrope",
            size: 12,
          },
          color: "#000",
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <>
      <h3 className="container flex items-center font-bold m-12 text-xl px-10">
        Results
      </h3>

      <div
        style={{ height: "auto", width: "80rem" }}
        className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-md border border-grey-300"
      >
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex space-x-10 space-between border-b border-gray-300 text-sm mx-auto">
            {questionDisplay.map((que, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-14 py-4 text-gray-600 focus:outline-none font-bold ${
                  activeTab === index ? "border-b-2 border-purple" : ""
                }`}
              >
                Question {que}
              </button>
            ))}
          </div>

          {/* Conditional rendering for loading */}
          {loading ? (
            <div className="flex justify-center h-screen py-10">
              <video
                className="w-32 h-32 absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                src={loader}
                autoPlay
                loop
                muted
              />
            </div>
          ) : (
            <div>
              {/* Content for active tab */}

              {/* Display score summary */}
              <div className="text-sm flex flex-row justify-end items-center space-x-4 bg-[#D0CEF0] p-4 my-4 rounded-lg max-w-[35%] ml-auto">
                <div className=" flex items-center">
                  <ScoreIcon />
                  <span className="ml-2 font-semibold">
                    Score -{" "}
                    {((totaldyn + totalstat) / 2) % 1 === 0
                      ? (totaldyn + totalstat) / 2
                      : ((totaldyn + totalstat) / 2).toFixed(1)}
                    /10
                  </span>
                </div>

                <div className="flex items-center">
                  <TimeTaken />
                  <span className="ml-2 font-semibold">
                    Time Taken-{timeTaken[activeTab]} seconds
                  </span>
                </div>
              </div>

              {/* Radar Charts */}
              <div className="flex justify-around mb-8 gap-x-5">
                <div
                  style={{ width: "600px", height: "auto" }}
                  className="border rounded-md p-4 "
                >
                  <Radar data={dynamicRadarData} options={radarOptions} />
                </div>
                <div
                  style={{ width: "600px", height: "auto" }}
                  className="border rounded-md p-4 "
                >
                  <Radar data={staticRadarData} options={radarOptions} />
                </div>
              </div>

              {/* Deductions */}
              <div className="flex my-4 font-semibold">
                <img
                  src={deductionIcon}
                  alt="Deduction Icon"
                  className="mr-2"
                />
                Reason for deduction-
              </div>

              {deductions.length > 0 ? (
                deductions.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center justify-between min-h-10 p-3 bg-red-50 text-red-500 rounded-md mb-4 text-sm"
                  >
                    <div
                      className="flex items-center justify-between w-full"
                      onClick={() => handleOpenModal(index)}
                    >
                      <span>{item}</span>
                    </div>

                    {isModalOpen && (
                      <FeedbackModal
                        isOpen={isModalOpen}
                        onClose={handleCloseModal}
                        deduction={selectedDeduction}
                        explanation={apiData}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div>No deductions available</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default ResultPage;
