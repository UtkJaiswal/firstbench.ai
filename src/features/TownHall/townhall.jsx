import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import microphone_off from "../../assets/microphone_off.svg";
import mic_animation from "../../assets/mic_animation.webm";
import clock from "../../assets/clock.svg";
import sound_settings from "../../assets/sound_settings.svg";
import exit_townhall from "../../assets/exit_townhall.svg";
import tap_text from "../../assets/tap_to_speak_text.svg";
import resubmit_text from "../../assets/resubmit_answer.svg";
import speak from "../../assets/speak_icon.svg";
import loader from "../../assets/loaderAnimation.webm";
import LoadingSpinner from "../../components/elements/LoadingAni";
import mic from "../../assets/microphone.svg";
import axios from "axios";

export const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

const Townhall = () => {
  // const [userName, setUserName] = useState("");
  const [isCapturing, setIsCapturing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showDeviceDropdown, setShowDeviceDropdown] = useState(false);
  const [transcription, setTranscription] = useState([]);
  const [timeTaken, setTimeTaken] = useState([]);
  const [questionLoading, setQuestionLoading] = useState(true);

  const localStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const [soundLevel, setSoundLevel] = useState(0); // New state for sound level
  const analyserRef = useRef(null); // Ref for analyser node
  const audioContextRef = useRef(null); // Ref for audio context

  const { id } = useParams(); // Get the question ID from the URL
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(90); // 90 seconds as the initial time
  const [hasStarted, setHasStarted] = useState(false); // Track if timer has started

  const [isMuted, setIsMuted] = useState(true);
  const [showModal, setShowModal] = useState(false); // For the exit confirmation popup

  const [slideDirection, setSlideDirection] = useState(""); // New state for transition direction
  const questionBarRef = useRef(null);
  const [nextQuestionIndex, setNextQuestionIndex] = useState(null); // State for next question index

  // Ensure the id from URL is a number and is valid
  const currentQuestionIndex = Number(id) - 1;
  const [audioDevices, setAudioDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const dropdownRef = useRef(null); // Ref for the dropdown
  const dropdownButtonRef = useRef(null); // Ref for the button that toggles the dropdown

  const [timerEnded, setTimerEnded] = useState(false);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Extract the selected topics and debate_user_id from the location state

  const location = useLocation();

  // Access the passed state (selectedTopics and debate_user_id)
  const selectedTags = location.state?.selectedTopics || [];
  const debate_user_id = location.state?.debate_user_id || "";

  // Create states to store the extracted data
  const [topics, setTopics] = useState(selectedTags);
  const [debateUserId, setDebateUserId] = useState(debate_user_id);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Log for debugging purposes
    console.log("Selected Topics:", topics);
    console.log("Debate User ID:", debateUserId);
  }, [topics, debateUserId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const body = {
          debate_user_id: debateUserId,
          subject: topics,
          topic: "",
        };
      
        const response = await axios.post(
          "/debate/generateQuestion/",
          body,
          {
            headers: {
              Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjMsImlhdCI6MTczMjU0ODE1MiwiZXhwIjoxNzMzNTQ4MTUyfQ.5P2Vg3S1UiPIBgCapCLzJAT5qWu_gNvviMjznz9RyHE",
              "Content-Type": "application/json", 
            },
          }
        );
        let id = 1;
        const questionsData = response.data.data.questions.map((question) => ({
          id: id,
          title: "Question " + id++,
          text: question,
        }));
        setQuestions(questionsData);
        setQuestionLoading(false); // Stop the loader once data is fetched
      } catch (error) {
        console.error("Error fetching data", error);
        setQuestionLoading(false); // Stop the loader if there's an error
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    console.log("questions", questions);
  }, [questions]);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(event.target)
      ) {
        setShowDeviceDropdown(false); // Close the dropdown
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        const audioInputDevices = devices.filter(
          (device) => device.kind === "audioinput"
        );
        setAudioDevices(audioInputDevices);

        if (audioInputDevices.length > 0) {
          // Try to find the default device based on the label
          const defaultDevice = audioInputDevices.find((device) =>
            device.label.toLowerCase().includes("default")
          );

          // Set the default device if found, otherwise use the first device
          if (defaultDevice) {
            setSelectedDeviceId(defaultDevice.deviceId);
          } else {
            setSelectedDeviceId(audioInputDevices[0].deviceId);
          }
        }
      })
      .catch((error) => {
        console.error("Error accessing media devices:", error);
        // Fallback to the first device if error
        if (audioDevices.length > 0) {
          setSelectedDeviceId(audioDevices[0].deviceId);
        }
      });
  }, []);

  // useEffect(() => {
  //   const randomUserName = "User-" + Math.floor(Math.random() * 100000);
  //   setUserName(randomUserName);
  // }, []);

  const startCapture = async () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      console.warn("Already recording, stopping first.");
      mediaRecorderRef.current.stop();
    }

    if (!localStreamRef.current) {
      try {
        localStreamRef.current = await navigator.mediaDevices.getUserMedia({
          video: false,
          audio: {
            deviceId: selectedDeviceId
              ? { exact: selectedDeviceId }
              : undefined,
          },
        });
      } catch (err) {
        console.error("Error accessing media devices:", err);
        return;
      }
    }

    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (!audioTrack) {
      console.error("No audio track available");
      return;
    }

    // Create audio context and analyser node for dynamic sound intensity
    audioContextRef.current = new (window.AudioContext ||
      window.webkitAudioContext)();
    const source = audioContextRef.current.createMediaStreamSource(
      localStreamRef.current
    );
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 256;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    source.connect(analyserRef.current);

    // Function to update sound level based on analyser data
    const updateSoundLevel = () => {
      analyserRef.current.getByteFrequencyData(dataArray);
      const average = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
      setSoundLevel(Math.round(average));
      requestAnimationFrame(updateSoundLevel); // Loop to continuously update sound level
    };
    updateSoundLevel(); // Start the animation loop

    mediaRecorderRef.current = new MediaRecorder(new MediaStream([audioTrack]));

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunksRef.current.push(event.data);
        console.log("Audio chunk captured, size:", event.data.size, "bytes");
      }
    };

    mediaRecorderRef.current.onstop = () => {
      sendAudioChunks();
      setIsLoading(true);
    };

    mediaRecorderRef.current.start(3333); // Start recording with a time slice of 3.33s
    setIsCapturing(true); // Update the state
  };

  const stopCapture = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop(); // Stop the recorder
    }

    if (localStreamRef.current) {
      const tracks = localStreamRef.current.getTracks();
      tracks.forEach((track) => track.stop()); // Stop all tracks
      localStreamRef.current = null; // Clear the stream
    }

    setIsCapturing(false); // Update the state
  };

  const toggleMuteAndCapture = async () => {
    if (isMuted) {
      // Unmute: Start capturing if the mic is unmuted
      setIsMuted(false);
      if (!hasStarted) {
        setHasStarted(true);
      }

      if (!isCapturing) {
        await startCapture();
      }
    } else {
      // Mute: Stop capturing if the mic is muted

      setIsMuted(true);
      if (isCapturing) {
        stopCapture();
      }
    }
  };

  const sendAudioChunks = () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/webm" });
    console.log("Audio blob size:", audioBlob.size, "bytes"); // Log audio blob size
    const formData = new FormData();
    const timestamp = Date.now();
    const fileName = `chunk-${timestamp}.webm`;
    const jwtToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzMwODE2MDAyLCJleHAiOjE3MzE4MTYwMDJ9.EHPDQOFr3lkXVGE71I5MpRG0IiMJQRRLLAtoc_lMlh8"; // testing token (replace it by actual token)
    // const user_id = "5"; // testing user_id (replace it by actual token)
    // const debate_id = "66fc25aaba080b6215bdc4b2"; // testing debate_id
    // const debate_user_id = "6708dccab78b2e4808b258c0"; // testing debate_user_id
    formData.append("audio", audioBlob, fileName);
    // formData.append("debate_id", debate_id);
    // formData.append("user_id", user_id);
    formData.append("debate_user_id", debateUserId);
    formData.append("question_number", currentQuestionIndex + 1);

    fetch(
      "/debate/transcribeAndAnswer/",
      {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${jwtToken}`, // Add JWT token here
        },
        credentials: "include",
        mode: "cors",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.data.user_answer) {
          setIsLoading(false);
          const responseArray = [...transcription];
          const responseForCurrentQuestion =
            responseArray[currentQuestionIndex - 1] || "";
          responseArray[currentQuestionIndex] = data.data.user_answer || "";
          setTranscription(responseArray);
          console.log(data.data.user_answer);
          console.log(responseArray);
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        if (
          error instanceof TypeError &&
          error.message.includes("NetworkError")
        ) {
          console.error("Possible CORS or network connectivity issue");
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    audioChunksRef.current = [];
  };

  /////////////////////////////////////
  // const questions = [
  //   {
  //     id: 1,
  //     title: "1. Air quality index 2024",
  //     text: "Pitch your thoughts on the new Air quality index report 2024 and how we can improve this in the near future.",
  //   },
  //   {
  //     id: 2,
  //     title: "2. Carbon emissions and climate change",
  //     text: "How can we reduce carbon emissions to combat climate change?",
  //   },
  //   {
  //     id: 3,
  //     title: "3. Renewable energy adoption",
  //     text: "What strategies can we implement to accelerate the adoption of renewable energy sources?",
  //   },
  //   {
  //     id: 4,
  //     title: "4. Public awareness of environmental issues",
  //     text: "How can we raise public awareness about the importance of environmental conservation?",
  //   },
  //   {
  //     id: 5,
  //     title: "5. Sustainable urban development",
  //     text: "What measures should be taken to promote sustainable urban development in growing cities?",
  //   },
  // ];

  useEffect(() => {
    // Redirect to the first question if id is invalid or out of bounds
    if (
      isNaN(currentQuestionIndex) ||
      currentQuestionIndex < 0 ||
      currentQuestionIndex >= questions.length
    ) {
      navigate(`/townhall/1`);
    }
    // if(transcription[currentQuestionIndex-1].length==0)
  }, [currentQuestionIndex, navigate]);

  // Timer logic
  useEffect(() => {
    let timer;
    // Start timer automatically when questions are loaded
    if (!questionLoading && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0) {
      setIsMuted(true);
      setTimerEnded(true);
      if (isCapturing) {
        setIsLoading(true);
        stopCapture();
      }
    }

    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestionIndex, questionLoading]);

  useEffect(() => {
    // Only go to next question when both conditions are true
    if (
      timerEnded &&
      !isLoading &&
      // currentQuestionIndex < questions.length - 1
      currentQuestionIndex <= questions.length - 1
    ) {
      handleNextQuestion(); // Move to next question only when timer ends and transcription is complete
      setTimerEnded(false); // Reset timer flag for the next question
    }
    // else if (
    //   timerEnded &&
    //   !isLoading &&
    //   currentQuestionIndex == questions.length - 1
    // ) {
    //   questionBarRef.current.style.backgroundColor = transcription[
    //     currentQuestionIndex - 1
    //   ]
    //     ? "#E8FAF8"
    //     : "#FEF2F2";
    // }
  }, [timerEnded, isLoading]);

  // Cleanup on component unmount
  useEffect(() => {
    setIsLoading(false);
    // Cleanup: Mute microphone and stop recording when the user navigates to another page
    return () => {
      // setIsSkipped(true);
      setIsMuted(true); // Mute the mic
      if (isCapturing) {
        stopCapture(); // Stop capturing if mic is still recording
      }
      // Release media devices (important for cleanup)
      if (localStreamRef.current) {
        const tracks = localStreamRef.current.getTracks();
        tracks.forEach((track) => track.stop()); // Stop all tracks
        localStreamRef.current = null; // Clear the stream reference
      }
    };
  }, [navigate]); // This effect will trigger whenever the page changes

  // Formatting time as mm:ss
  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  // Toggle modal visibility
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleExit = () => {
    navigate("/"); // Redirect to the dashboard route
  };

  const handleNextQuestion = () => {
    if (isButtonDisabled) return; // Prevent action if the button is disabled
    questionBarRef.current.style.backgroundColor = transcription[
      currentQuestionIndex
    ]
      ? "#E8FAF8"
      : "#FEF2F2";
    setIsButtonDisabled(true); // Disable the button
    setIsLoading(false);
    const timeDelay = timerEnded ? 2000 : 500;
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setNextQuestionIndex(currentQuestionIndex + 1); // Set next question index
        setSlideDirection("left"); // Trigger slide animation
        setTimeout(() => {
          questionBarRef.current.style.visibility = "hidden";
          setSlideDirection("right"); // Trigger slide
        }, 250);
        setTimeout(() => {
          setTimeTaken((prevTimeTaken) => [...prevTimeTaken, 91 - timeLeft]);
          console.log("Time Taken", timeTaken);

          navigate(`/townhall/${currentQuestionIndex + 2}`); // Navigate to next question
          setTimeLeft(90); // Reset timer
          // setSlideDirection("displayfromLeft");
          questionBarRef.current.style.backgroundColor = "#F1F0FA";
          setSlideDirection("");
          questionBarRef.current.style.visibility = "visible";
          setSlideDirection("center"); // Trigger slide
          stopCapture(); // Assuming this function is defined
        }, 500); // Adjust this delay to match your slide duration
      } else if (currentQuestionIndex === questions.length - 1) {
        setSlideDirection("left"); // Trigger slide animation

        setTimeout(() => {
          // Capture final timeTaken update and pass it to the result page
          const updatedTimeTaken = [...timeTaken, 91 - timeLeft];
          setTimeTaken(updatedTimeTaken);
          console.log("Final Time Taken", updatedTimeTaken);
          // Navigate to result page with updated timeTaken
          navigate(`/townhall/result`, {
            state: {
              debate_user_id: debateUserId,
              questions: questions,
              timeTaken: updatedTimeTaken, // Use updatedTimeTaken
            },
          });
          setTimeLeft(90); // Reset timer
          questionBarRef.current.style.backgroundColor = "#F1F0FA";
          setSlideDirection("");
          stopCapture(); // Assuming this function is defined
        }, 300);
        // stopCapture(); // Assuming this function is defined
      }

      // Re-enable the button after 1 second
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 1000); // 1 second delay
    }, timeDelay); // Delay for the first timeout
  };

  const [disabled, setDisabled] = useState(false);

  return (
    <>
      {questionLoading ? (
        <div className="flex justify-center items-center h-screen">
          <video
            className="w-32 h-32 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            src={loader} // Use your loader video here
            autoPlay
            loop
            muted
          />
        </div>
      ) : (
        <div
          style={{ height: "35rem", width: "74rem" }}
          className="container mx-auto mt-8 p-6 bg-white shadow-lg rounded-md border border-grey-300"
        >
          {/* Timer and question counter */}
          <div className="flex flex-row justify-between">
            <div className="flex items-center mb-4">
              <span
                style={{ backgroundColor: "#F9FAFB" }}
                className=" flex flex-row items-center justify-center h-6 w-16 border rounded-xl content-center text-gray-500 font-medium text-sm"
              >
                <img src={clock} alt="clock" className="h-4 w-4 mr-1" />
                {formatTime(timeLeft)}
              </span>
              <span className="text-gray-500 font-medium text-sm mx-4">
                {`${currentQuestionIndex + 1} of ${questions.length} questions`}
              </span>
            </div>

            <div className="flex items-center mb-4 relative">
              <span>
                <img src={mic} alt="" />
              </span>
              <div className="sound-bar">
                <div
                  className="sound-bar-fill"
                  style={{ width: `${soundLevel}%` }} // Sound level percentage controlling height
                ></div>
              </div>
              <button
                ref={dropdownButtonRef} // Attach the ref to this button
                onClick={() => setShowDeviceDropdown(!showDeviceDropdown)}
              >
                <img
                  src={sound_settings}
                  alt="Sound Settings"
                  className="h-8 mr-2"
                />
              </button>

              {showDeviceDropdown && (
                <div
                  ref={dropdownRef} // Attach the ref to this div
                >
                  <select
                    value={selectedDeviceId}
                    onChange={(e) => setSelectedDeviceId(e.target.value)}
                    className="z-10 ml-2 p-1 border rounded absolute top-[175%] left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-72 overflow-hidden text-ellipsis"
                  >
                    {audioDevices.map((device) => (
                      <option
                        key={device.deviceId}
                        value={device.deviceId}
                        className="text-xs truncate w-full"
                      >
                        {device.label || `Microphone ${device.deviceId}`}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button onClick={toggleModal}>
                <img src={exit_townhall} alt="exit" />
              </button>
            </div>
          </div>

          {/* Question */}
          {questions[currentQuestionIndex] && (
            <div
              style={{ height: "400px" }}
              className="relative overflow-hidden"
              // Adding sliding transition class
            >
              <div
                id="question_bar"
                ref={questionBarRef}
                style={{ backgroundColor: "#F1F0FA" }}
                className={`mb-4 rounded-md px-4 py-2 relative transition-transform duration-200  ${
                  slideDirection === "left" ? "-translate-x-full" : ""
                }
            ${slideDirection === "right" ? "translate-x-full" : ""}
            ${slideDirection === "center" ? "translate-x-0" : ""}
            
            
            `}
              >
                <div className="flex justify-left space-x-2 items-center mb-2">
                  <div
                    className={`h-4 w-4 rounded-full border  border-gray-600`}
                  ></div>
                  <h1 className="text-xl font-semibold text-gray-900 flex justify-start items-center">
                    {questions[currentQuestionIndex].title}
                  </h1>
                </div>
                <p className="text-gray-600">
                  {questions[currentQuestionIndex].text}
                </p>
              </div>

              <div className="h-60 flex items-start overflow-y-auto scrollbar-thin  scrollbar-rounded relative">
                <img src={speak} alt="speak" className="mr-2" />
                {!transcription[currentQuestionIndex] ? (
                  <span className="my-2">Start speaking...</span>
                ) : (
                  <p className="m-2">{transcription[currentQuestionIndex]}</p>
                )}
                {isLoading && (
                  <>
                    <LoadingSpinner />
                  </>
                )}
              </div>
              {!transcription[currentQuestionIndex] &&
                isMuted &&
                (currentQuestionIndex !== questions.length - 1 ||
                  !timerEnded) && (
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
                    <img src={tap_text} alt="tap_text" />
                  </div>
                )}
              {transcription[currentQuestionIndex] &&
                isMuted &&
                (currentQuestionIndex !== questions.length - 1 ||
                  !timerEnded) && (
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center">
                    <img src={resubmit_text} alt="resubmit_text" />
                  </div>
                )}
            </div>
          )}

          <div className="relative flex justify-between items-center my-0">
            {/* Microphone button */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => {
                  // Disable the button for 2 seconds
                  toggleMuteAndCapture(); // Your existing function
                  setDisabled(true); // Disable the button immediately
                  setTimeout(() => setDisabled(false), 2000); // Enable the button after 2 seconds
                }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                disabled={timeLeft === 0 || disabled} // Disable button based on timeLeft or disabled state
              >
                {isMuted ? (
                  <img
                    src={microphone_off}
                    alt="Microphone Off"
                    className="w-16 h-16 self-center"
                  />
                ) : (
                  <video
                    src={mic_animation}
                    alt="Microphone Active"
                    className="w-16 h-16 self-center"
                    autoPlay
                    loop
                    muted
                  />
                )}
              </button>
            </div>

            {/* Next question button */}
            <button
              onClick={handleNextQuestion}
              disabled={isButtonDisabled}
              // disabled={currentQuestionIndex === questions.length - 1}
              style={{
                color: "#5A5FBC",
                borderColor: "#5A5FBC",
                borderWidth: "1px",
              }}
              className=" px-4 py-0 rounded-md h-9 w-48 ml-auto"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Result"
                : "Next question →"}
            </button>
          </div>

          {/* Modal Popup for Exit Confirmation */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg h-60 w-1/3">
                <h3 className="text-xl font-bold text-center mb-4">
                  Do you want to exit?
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry Lorem Ipsum been.
                </p>
                <div className="flex justify-center">
                  <button
                    onClick={toggleModal}
                    style={{ backgroundColor: " #FEF2F2" }}
                    className="h-10 w-40 border border-red-500 text-red-500 px-4 py-2 mx-2 rounded-md"
                  >
                    Continue
                  </button>
                  <button
                    onClick={handleExit} // Call handleExit to redirect
                    className="h-10 w-40 bg-red-500 text-white px-4 py-2 rounded-md"
                  >
                    Exit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Townhall;
