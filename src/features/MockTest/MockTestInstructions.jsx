import React from "react";
import number from "../../assets/number.png"
import { useNavigate } from "react-router-dom";

const MockTestInstructions = () => {

  const navigate = useNavigate();
  const handleClick=()=>
  {
     navigate('/omr')
  }
  return (
    <div className="bg-[#f8f8f8] min-h-screen flex justify-center items-center">
      <div className="bg-white w-[90%] md:w-[60%] p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-[700] text-[#000000] mb-3 font-Manrope">General Instructions</h1>
        <p className="text-sm text-[#444D59] mb-3">
          Read the following instructions carefully
        </p>
        <ol className="list-decimal text-sm text-[#444D59] pl-5 space-y-3">
          <li>
            The clock will be set at the server. <span className="font-semibold">The countdown timer at the top, right-hand side of the screen</span> will display the time available for you to complete the examination. When the timer reaches zero, the examination will end automatically. You will not be required to end or submit your examination.
          </li>
          <li>
            The Question Palette displayed on the right-hand side of the screen will show the status of each question using one of the following symbols:
            <div className="mt-3 flex ">
              <div className="">
                <img src={number} alt="" className="h-28" />
              </div>
              <div className="">
              <div className="flex items-center ">
                {/* <div className="w-4 h-4 flex items-center justify-center bg-[#e7e7e7] text-[#333333] text-xs font-medium rounded-full mr-2">1</div> */}
                <span>This question has not been visited yet.</span>
              </div>
              <div className="flex items-center mt-[3px]">
                {/* <div className="w-4 h-4 flex items-center justify-center bg-[#f8c8c8] text-[#d9534f] text-xs font-medium rounded-full mr-2">2</div> */}
                <span>This question has been visited, but not answered.</span>
              </div>
              <div className="flex items-center mt-[3px]">
                {/* <div className="w-4 h-4 flex items-center justify-center bg-[#c8f8c8] text-[#5cb85c] text-xs font-medium rounded-full mr-2">3</div> */}
                <span>This question has been answered and will be considered for evaluation.</span>
              </div>
              <div className="flex items-center mt-[5px]">
                {/* <div className="w-4 h-4 flex items-center justify-center bg-[#d8c8f8] text-[#6f42c1] text-xs font-medium rounded-full mr-2">4</div> */}
                <span>This question has been marked for review and has not been answered.</span>
              </div>
              <div className="flex items-center mt-[3px]">
                {/* <div className="w-4 h-4 flex items-center justify-center bg-[#fff0c2] text-[#f0ad4e] text-xs font-medium rounded-full mr-2">5</div> */}
                <span>This question has been answered and marked for review, which will be considered for evaluation.</span>
              </div>
              </div>

            </div>
            <p className="mt-3 text-sm text-[#333333]">
              The Marked for Review status for a question simply indicates that you would like to look at that question again. <span className="font-medium text-[#DC2626]">If a question is answered and Marked for Review, your answer for that question will be considered in the evaluation.</span>
            </p>
          </li>
          <li>
            To answer a question, do the following:
            <ul className="list-[lower-alpha] pl-5 space-y-1 mt-2">
              <li>
                Click on the question number in the Question Palette to go to that question directly.
              </li>
              <li>
                Click on Save and Next to save your answer for the current question and then go to the next question.
              </li>
              <li>
                Click on Mark for Review and Next to save your answer for the current question, mark it for review, and then go to the next question.
              </li>
              <li className="text-[#DC2626] font-medium">
                Caution: Note that your answer for the current question will not be saved, if you navigate to another question directly by clicking on its question number.
              </li>
            </ul>
          </li>
        </ol>
        <div className="flex justify-end mt-4">
          <button className="bg-[#5A5FBC] text-white px-5 py-1.5 text-sm rounded hover:bg-[##5A5FBC]" onClick={handleClick}>
            Start Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockTestInstructions;
