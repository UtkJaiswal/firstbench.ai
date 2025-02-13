import React, {useEffect} from "react";
import beta_img from "../../assets/beta.svg";

const BetaPage = () => {
  useEffect(() => {
    // Check if script already exists
    if (!document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
      const script = document.createElement("script");
      script.src = "https://elevenlabs.io/convai-widget/index.js";
      script.async = true;
      script.type = "text/javascript";
      document.body.appendChild(script);
    }
  }, []);
  return (
    <div className="h-[90.5vh] w-full pt-28 m-0 overflow-hidden bg-gray-50 relative">
      {/* Main Content Section */}
      <div className="max-w-7xl w-full mx-auto px-4 flex flex-wrap items-center justify-around space-x-8">
        {/* Text Content */}
        <div className="w-[26rem]">
          <p className="text-gray-500 uppercase tracking-widest mb-4">
            Beta Soon
          </p>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Ready to unlock the full potential?
          </h1>
          <p className="text-gray-600 mb-6">
            Be the first to try our new feature! 🎉 Subscribe to the beta
            version and give us your feedback to make it even better. Sign up
            now for early access! 🎉
          </p>
        </div>

        {/* Image */}
        <div className="hidden md:block h-[14rem] w-[25rem]">
          <img
            src={beta_img}
            alt="Beta Subscription Illustration"
            className="max-w-full"
          />
        </div>
      </div>

      {/* Input with Button - Separated */}
      <div className="max-w-7xl flex mx-auto px-24">
        <div className="relative w-full max-w-[600px] ">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.94 6.94a1.5 1.5 0 012.12 0L10 11.88l4.94-4.94a1.5 1.5 0 112.12 2.12l-5.65 5.65a1.5 1.5 0 01-2.12 0l-5.65-5.65a1.5 1.5 0 010-2.12z" />
            </svg>
          </span>
          <input
            type="email"
            className="w-full h-16 pl-10 pr-[6rem] py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="youremail123@gmail.com"
          />
          <button className="absolute inset-y-3 right-3 h-10 bg-[#5A5FBC] text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition">
            Subscribe
          </button>
        </div>
      </div>

      {/* Background Circles */}
      <div className="flex justify-between">
        <div className="h-[64rem] w-[64rem] bg-[#D0CEF0] opacity-[80%] rounded-full z-10 -translate-x-[25em]"></div>
        <div className="h-[64rem] w-[64rem] bg-[#E3E1F5] opacity-[60%] rounded-full z-20 -translate-x-[45em] translate-y-28"></div>
      </div>
      <elevenlabs-convai agent-id="umdCXLg9IZq6ZvJMP8N1"></elevenlabs-convai>

    </div>
  );
};

export default BetaPage;
