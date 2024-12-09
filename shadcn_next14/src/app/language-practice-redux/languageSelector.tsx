import React, { useState } from "react";

const LanguageSelector = () => {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en", "zh"]); // 預設為第一個語言

  const handleLanguageChange = (index: number, lang: string) => {
    const newLanguages = [...selectedLanguages];
    newLanguages[index] = lang; // 更新指定索引的語言
    setSelectedLanguages(newLanguages); // 更新本地狀態
  };

  return (
    <div className="flex flex-col mb-4">
      <label className="text-lg mb-2 text-center">Select Languages:</label> {/* 標題置中 */}
      <div className="flex flex-col space-y-4"> 
        {[0, 1].map((index) => (
          <div key={index} className="flex flex-col items-center"> {/* 將選擇器容器置中 */}
            <span className="text-md mb-1 text-center">第 {index + 1} 種語言</span> {/* 標題置中 */}
            <select
              value={selectedLanguages[index]}
              onChange={(e) => handleLanguageChange(index, e.target.value)}
              className="border rounded-md p-2" // 使選擇器的文本置中
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