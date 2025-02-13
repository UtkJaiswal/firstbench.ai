import { queries } from "@testing-library/react";
import React from "react";
import vector from "../../assets/Vector.svg";
import vectorRight from "../../assets/VectorRight.svg";
import EndTest from "./EndTest";


const Questions = () => {
  const [selectedOptions, setSelectedOptions] = React.useState({});
  const [showEndTest, setShowEndTest] = React.useState(false);
  const handleOnClick = () => {
    setShowEndTest(true);
  };
  const Card = ({ num }) => {
    return (
      <div className="card bg-[#ffffff] h-[184.627px] ">
        <p className="p-2">{num}</p>
      </div>
    );
  };
  const BigCard = ({ num }) => {
    return (
      <div className="card bg-[#ffffff] h-[293px] ">
        <p className="p-2">{num}</p>
      </div>
    );
  };

  const handleOptionChange = (quesNo, option) => {
    setSelectedOptions((prev) => ({
      ...prev, // Preserve previous selections
      [quesNo]: option, // Update only the current question
    }));
  };

  // const Answer = ({ quesNo, selectedOption }) => {
  //   return (
  //     <div className="flex bg-[#ffffff] mx-4 my-2 px-4 py-1">
  //       <div className="flex space-x-9">
  //       <div className="w-6">{quesNo}.</div>

  //         <label className="flex items-center">
  //           <input
  //             type="radio"
  //             name={`question-${quesNo}`}
  //             value="a"
  //             checked={selectedOption === 'a'}
  //             onChange={onOptionChange}
  //             className="hidden"
  //           />
  //           <div
  //             className={`p-1 text-xs px-2 rounded-[50%] cursor-pointer ${
  //               selectedOption === 'a' ? 'bg-[#5A5FBC] text-[#ffffff]' : 'bg-[#E6E6E6] text-[#666666]'
  //             }`}
  //           >
  //             a
  //           </div>
  //         </label>
  //         <label className="flex items-center">
  //           <input
  //             type="radio"
  //             name={`question-${quesNo}`}
  //             value="b"
  //             checked={selectedOption === 'b'}
  //             onChange={onOptionChange}
  //             className="hidden"
  //           />
  //           <div
  //             className={`p-1 text-xs px-2 rounded-[50%] cursor-pointer ${
  //               selectedOption === 'b' ? 'bg-[#5A5FBC] text-[#ffffff]' : 'bg-[#E6E6E6] text-[#666666]'
  //             }`}
  //           >
  //             b
  //           </div>
  //         </label>
  //         <label className="flex items-center">
  //           <input
  //             type="radio"
  //             name={`question-${quesNo}`}
  //             value="c"
  //             checked={selectedOption === 'c'}
  //             onChange={onOptionChange}
  //             className="hidden"
  //           />
  //           <div
  //             className={`p-1 text-xs px-2 rounded-[50%] cursor-pointer ${
  //               selectedOption === 'c' ? 'bg-[#5A5FBC] text-[#ffffff]' : 'bg-[#E6E6E6] text-[#666666]'
  //             }`}
  //           >
  //             c
  //           </div>
  //         </label>
  //         <label className="flex items-center">
  //           <input
  //             type="radio"
  //             name={`question-${quesNo}`}
  //             value="d"
  //             checked={selectedOption === 'd'}
  //             onChange={onOptionChange}
  //             className="hidden"
  //           />
  //           <div
  //             className={`p-1 text-xs px-2 rounded-[50%] cursor-pointer ${
  //               selectedOption === 'd' ? 'bg-[#5A5FBC] text-[#ffffff]' : 'bg-[#E6E6E6] text-[#666666]'
  //             }`}
  //           >
  //             d
  //           </div>
  //         </label>
  //       </div>
  //     </div>
  //   );
  // };
  const Answer = ({ quesNo, selectedOption, onOptionChange }) => {
    return (
      <div className="flex bg-[#ffffff] mx-4 my-2 px-4 py-1">
        <div className="flex space-x-9">
          <div className="w-6">{quesNo}.</div>

          {["a", "b", "c", "d"].map((option) => (
            <label key={option} className="flex items-center">
              <input
                type="radio"
                name={`question-${quesNo}`}
                value={option}
                checked={selectedOption === option}
                onChange={() => onOptionChange(quesNo, option)}
                className="hidden"
              />
              <div
                className={`p-1 text-xs px-2 rounded-[50%] cursor-pointer ${
                  selectedOption === option
                    ? "bg-[#5A5FBC] text-[#ffffff]"
                    : "bg-[#E6E6E6] text-[#666666]"
                }`}
              >
                {option}
              </div>
            </label>
          ))}
        </div>
      </div>
    );
  };

  const totalQuestions = 10;
  const totalcorrectQuestions = Object.keys(selectedOptions).length;
  const percentage = (totalcorrectQuestions / totalQuestions) * 100;

  const quesList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <>
      {showEndTest && <EndTest setShowEndTest={setShowEndTest} />}
      <div className="w-[1140.53px] mx-auto my-10 h-[699.07px] bg-[#FFFFFF] border-[1px] border-[#E0E2E5] rounded-[24.58px]">
        {/* top */}
        <div className="flex justify-between items-center px-14 py-8">
          <div className="">
            <h1 className="text-[#494949] font-[600] text-[18px]">
              GS Mock Tests
            </h1>
            <p className="text-[#8E8E8E] text-sm">Session 1</p>
          </div>
          <div className="">
            <div
              className="w-[319.061px] h-[11.267px] "
              style={{
                borderRadius: "20.998px",
                border: "0px solid #30C7C2",
                background: percentage === 0
                  ? "#E0E2E5" 
                  : percentage === 100
                  ? "#30C7C2" 
                  : `linear-gradient(to right, #30C7C2 ${percentage}%, #E0E2E5 ${percentage}%)`,
              }}
              
              
            ></div>
            <div className="text-[#4F4F4F] font-[600] text-base">
              {percentage}%
            </div>
          </div>
          <div className="flex items-center">
            <div className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
              >
                <circle cx="15.4196" cy="15.3229" r="15.108" fill="#D0CEF0" />
              </svg>
            </div>
            <div className="flex flex-col ml-3">
              <p className="text-[#DC2626] text-sm">00:00 Min</p>
              <p className="text-[#8E8E8E] text-xs">Time Left</p>
            </div>
          </div>
        </div>

        {/* middle */}
        <div className="w-full flex h-[454px] p-4 gap-4 bg-[#F9FAFB] px-2">
          <div
            className="w-[68%] h-[427px] flex gap-4"
            style={{
              borderRadius: "2px",
              background: "var(--Purple-100, #E3E1F5)",
            }}
          >
            <div className="w-[45%]">
              <div className="grid grid-cols-2 p-4 gap-4">
                <Card num={1} />
                <Card num={2} />
                <Card num={3} />
                <Card num={4} />
              </div>
            </div>
            <div className="w-[45%]">
              <div className="grid grid-cols-1 p-4 gap-4 my-10">
                <BigCard num={2} className="" />
              </div>
            </div>
          </div>
          <div className="w-[1px]"></div>
          <div
            className="w-[29%] h-[427px]"
            style={{
              borderRadius: "2px",
              background: "var(--Purple-100, #E3E1F5)",
            }}
          >
            <div className="">
              {quesList.map((quesNo) => (
                <Answer
                  key={quesNo}
                  quesNo={quesNo}
                  selectedOption={selectedOptions[quesNo]}
                  onOptionChange={handleOptionChange}
                />
              ))}
            </div>
          </div>
        </div>

        {/* bottom */}
        <div className="w-full flex justify-center mt-10">
          <div className="flex justify-center gap-6 w-[80%]">
            <button
              className="flex justify-between gap-x-4 items-center text-[#626875] rounded-full "
              style={{ background: "var(--Purple-50, #F1F0FA)" }}
            >
              <p className="w-1/2 bg-[#8385D6] h-full rounded-full">
                <img src={vector} alt="" className="p-3" />
              </p>
              <p className="me-4 my-2">Previous</p>
            </button>
            <button
              className="flex gap-x-4 justify-between items-center text-[#626875] rounded-full "
              style={{ background: "var(--Purple-50, #F1F0FA)" }}
            >
              <p className="ms-4 my-2">Next</p>
              <p className="w-1/2 bg-[#8385D6] h-full rounded-full">
                <img src={vectorRight} alt="" className="p-3" />
              </p>
            </button>
          </div>
          <div className="flex justify-end w-[15%]">
            <button
              className="bg-[#5A5FBC] text-white rounded  px-4"
              onClick={handleOnClick}
            >
              Finish
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions