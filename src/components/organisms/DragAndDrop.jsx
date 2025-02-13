import React, { useState, useCallback } from "react";
import { Upload, Clock, AlertCircle, X } from "lucide-react";
import PdfIcon from "../../assets/pdf-icon.svg";
import DocxIcon from "../../assets/docs-icon.svg";
import JpgIcon from "../../assets/jpg-icon.svg";
import ImportIcon from "../../assets/import-icon.svg";
import { useNavigate } from "react-router-dom";

const DragAndDrop = () => {
  const navigate = useNavigate();

  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");

  const handleAlertClick = () => {
    navigate("/ai_evaluation/drag-and-drop/aievaluationguide");
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(selectedFiles);
    }
  }, []);

  const getFileIcon = (type, file) => {
    switch (type) {
      case "application/pdf":
        return <img src={PdfIcon} alt="PDF Icon" className="w-10 h-10" />;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/msword":
        return <img src={DocxIcon} alt="DOCX Icon" className="w-10 h-10" />;
      case "image/jpeg":
      case "image/png":
        return <img src={JpgIcon} className="w-10 h-10 cursor-pointer" />;
      default:
        return (
          <div className="bg-gray-500 text-white text-xs px-2 py-0.5 rounded">
            FILE
          </div>
        );
    }
  };

  const handleRemoveFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleQuestionSubmit = () => {
    console.log("User question:", userQuestion);
    toggleModal();
  };

  const formatFileSize = (size) => {
    return (size / (1024 * 1024)).toFixed(2) + " MB";
  };

  const handleSubmit = () => {
    if (files.length > 0) {
      // Navigate to /ai_evaluation/photos and transfer the files as state
      navigate("/ai_evaluation/photos", { state: { files } });
    } else {
      alert("Please select at least one file to submit.");
    }
  };

  return (
    <>
      <div className="container max-w-[74rem] mx-auto bg-gradient-to-r from-white to-[#D2F7F599] rounded-lg h-[140px] mt-10 mb-5 px-10 py-10 border border-gray-300 flex items-center justify-between">
        <div>
          <div className="flex items-center">
            <h1 className="text-4xl font-semibold text-[#009688] mr-2">
              Hello
            </h1>
            <h1 className="text-4xl font-semibold text-gray-800 mr-0">Parth</h1>
            <span className="text-4xl">👋</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">Your progress to success</p>
        </div>
        <div className="flex items-center text-right text-gray-600">
          <p className="text-base">
            Always stay updated with your evaluations and progress on
            FirstBench!
          </p>
        </div>
      </div>

      <div className="container max-w-[32rem] mx-auto">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-300">
          <div className="mb-4 flex items-center gap-2">
            <Upload className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-medium text-gray-700">
              Essay Submission
            </h3>
            <Clock className="w-5 h-5 text-gray-400 ml-auto" />
          </div>

          <div
            className={`relative mt-1 rounded-lg border-2 border-dashed ${
              isDragging ? "border-[#5A5FBC]" : "border-[#E2E8F0]"
            } bg-[#F2F3F5] p-3 transition-all duration-200 ease-in-out`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="text-center">
              <img
                src={ImportIcon}
                alt="import_icon"
                className="h-14 w-14 mx-auto"
              />
              <div>
                <p className="text-sm text-gray-600">
                  Drag your file(s) or{" "}
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer text-indigo-600 hover:text-indigo-700"
                  >
                    <span>browse</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileSelect}
                      multiple
                    />
                  </label>
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  JPEG, PDF, and DOCX formats, up to 15MB
                </p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      {getFileIcon(file.type, file)}
                      <span className="text-gray-800">{file.name}</span>
                    </div>
                    <span className="text-xs text-gray-500 ml-auto">
                      {formatFileSize(file.size)}
                    </span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="ml-2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300"
                onChange={toggleModal}
                disabled={files.length > 0}
              />
              <span className="text-sm text-gray-600">
                Submitting without the questions
              </span>
            </label>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={handleSubmit}
              className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200 mx-auto block"
            >
              {files.length > 0 ? "Submit" : "Choose file"}
            </button>
          </div>

          <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
            <button onClick={handleAlertClick}>
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-500 hover:text-gray-700" />
            </button>
            <p>
              Instructions for how to submit and guidelines can be found
              <span className="text-indigo-600 hover:text-indigo-700 cursor-pointer">
                here.
              </span>
            </p>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[70%]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Submit Your Question
            </h2>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-2 text-gray-700"
              value={userQuestion}
              onChange={(e) => setUserQuestion(e.target.value)}
              placeholder="Type your question here"
            />
            <div className="flex justify-end mt-4">
              <button
                onClick={handleQuestionSubmit}
                className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700"
              >
                Submit Question
              </button>
              <button
                onClick={toggleModal}
                className="ml-4 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DragAndDrop;
