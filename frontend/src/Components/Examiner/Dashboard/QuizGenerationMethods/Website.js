import React, { useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { getTextFromUrl } from "./../../../../API/Examiner";
import { generateQuestions } from "./../../../../API/Examiner";
import { useAppContext } from "../../../../LocalStorage";
function Website({ setMethod }) {
  const [url, setUrl] = useState("");
  const { setQuestions } = useAppContext();

  const handleGenerate = async () => {
    const res = await getTextFromUrl({ url: url });
    const text = res.data.mergedText;
    await handleSubmit(text);
  };

  const handleSubmit = async (text) => {
    const res = await generateQuestions({
      num_questions: "5",
      text: text,
      prompt: "",
    });
    if (res.status == 200) {
      setQuestions(res.data);
    }
    setMethod(7);
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <button
        className="text-purple-950 w-20 h-10 rounded-md transition-colors mt-10 ml-10 flex justify-center items-center opacity-70 hover:opacity-100"
        onClick={() => setMethod(0)}
      >
        <ArrowBackOutlinedIcon />
        <h1 className="ml-1 font-rubik font-bold">Back</h1>
      </button>
      <div className="flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-rubik font-bold flex items-center border-b-4 pb-4 w-2/3 border-purple-300 rounded">
          <span className="text-center w-full">
            Create Quizzes from Webpage Links
          </span>
        </h1>
        <h2 className="font-roboto font-semibold text-blue-950 text-center mb-6 w-2/3 p-8">
          Transform any website into an engaging quiz! Simply paste the link
          below, and our system will help you create interactive questions based
          on the content. Whether it's for educational purposes, training
          sessions, or just for fun, you can easily generate questions that
          capture key moments from the webpage. Make learning more interactive
          and engaging with quizzes that keep your audience interested
          throughout.
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6 w-1/2 flex items-center">
          <div className="w-full">
            <label
              htmlFor="website-search"
              className="mb-2 text-sm font-medium text-slate-100 sr-only dark:text-white"
            >
              Generate
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <LanguageOutlinedIcon style={{ color: "grey" }} />{" "}
              </div>
              <input
                type="text"
                id="website-search"
                className="block w-full p-4 pl-12 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                placeholder="Enter the website link"
                required
                onChange={(e) => setUrl(e.target.value)}
              />
              <button
                onClick={handleGenerate}
                className="text-white absolute right-2 bottom-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 bg-blue-900"
              >
                Generate
              </button>
            </div>
          </div>
        </div>
        <ul className="list-disc list-inside mt-6 w-2/3 p-6">
          {[
            "Paste the website link.",
            "Automatically generate questions based on webpage content or manually create your own.",
            "Customize your quiz by adding additional details, options, or images.",
            "Share your quiz with others and track their results in real-time!",
          ].map((step, index) => (
            <li
              key={index}
              className="mb-4 flex items-center p-2 bg-blue-50 rounded-md transition-transform transform hover:scale-105 cursor-pointer"
            >
              <span className="text-blue-600 mr-2">✔️</span>
              <span>{`Step ${index + 1}: ${step}`}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Website;
