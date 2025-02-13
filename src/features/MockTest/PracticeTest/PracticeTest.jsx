import React from "react";
import Welcome from "./Welcome";
import CustomizeTest from "./CustomizeTest";
import AreYouPrepared from "./AreYouPrepared";
import UPSCPrelimsAndMains from "./UPSCPrelimsAndMains";
const PracticeTest = () => {
  return (
    <div>
      <Welcome />

      <div className="min-h-screen px-6">
        <div className="flex justify-start space-x-4 px-24">
          <div className="p-2 text-[#C5C9CF] text-[24px] font-[600] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2 8H5L6 4L8.66667 12L10 6L11 8H14"
                stroke="#626875"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
           <p className="ms-4"> Mock Test</p>
          </div>
          <div className="p-2 text-[#5A5FBC] text-[24px] font-[600] flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M8 4.66667V8L10 10M2 8C2 8.78793 2.15519 9.56815 2.45672 10.2961C2.75825 11.0241 3.20021 11.6855 3.75736 12.2426C4.31451 12.7998 4.97595 13.2417 5.7039 13.5433C6.43185 13.8448 7.21207 14 8 14C8.78793 14 9.56815 13.8448 10.2961 13.5433C11.0241 13.2417 11.6855 12.7998 12.2426 12.2426C12.7998 11.6855 13.2417 11.0241 13.5433 10.2961C13.8448 9.56815 14 8.78793 14 8C14 6.4087 13.3679 4.88258 12.2426 3.75736C11.1174 2.63214 9.5913 2 8 2C6.4087 2 4.88258 2.63214 3.75736 3.75736C2.63214 4.88258 2 6.4087 2 8Z"
                stroke="#5A5FBC"
                stroke-width="1.25"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="ms-4">Practice Test</p>
          </div>
        </div>
        <div className="h-[1px] bg-[#C5C9CF] px-24 my-2 w-[86%] mx-auto"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Customise Your Test */}
          <div className="lg:col-span-4">
            <CustomizeTest />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-8 space-y-6">
            {/* Are You Prepared Section */}
            <AreYouPrepared />

            {/* UPSC Prelims & Mains Section */}
            <UPSCPrelimsAndMains />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeTest;
