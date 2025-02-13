import React from "react";
import { useNavigate } from "react-router-dom";


const EndTest = ({setShowEndTest}) => {

  const navigate = useNavigate();
  const handleClick=()=>
  {
     navigate('/mockfinal')
  }
  return (
    <div className="w-1/2 bg-[#F4F4F4] absolute top-[20%] left-[25%]" style={{border: "1px solid var(--Neutral-50, #F9FAFB)",borderRadius: "8px"

    }}>
      <h1 className="text-[#1E1E1E] text-center pt-10 pb-1 text-[32px] font-[700]">
        Want to end the test?
      </h1>
      <p className="text-[#969696] font-sm font-[500] text-center">
        You cannot change after submitting the test.
      </p>
      <div className="grid grid-cols-2 grid-rows-2 px-12 gap-y-5 gap-x-20 text-sm mt-6">
        <div className="px-8 flex items-center justify-center">
          <div
            className="bg-[#F9FAFB] py-4 px-16"
            style={{ borderRadius: "8px", border: "1px solid #E0E2E5" }}
          >
            <h1 className="text-[#9198A3] text-left">Total questions</h1>
            <p className="text-[#1D2633] font-sm ">100</p>
          </div>
        </div>
        <div className="px-8 flex items-center justify-center">
          <div
            className="bg-[#F9FAFB] py-4 px-16"
            style={{ borderRadius: "8px", border: "1px solid #E0E2E5" }}
          >
            <h1 className="text-[#9198A3]">Answered</h1>
            <p className="text-[#1D2633] font-sm">1</p>
          </div>
        </div>
        <div className="px-8 flex items-center justify-center">
          <div
            className="bg-[#F9FAFB] py-4 px-16"
            style={{ borderRadius: "8px", border: "1px solid #E0E2E5" }}
          >
            <h1 className="text-[#9198A3]">Not answered</h1>
            <p className="text-[#1D2633] font-sm">21</p>
          </div>
        </div>
        <div className="px-8 flex items-center justify-center">
          <div
            className="bg-[#F9FAFB] py-4 px-16"
            style={{ borderRadius: "8px", border: "1px solid #E0E2E5" }}
          >
            <h1 className="text-[#9198A3]">Not visited </h1>
            <p className="text-[#1D2633] font-sm">00</p>
          </div>
        </div>
      </div>

      {/* end */}
      <div className="flex p-12 justify-between mt-10">
        <div className="px-8 flex items-center justify-center">
          <button
            className="bg-[#F9FAFB] py-2 px-20"
            style={{ borderRadius: "8px", border: "1px solid #E0E2E5" }}
            onClick={() => setShowEndTest(false)}
          >
            Resume
          </button>
        </div>
        <div className="px-8 flex items-center justify-center">
          <button
            className="bg-[#5A5FBC] text-[#F9FAFB] py-2 px-20"
            style={{ borderRadius: "8px", border: "1px solid #5A5FBC" }}
            onClick={handleClick}
          >
            End Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndTest;
