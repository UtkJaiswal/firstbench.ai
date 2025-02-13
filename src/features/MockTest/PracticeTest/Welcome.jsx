import React from "react";
import rightarrow from "../../../assets/rightarrow.svg";
import townhallround from "../../../assets/townhallround.svg";
import goal from "../../../assets/goal.svg";
import { ReactComponent as FirstguruIcon } from "../../../assets/firstguru.svg";
import { ReactComponent as TownhallIcon } from "../../../assets/townhallround.svg";

const Welcome = () => {
  return (
    <div className="px-32">
      <div className="mx-auto my-5 text-xl font-semibold flex flex-col items-center space-y-4 md:flex-row justify-between">
        Welcome, John👋
        <div className="flex space-y-4 md:flex-row  space-x-4 items-center">
          <div className="flex space-x-4">
            <button className="flex items-center justify-center bg-purple text-white text-base p-2 rounded">
              Customise your test
            </button>
          </div>
        </div>
      </div>

      <div className="flex from-white to-[#D2F7F599] bg-gradient-to-r h-50 my-10 px-10 py-5 border border-grey-300 rounded justify-between">
        <div class=" ">
          <div>Your countdown to success</div>

          <p class="text-lg font-semibold my-2">
            <span class="text-teal">183 days</span> until your exam
          </p>

          <div class="flex flex-row space-x-20 my-6">
            <div class="flex lg:flex-row">
              <TownhallIcon src={townhallround} alt="townhall icon" />
              <div className="flex flex-col px-4">
                Mocktest attempted
                <div className="font-semibold">4/10</div>
              </div>
            </div>

            <div className="border-l-2 border-gray-300 h-8 mx-4"></div>

            <div class="flex flex-row">
              <img src={goal} alt="goal icon" />
              <div className="flex flex-col px-4">
                Goal Progress
                <div className="font-semibold text-red-600">
                  Behind the Schedule
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-4  justify-center">
          <p className="flex justify-start">Today's Current Affair</p>
          <p>
            You can't cross the sea merely by standing and staring at the water
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
