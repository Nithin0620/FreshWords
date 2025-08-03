/* global chrome */

import React, { useEffect, useState } from "react";
import { useHandlingStore } from "../store/Handling";
import { FaStar, FaRegStar } from "react-icons/fa";

const MainUI = ({ dark }) => {
   const [input, setInput] = useState("");
   const [output, setOutput] = useState(null);
   const [recentLoading, setRecentLoading] = useState(false);
   const [handlingLoading, setHandlingLoading] = useState(false);
   const [recentHistoryData, setRecentHistoryData] = useState(null);
   const [clearHistoryLoading, setClearHistoryLoading] = useState(false);
   const [isChanged, setIsChanged] = useState(false);

   const {
      recentHistory,
      isFavorite,
      summarizeText,
      humanizeText,
      simplifyText,
      clearHistory,
   } = useHandlingStore();

   const handleIsFavoriteClick = async (Id) => {
      await isFavorite(Id);
      setIsChanged(true);
      const recentResponse = await recentHistory();
      setRecentHistoryData(recentResponse);
   };

   useEffect(() => {
      if (typeof chrome !== "undefined" && chrome.storage && chrome.storage.local) {
         chrome.storage.local.get(['selectedText'], (result) => {
         if (result.selectedText) {
         setInput(result.selectedText)
         }})
      }
      setIsChanged(false);
      const recentCall = async () => {
         const recentResponse = await recentHistory();
         setRecentHistoryData(recentResponse);
      };
      recentCall();
   }, [isChanged]);

   const handleFunctionality = async (param) => {
      setHandlingLoading(true);
      let response = null;
      switch (param) {
         case "summarize":
            response = await summarizeText({ content: input });
            break;
         case "humanize":
            response = await humanizeText({ content: input });
            break;
         case "simplify":
            response = await simplifyText({ content: input });
            break;
         default:
            break;
      }
      chrome.storage.local.clear();
      setIsChanged(true);
      if (response?.outputText) setOutput(response.outputText);
      setHandlingLoading(false);
   };

   const handleClearHistory = async () => {
      setClearHistoryLoading(true);
      await clearHistory();
      setIsChanged(true);
      const recentResponse = await recentHistory();
      setRecentHistoryData(recentResponse);
      setClearHistoryLoading(false);
   };

   return (
      <div
         className={`w-[360px] h-[600px] p-4 shadow-lg overflow-y-auto font-sans ${
            dark ? "bg-[#1B121A] text-white" : "bg-[#EFE5CB] text-black"
         }`}
      >

         <h2
            className={`text-lg font-semibold mb-4 text-center drop-shadow ${
               dark ? "text-white" : "text-gray-700"
            }`}
         >
            Welcome back, user
         </h2>

         <div className="mb-4">
            <label className="block mb-1 text-sm font-medium drop-shadow-sm">
               User Input
            </label>
            <input
               type="text"
               placeholder="Enter/paste your text here..."
               value={input}
               onChange={(e) => setInput(e.target.value)}
               className={`w-full p-2 rounded border bg-transparent border-blue-300 text-sm ${
                  dark
                     ? "bg-[#2b1f27] border-gray-600 placeholder-gray-400"
                     : "bg-white border-gray-300 placeholder-gray-600"
               }`}
            />
         </div>

         <div className="grid grid-cols-2 gap-2 mb-2">
            <button
               onClick={() => handleFunctionality("summarize")}
               className={`py-2 rounded text-sm font-medium shadow ${
                  dark
                     ? "bg-[#352530] hover:bg-[#4a3a42]"
                     : "bg-[#d6c9ad] hover:bg-[#c8ba9a]"
               }`}
            >
               Summarize
            </button>
            <button
               onClick={() => handleFunctionality("humanize")}
               className={`py-2 rounded text-sm font-medium shadow ${
                  dark
                     ? "bg-[#352530] hover:bg-[#4a3a42]"
                     : "bg-[#d6c9ad] hover:bg-[#c8ba9a]"
               }`}
            >
               Humanize
            </button>
         </div>

         <div className="mb-4">
            <button
               onClick={() => handleFunctionality("simplify")}
               className={`w-full py-2 rounded text-sm font-medium shadow ${
                  dark
                     ? "bg-[#352530] hover:bg-[#4a3a42]"
                     : "bg-[#d6c9ad] hover:bg-[#c8ba9a]"
               }`}
            >
               Simplify
            </button>
         </div>

         {handlingLoading ? (
            <div className="text-yellow-400">Processing...</div>
         ) : (
            output && (
               <div className="mb-4 transition-all duration-300 ease-in-out">
                  <label className="block mb-1 text-sm font-medium drop-shadow-sm">
                     AI Output
                  </label>
                  <textarea
                     value={output}
                     readOnly
                     className={`w-full p-2 rounded min-h-[100px] border  bg-transparent border-blue-300 outline-none text-sm resize-none ${
                        dark
                           ? "bg-[#2b1f27] border-gray-600 placeholder-gray-400"
                           : "bg-white border-gray-300 placeholder-gray-600"
                     }`}
                  />
               </div>
            )
         )}

         <div className="mb-2 font-medium text-sm">Recent Requests</div>
         <div className="min-h-[100px] border border-gray-500 rounded p-2 text-xs italic opacity-70 space-y-2">
            {recentLoading ? (
               <div>Loading ...</div>
            ) : recentHistoryData?.length > 0 ? (
               recentHistoryData.map((history) => (
                  <div
                     key={history._id}
                     className="border-b border-slate-600 flex justify-between items-start pb-2"
                  >
                     <div className="font-bold text-emerald-500 pr-2">
                        {history.method}
                     </div>
                     <div className="flex-1 text-wrap">
                        <p>
                           <span className="font-bold text-xs">Input:</span>{" "}
                           {history.originalText.length > 20
                              ? `${history.originalText.substring(0, 20)}...`
                              : history.originalText}
                        </p>
                        <p>
                           <span className="font-bold text-xs">Output:</span>{" "}
                           {history.outputText.length > 20
                              ? `${history.outputText.substring(0, 20)}...`
                              : history.outputText}
                        </p>
                     </div>
                     <div
                        onClick={() => handleIsFavoriteClick(history._id)}
                        className="text-yellow-500 cursor-pointer pl-2"
                     >
                        {history.isFavorite ? <FaStar /> : <FaRegStar />}
                     </div>
                  </div>
               ))
            ) : (
               <div>No Recent History</div>
            )}
         </div>

         <div className="mt-4 text-center">
            <button
               onClick={handleClearHistory}
               disabled={clearHistoryLoading}
               className={`px-4 py-2 text-xs font-semibold rounded ${
                  dark
                     ? "bg-red-800 hover:bg-red-700"
                     : "bg-red-300 hover:bg-red-400"
               } ${clearHistoryLoading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
               {clearHistoryLoading ? "Clearing..." : "Clear History"}
            </button>
         </div>
      </div>
   );
};

export default MainUI;
