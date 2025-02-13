import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectSubject from "../../components/organisms/subjectSelector";

const MultiStepForm = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    studyTime: "",
    studyPreference: "",
    studyMode: "",
    sleepHours: "",
  });

  const navigate = useNavigate();
  const steps = [
    {
      question: "How much time can you dedicate to studying daily?",
      options: ["Less than 2 hours", "2-4 hours", "More than 4 hours"],
      key: "studyTime",
    },
    {
      question: "How often do you take mock tests?",
      options: ["Weekly", "Monthly", "Occasionally", "Rarely"],
      key: "studyPreference",
    },
    {
      question: "What motivates you to stay consistent?",
      options: [
        "Upcoming exam deadlines",
        "Peer competition",
        "Progress tracking",
        "Daily or weekly rewards",
      ],
      key: "studyMode",
    },
    {
      question: "Do you follow a fixed study schedule?",
      options: ["Yes", "No", "Maybe"],
      key: "sleepHours",
    },
  ];

  const handleOptionChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      navigate("/townhall/topic"); 
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="container mx-auto w-1/2 rounded-lg my-14 px-10 py-10 border border-grey-300">
      {currentStep < steps.length ? (
        <>
          {currentStep > 0 && (
            <button
              onClick={handleBack}
              className="text-purple font-medium flex items-center mb-4"
            >
              <span className="mr-2">←</span> Back
            </button>
          )}

          <h2 className="text-lg font-semibold mb-4">
            {currentStep + 1}. {steps[currentStep].question}
          </h2>

          <form>
            <div className="space-y-3">
              {steps[currentStep].options.map((option, index) => (
                <div key={index} className="p-2 border rounded-md">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={steps[currentStep].key}
                      value={option}
                      checked={formData[steps[currentStep].key] === option}
                      onChange={() =>
                        handleOptionChange(steps[currentStep].key, option)
                      }
                      className="form-radio text-purple focus:ring-purple"
                    />
                    <span>{option}</span>
                  </label>
                </div>
              ))}
            </div>
          </form>
        </>
      ) : (
        <div className="w-full h-screen bg-[#F9FAFB] flex justify-center items-center">
          <SelectSubject
            apiEndpoint="http://98.80.226.91/debate/getSubjects"
            loadingComponent={<div>Loading...</div>} 
            sessionStorageKey="tagsData"
            backText="Back"
            nextText="Next"
          />
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={handleNext}
          className="bg-purple text-white px-4 py-2 rounded-lg hover:bg-purple"
        >
          {currentStep < steps.length - 1 ? "Next" : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default MultiStepForm;
