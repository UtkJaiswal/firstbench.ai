import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, useSortable, arrayMove, rectSortingStrategy } from "@dnd-kit/sortable";
import { FaPlus, FaTrash, FaInfoCircle } from "react-icons/fa";
import {CSS} from "@dnd-kit/utilities";
import axios from "axios";

const PhotoGallery = () => {

  const location = useLocation();
  const { files = [] } = location.state || {}; 
  console.log("Photos",files)
  const [fileState, setFileState] = useState([]);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initialFileState = [];
    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        initialFileState.push({
          id: `${index + 1}`,
          url: reader.result, 
          selected: false,
        });
        if (initialFileState.length === files.length) {
          setFileState(initialFileState);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [files]);
  
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setFileState((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const togglePhotoSelection = (fileId) => {
    setFileState((prevFiles) =>
      prevFiles.map((file) =>
        file.id === fileId ? { ...file, selected: !file.selected } : file
      )
    );
  };

  const handleAddButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAddPhotos = (event) => {
    const newFiles = Array.from(event.target.files).filter((file) =>
      file.type.startsWith("image/")
    );

    const newFileState = [];
    newFiles.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        newFileState.push({
          id: `${fileState.length + index + 1}`,
          url: reader.result, 
          selected: false,
        });
        if (newFileState.length === newFiles.length) {
          setFileState((prevState) => [...prevState, ...newFileState]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleClearSelectedPhotos = () => {
    setFileState((prevFiles) => prevFiles.filter((file) => !file.selected));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    const urls = fileState.map(file => file.url);
    console.log(urls)
    const data = {
      formdata: [
        ...urls.map((url) => ({
          key: "images",
          type: "file",
          src: url,
        })),
        {
          key: "isQuestionSeparate",
          value: "1",
          type: "text",
        },
        {
          key: "question",
          value: "What is AI?",
          type: "text",
        },
      ],
    };

    // Loop through the `formdata` array and append to `FormData`
    data.formdata.forEach((item) => {
      if (item.type === "file") {
        const file = new File([item.src], "image.png", { type: "image/png" });
        formData.append(item.key, file);
      } else {
        formData.append(item.key, item.value);
      }
    });

    try {
      const response = await axios.post("http://98.80.226.91/evaluation/evaluate_answer",  formData, {
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzM0MTExMzA1LCJleHAiOjE3MzUxMTEzMDV9.NuVeTQv2tAfoRQsL90eaB4TTi-9EoekMw2_f6n7xZ08",
            "Content-Type": "application/json",
          },
        timeout: 90000, // Timeout in milliseconds (e.g., 10 seconds)
      });
      
  
      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data);
        //navigate("/ai_evaluation/evalDashboard"); // Navigate after successful submission
      } else {
        console.error("Error submitting files:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting files:", error);
    }
  };
  

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex w-3/4 h-3/4 border border-gray-300 rounded-lg p-2 flex-col">
        <div className="flex w-full h-3/4 rounded-lg p-8 flex-row">
          <div className="flex-1 pr-8 p-10 flex flex-col w-1/2 justify-center border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold">Selected Photos</h2>
            <p>Rearrange the sequence of files in the order you'd like them to be evaluated.</p>
            <div className="mt-4 flex items-center text-gray-600">
              <FaInfoCircle className="text-gray mr-2" />
              <span>If you want to be evaluated with the current order, simply submit.</span>
            </div>
            <div className="py-6 flex gap-4 my-18 mt-12">
              <button
                onClick={handleAddButtonClick}
                className="bg-purple text-white px-4 py-2 rounded-lg text-lg flex items-center gap-2"
              >
                <FaPlus /> Add
              </button>
              <button
                onClick={handleClearSelectedPhotos}
                className="bg-white text-red-600 border-2 border-red-600 px-4 py-2 rounded-lg text-lg flex items-center gap-2"
              >
                <FaTrash /> Trash
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col w-1/2 border border-gray-300 rounded-lg p-4">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={fileState} strategy={rectSortingStrategy}>
                <div
                  className="flex gap-4 flex-wrap p-1 overflow-y-auto"
                  style={{ height: "400px", width: "100%" }}
                >
                  {fileState.length > 0 ? (
                    fileState.map((file) => (
                      <SortablePhoto
                        key={file.id}
                        file={file}
                        togglePhotoSelection={togglePhotoSelection}
                        selected={file.selected}
                      />
                    ))
                  ) : (
                    <p>No image files uploaded</p>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </div>
        </div>

        <div className="flex flex-row justify-end pt-4 gap-2 p-2">
          <button
            onClick={() => console.log("Cancel action")}
            className="rounded-lg p-2 text-lg flex items-center border border-gray-400 text-gray-700 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="p-2 rounded-lg text-lg flex items-center bg-purple text-white hover:bg-purple-700"
          >
            Submit
          </button>
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAddPhotos}
        className="hidden"
        multiple
      />
    </div>
  );
};

const SortablePhoto = ({ file, togglePhotoSelection, selected }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({
    id: file.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    width: 100,
    height: 100,
    borderRadius: "8px",
    backgroundColor: "#f0f0f0",
    position: "relative",
    opacity: isDragging ? 0.9 : 1,
  };

  const handleClick = (e) => {
    e.stopPropagation();
    togglePhotoSelection(file.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={handleClick}
      className={`relative ${isDragging ? "cursor-grabbing" : "cursor-grab"}`}
    >
      <img
        src={file.url}
        alt={`File ${file.id}`}
        className="w-full h-full object-cover rounded-lg"
      />
      {selected && (
        <div className="absolute inset-0 bg-purple opacity-40 rounded-lg"></div>
      )}
    </div>
  );
};

export default PhotoGallery;
