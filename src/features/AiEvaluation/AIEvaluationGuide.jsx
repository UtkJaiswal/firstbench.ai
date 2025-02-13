import React from "react";
import Do from "../../assets/Do's.png";
import Do_Not from "../../assets/Dont's.png";
import { useNavigate } from "react-router-dom";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const AIEvaluationGuide = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white mt-5 p-6 rounded-lg border max-h-[671px] max-w-[74rem] mx-auto">
      <h2 className="text-2xl text-[#8385D6] font-bold mb-4">
        How to Use the AI Evaluation Feature
      </h2>
      <p className="mb-4 font-bold">
        Step-by-Step Guide to Submitting Your Work for AI Evaluation.
      </p>

      <div className="flex gap-6">
        {/* Main container with flex and gap */}

        {/* Left section: occupies 2/3 of the width */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="flex justify-between p-4 gap-6 h-[350px] rounded-lg border-2 border-[#9394D7]">
            {/* First inner div with image and text */}
            <div className="w-1/2">
              <img src={Do} alt="Placeholder" className="mb-4" />

              <p>
                <ul className="list-disc pl-4">
                  <li>
                    Ensure that each uploaded photo contains only{" "}
                    <span className="text-[#6FAB10]">
                      one question and its corresponding answer
                    </span>{" "}
                    for accurate evaluation. This is applicable to all other
                    formats.
                  </li>
                </ul>
              </p>
            </div>
            {/* Second inner div with image and text */}
            <div className="w-1/2">
              <img src={Do_Not} alt="Placeholder" className="mb-4" />
              <p>
                <ul className="list-disc pl-4">
                  <li>
                    <span className="text-[#E54848]">
                      Do not upload photos containing multiple questions and
                      answers.
                    </span>
                    Each photo should only include one question and its
                    corresponding answer for accurate evaluation.
                  </li>
                </ul>
              </p>
            </div>
          </div>
        </div>

        {/* Right section: occupies 1/3 of the width */}
        <div className="flex-[0.4] p-4 flex flex-col h-[350px] rounded-lg border-2 border-[#9394D7] text-[#1D2633]">
          <div className="flex items-center mb-4 border border-black p-2 rounded-md">
            <FaCheckSquare className="text-[#5A5FBC] mr-2" />
            <span>Submitting without the questions.</span>
          </div>
          <div className="p-3 flex">
            <FaCheckSquare className="text-[#5A5FBC] mr-2" />
            <FaRegSquare className="text-gray-600 mr-2" />
          </div>
          <ul className="mb-4 list-disc pl-4">
            <li>
              Check this box if your material doesn't include any questions.
            </li>
            <li>You'll then have the option to enter the question manually.</li>
            <li>
              If your uploaded material already contains the question, simply
              proceed with the regular flow.
            </li>
          </ul>
        </div>
      </div>

      <p className="mt-6 text-[#B91C1C]">
        Only one question and its corresponding answer will be evaluated at a
        time. Make sure to submit each question-answer pair separately for
        evaluation.
      </p>

      <button
        onClick={() => navigate("/ai_evaluation/drag-and-drop")}
        className="bg-[#5A5FBC] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Get started
      </button>
    </div>
  );
};

export default AIEvaluationGuide;
