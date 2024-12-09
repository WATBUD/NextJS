import React, { useState } from "react";
import { useOptions } from "./redux/optionsReducer";
import { useDispatch, useSelector } from "react-redux";

const LanguageSelector = () => {
  const {
    configOptions,
    updateConfigOptions
  } = useOptions();
  const dispatch = useDispatch();



  const handleLanguageChange = (index: number, lang: string) => {
    const newLanguages = [...configOptions.selectedLanguages];
    newLanguages[index] = lang; 
    updateConfigOptions((prevOptions) => ({
      ...prevOptions,
      selectedLanguages: newLanguages,
    }));
  };
      console.log(
        "%c languageSelector",
        "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
        "configOptions:",
        configOptions,
      );
  return (
    <div className="flex flex-col mb-4">
      <label className="text-lg mb-2 text-center">Select Languages:</label> 
      <div className="flex flex-col space-y-4"> 
        {[0, 1].map((index) => (
          <div key={index} className="flex flex-col items-center"> 
            <span className="text-md mb-1 text-center">第 {index + 1} 種語言</span> 
            <select
              value={configOptions.selectedLanguages[index]}
              onChange={(e) => handleLanguageChange(index, e.target.value)}
              className="border rounded-md p-2" 
            >
              <option value="en">English</option>
              <option value="zh">Chinese</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;