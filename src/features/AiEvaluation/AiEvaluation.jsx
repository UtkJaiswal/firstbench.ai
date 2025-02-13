import { useState } from "react";
import { useNavigate } from "react-router-dom";
import person from "../../assets/personspeaking.svg";

export default function AiEvaluation() {
  const [openIndex, setOpenIndex] = useState(null);
  const navigate = useNavigate();

  const features = [
    {
      number: "1",
      title: "Upload Your Answers",
      description:
        "Submit and test your answers in AI-based evaluation environment.",
    },
    {
      number: "2",
      title: "Rearrange Your Answers",
      description:
        "Organize your uploaded answers in the correct sequence for proper evaluation.",
    },
    {
      number: "3",
      title: "Get Instant Feedback",
      description:
        "Get detailed feedback to identify strengths and areas for improvement.",
    },
  ];

  const faqs = [
    {
      question: "How does AI evaluate my practice feedback?",
      answer:
        "Our AI system analyzes your answers based on multiple parameters including content relevance, structure, and presentation to provide comprehensive feedback.",
    },
    {
      question: "Can I upload handwritten answers?",
      answer:
        "Yes, you can upload clear images of your handwritten answers. Our system can process both typed and handwritten responses.",
    },
    {
      question: "What kind of topics are covered by the AI evaluation?",
      answer:
        "The AI evaluation covers all major UPSC subjects and topics, including General Studies, Optional Subjects, and Essay writing.",
    },
  ];

  const handleStartEvaluation = () => {
    navigate("/ai_evaluation/drag-and-drop");
  };

  return (
    <div className="min-h-screen bg-white max-w-[74rem] mx-auto">
      <div className="container mx-auto mt-8 pl-4 pt-12 flex justify-between border rounded-lg">
        <div className="max-w-full">
          <h1 className="text-xl font-bold mb-3">
            Sharpen Your UPSC Preparation with AI Evaluations Insights
          </h1>
          <p className="text-gray-600 mb-4">
            Get personalized feedback. Check your progress by 7-level feedback
            designed to help you excel in exam-day.
          </p>
          <button
            className="bg-[#5A5FBC] text-white px-6 py-2 rounded-md hover:bg-indigo-700"
            onClick={handleStartEvaluation}
          >
            Start Evaluation
          </button>
        </div>
        <div className="hidden md:block">
          <img src={person} alt="Study Illustration" className="w-52" />
        </div>
      </div>

      <div className="py-12">
        <div className="container mx-auto ">
          <h2 className="text-2xl font-bold mb-8 text-center">
            How does AI Evaluation work?
          </h2>
          <div className="gap-8 flex flex-row items-center justify-center text-center">
            {features.map((feature) => (
              <div
                key={feature.number}
                className="max-w-[380px] flex flex-col bg-[#E3E1F5] items-center justify-center text-center p-6 rounded-lg shadow-sm border"
              >
                <div className="w-8 h-8  bg-[#5A5FBC] text-white rounded-full flex items-center justify-center mb-4">
                  {feature.number}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="relative aspect-video rounded-xl flex items-center justify-center border shadow-lg max-h-96 w-full">
          <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-[#5A5FBC]"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          </button>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Frequently asked questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg">
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-[#5A5FBC]">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
