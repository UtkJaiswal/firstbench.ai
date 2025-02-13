import React from "react";
import rightarrow from "../assets/rightarrow.svg";
import townhallround from "../assets/townhallround.svg";
import goal from "../assets/goal.svg";
import { ReactComponent as FirstguruIcon } from "../assets/firstguru.svg";
import { ReactComponent as TownhallIcon } from "../assets/townhallround.svg";

const Profile = () => {
  return (
    <>
      <div className="container mx-auto my-10 text-xl font-semibold flex flex-col items-center space-y-4 md:flex-row justify-between">
        Welcome, John
        <div className="flex space-y-4 md:flex-row space-y-0 space-x-4 items-center">
          <div className="flex space-x-4">
            <button className="flex items-center justify-center border-dashed border-2 border-purple text-base rounded text-purple p-2">
              <FirstguruIcon style={{ color: "#5A5FBC" }} />
              <span className="ml-2">Latest Updates on</span>
            </button>

            <button className="flex items-center justify-center bg-purple text-white text-base p-2 rounded">
              Ask FirstGuru
              <span className="ml-2">
                <img src={rightarrow} alt="right arrow" />
              </span>
            </button>
          </div>
        </div>
      </div>

      <div class="container mx-auto bg-gradient-to-r from-white to-[#D2F7F599] rounded h-50 my-10 px-10 py-10 border border-grey-300">
        <div>Your countdown to success</div>

        <p class="text-lg font-semibold my-2">
          <span class="text-teal">183 days</span> until your exam
        </p>

        <div class="flex flex-row space-x-20 my-6">
          <div class="flex lg:flex-row">
            <TownhallIcon src={townhallround} alt="townhall icon" />
            <div className="flex flex-col px-4">
              TownHalls attended
              <div className="font-semibold">4/10</div>
            </div>
          </div>

          <div className="border-l-2 border-gray-300 h-8 mx-4"></div>

          <div class="flex flex-row">
            <img src={goal} alt="goal icon" />
            <div className="flex flex-col px-4">
              Goal Progress
              <div className="font-semibold">Behind the Schedule</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
