import React, { useState } from "react";
import { useAppContext } from "./../../../../LocalStorage.js";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";

function Preview({ setMethod }) {
  const [showModal, setShowModal] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);
  const { questions, setQuestions } = useAppContext();

  const handleEditQuestion = (index) => {
    const questionToEdit = questions[index];
    setQuestionText(questionToEdit.question);
    setOptions(questionToEdit.options);
    setCorrectOptionIndex(
      questionToEdit.options.indexOf(questionToEdit.correctOption)
    );
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleSaveQuestion = () => {
    const updatedQuestions = [...questions];
    updatedQuestions[editingIndex] = {
      question: questionText,
      options,
      correctOption: options[correctOptionIndex],
    };
    setQuestions(updatedQuestions);
    setShowModal(false);
  };

  const handleDeleteQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const confirm = () => {
    setMethod(8);
  };

  return (
    <div className="bg-purple-50 flex flex-col min-h-screen items-center">
      <h1 className="text-3xl font-semibold p-10">Questions Preview</h1>
      <div className="w-2/3">
        {questions.map((q, index) => (
          <li
            key={index}
            className="mb-4 flex flex-col bg-purple-100 rounded-md p-4 transition-transform transform hover:scale-105 cursor-pointer"
          >
            <span className="text-purple-700 font-semibold">{q.question}</span>
            <div className="mt-2">
              {q.options.map((option, optIndex) => (
                <div key={optIndex} className="flex items-center">
                  <span className="mr-2">
                    {optIndex === q.options.indexOf(q.correctOption)
                      ? "✔️"
                      : "⚪"}
                  </span>
                  <span>{option}</span>
                </div>
              ))}
            </div>
            <span className="mt-2 text-green-500 font-medium">
              Correct: {q.correctOption}
            </span>
            <div className="flex space-x-4 mt-2 w-full justify-end">
              <button
                onClick={() => handleEditQuestion(index)}
                className="text-blue-600 hover:underline flex items-center pr-5"
              >
                <EditIcon className="mr-1 hover:scale-110" fontSize="medium" />
              </button>
              <button
                onClick={() => handleDeleteQuestion(index)}
                className="text-red-600 hover:underline flex items-center pr-10"
              >
                <DeleteIcon
                  className="mr-1 hover:scale-110"
                  fontSize="medium"
                />
              </button>
            </div>
          </li>
        ))}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-2/3">
            <h2 className="text-xl font-semibold mb-4">Edit Question</h2>
            <div className="mb-4">
              <label className="block font-medium mb-1">Question:</label>
              <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-1">Options:</label>
              {options.map((option, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const updatedOptions = [...options];
                      updatedOptions[index] = e.target.value;
                      setOptions(updatedOptions);
                    }}
                    className="flex-grow border rounded p-2 mr-2"
                  />
                  <input
                    type="radio"
                    name="correctOption"
                    checked={correctOptionIndex === index}
                    onChange={() => setCorrectOptionIndex(index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveQuestion}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-2/3 flex relative mb-40 mt-6">
        <button
          onClick={confirm}
          className="bg-green-500 absolute right-10 text-center font-semibold flex flex-row text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-300  "
        >
          <h3>Continue</h3>
          <SendIcon className="ml-3" />
        </button>
      </div>
    </div>
  );
}

export default Preview;
