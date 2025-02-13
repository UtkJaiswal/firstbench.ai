import React from "react";

const debateQuestions = async (req, res) => {
  try {
    const response = await axios.post(
      "https://firstbench-ai-node.onrender.com/debate/generateQuestion/",
      debateData,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNzI4NjQwMTExLCJleHAiOjE3Mjk2NDAxMTF9._mjnpoMsUE_E04dolOY7V7Vpu2NKnWAoaFOgYSIDC-k",
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Success:", response.data);
  } catch (error) {
    console.error(
      "Error:",
      error.response ? error.response.data : error.message
    );
  }
};

export default debateQuestions;
