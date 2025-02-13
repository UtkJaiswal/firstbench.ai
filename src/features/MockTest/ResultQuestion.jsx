import React from "react";
import vector from "../../assets/Vector.svg";
import vectorRight from "../../assets/VectorRight.svg";
const questions = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  status: ["correct", "incorrect", "unattempted"][Math.floor(Math.random() * 3)],
}));

const getStatusColor = (status) => {
  switch (status) {
    case "correct":
      return "border-t-green-500";
    case "incorrect":
      return "border-t-red-500";
    case "unattempted":
      return "border-t-gray-500";
    default:
      return "";
  }
};

const MockTestResult = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 p-6">
      {/* Left Sidebar */}
      <div className="w-1/4 bg-[#F7F6FC] p-6 rounded-lg shadow-md ml-6">
        <h2 className="text-xl font-bold text-purple">Your Result!</h2>
        <p className="text-gray-600">All your insights & details in one place</p>
        <div className="mt-4 p-4 bg-white rounded-lg">
        <div className="mt-4 p-4 bg-white rounded-lg">
          <div className="bg-purple rounded-lg px-2 w-2/3"><p className="text-white text-sm">YOU'VE PASSED</p></div>
          <p className="text-3xl font-bold">136 / 240</p>
          <p className="text-green-500 font-bold">76% Accuracy</p>
        </div>
        <div className="mt-4 p-4 bg-white rounded-lg">
          <p className="text-md font-bold">Top Score</p>
          <p className="text-3xl font-bold">230 / 240</p>
          <p className="text-blue-500 font-bold">92% Accuracy</p>
        </div>
        <button className="mt-4 w-full p-2 bg-purple text-white py-2 rounded-lg">Practice More</button>
        </div>

        <div className="mt-6 p-4 bg-white rounded-lg">
          <p className="font-bold">Revisit Paper</p>
          <p className="text-sm text-gray-500">Challenge your friends by sharing a link</p>
          <button className="mt-2 w-full bg-purple text-white py-2 rounded-lg">Visit</button>
        </div>
      </div>

      <div className="max-w-[900px] ml-12 bg- p-6 w-2/5 bg-[#F7F6FC] rounded-lg mr-12 border-2">
        <div className="rounded-lg border-2 mx-6 bg-white"><div className="text-xl font-bold p-1 text-gray-700 bg-[#F2F3F5]">Questions</div>
        <div className="grid grid-cols-4 gap-y-4 mt-4 p-9 m-6">
          {questions.map((q) => (
            <div key={q.id} className={`w-16 h-16 text-xl flex items-center justify-center border-4 bg-[#E3E1F5] ${getStatusColor(q.status)} rounded-md shadow-md text-lg font-bold text-gray-700`}>Q{q.id}</div>
          ))}
        </div>
        
      <div className="flex justify-between gap-x-4 p-6">
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
        <p className="w-2/3 bg-[#8385D6] h-full rounded-full">
          <img src={vectorRight} alt="" className="p-3" />
        </p>
      </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default MockTestResult;
