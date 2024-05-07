"use client"


import React, { useState } from 'react';
import searchListModule from './searchListModule.json';
interface SearchBoxProps {
  data: { en: string; zh: string }[];
}
const App: React.FC = () => {
  return (
    <div className="container mx-auto mt-4 flex flex-col items-center w-[100vw] bg-[#0000]">
      <h1 className="text-2xl font-bold mb-4 self-center">Sentence Search</h1>
      <SearchBox data={searchListModule} />
    </div>
  );
};

const SearchBox: React.FC<SearchBoxProps> = ({ data }) => {
  const [query, setQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<{ en: string; zh: string }[]>([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    const filtered = data.filter(item =>
      item.en.toLowerCase().includes(newQuery.toLowerCase()) ||
      item.zh.toLowerCase().includes(newQuery.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="w-[100%] flex flex-col items-center">
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-[100%]"
      />
      {query && (
        <ul className="mt-2 self-start px-3 w-[100%] bg-[#0000]">
          {filteredData.map(item => (
            <li key={item.zh} className="border-b border-gray-300 py-2">
              <div className="break-word">{item.en}</div>
              <div className="break-word">{item.zh}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};





export default App;