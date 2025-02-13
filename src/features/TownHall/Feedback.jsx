import React from 'react';

function FeedbackModal({ isOpen, onClose, deduction,explanation }) {

  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative max-h-[80vh] overflow-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-[#1D2633] justify-between mx-auto">Detailed Feedback</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">
                &times; {/* Cross mark */}
              </button>
            </div>

            {/* Modal Content */}
            <div className="space-y-6 mt-4">
              {/* Section 1 */}
              <div className="border rounded-lg p-4 bg-[#E3E1F5]">
                <button className="text-left w-full">
                  <h3 className="text-xl font-semibold text-[#494C93]">
                    Reason for Deduction
                  </h3>
                </button>
                <div className="mt-2 space-y-2 text-gray-600">
                <h4 className="text-md font-semibold"><ul><li>What was deducted?</li></ul></h4>
                  <p>{explanation.what[0]}</p>
                  <p><strong>Why it was deducted?</strong></p>
                  <p>{explanation.why[0]}</p>
                  <div><p><strong>Impact</strong></p></div>
                  <p>{explanation.impact[0]}</p>

                </div>
              </div>

              {/* Section 2 */}
              <div className="border rounded-lg p-4 bg-[#E3E1F5]">
                <button className="text-left w-full">
                  <h3 className="text-lg font-semibold text-[#494C93]">
                    Approach to Overcome
                  </h3>
                </button>
                <div className="mt-2 space-y-2 text-gray-600">
                  <p><strong>Method:</strong> Lorem ipsum...</p>
                  <p><strong>Steps:</strong> STEP 1 - Lorem ipsum...</p>
                  <p><strong>Framework:</strong> Lorem ipsum...</p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="border rounded-lg p-4 bg-[#E3E1F5]">
                <button className="text-left w-full">
                  <h3 className="text-lg font-semibold text-[#494C93]">
                    Example
                  </h3>
                </button>
                <div className="mt-2 space-y-2 text-gray-600">
                  <p><strong>Corrected Argument:</strong> Lorem ipsum...</p>
                  <p><strong>Demonstration:</strong> Lorem ipsum...</p>
                  <p><strong>Related Example:</strong> Lorem ipsum...</p>
                </div>
              </div>

              {/* Section 4 */}
              <div className="border rounded-lg p-4 bg-[#E3E1F5]">
                <button className="text-left w-full">
                  <h3 className="text-lg font-semibold text-[#494C93]">
                    Suggestions
                  </h3>
                </button>
                <div className="mt-2 space-y-2 text-gray-600">
                  <p><strong>Skill Improvement:</strong> 1. Lorem ipsum...</p>
                  <p><strong>Resources:</strong> Lorem ipsum...</p>
                  <p><strong>Tips:</strong> Lorem ipsum...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackModal;
