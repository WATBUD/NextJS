import React from 'react';
import { useOptions, showCustomToast } from './optionsContext';
// import './optionsModal.css'; 

import { ChevronLeftIcon } from '@heroicons/react/24/solid'


interface OptionsModalProps {
  // onClose: () => void; // 不再需要
}

const OptionsModal: React.FC<OptionsModalProps> = () => {
  const {
    showFavoritesListOnly,
    setShowFavoritesListOnly,
    showOptionUI,
    setShowOptionUI,
    copyTheTextAbove,
    setCopyTheTextAbove,
    copyTheTextBelow,
    setCopyTheTextBelow,
    favorites,
    setFavorites,
  } = useOptions();

  return (
    <div
      className={`OptionsModal${showOptionUI ? ' show' : ''}`  }
    >
      <div className="bg-[#fffdfdde] max-w-[500px] w-[100%] h-[100%] rounded-lg shadow-lg p-4 flex flex-col items-center">

        <div className="flex items-center mb-10 bg-[#0000] w-[100%]">

          <button className="bg-[#0000]" onClick={() => {
            setShowOptionUI(!showOptionUI);
          }}>
            <ChevronLeftIcon className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold flex-grow ml-3">Options</h1>
        </div>


        
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="showFavorites"
            checked={showFavoritesListOnly}
            onChange={() => {
              setShowFavoritesListOnly(!showFavoritesListOnly);
            }}
            className="mr-2 w-5 h-5"
          />
          <label htmlFor="showFavorites" className="text-lg">
            Show Favorites Only
          </label>
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="copyTheTextAbove"
            checked={copyTheTextAbove}
            onChange={() => {
              setCopyTheTextAbove(!copyTheTextAbove);
            }}
            className="mr-2 w-5 h-5"
          />
          <label htmlFor="copyTheTextAbove" className="text-lg">
            Copy the text above{' '}
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="copyTheTextAbove"
            checked={copyTheTextBelow}
            onChange={() => {
              setCopyTheTextBelow(!copyTheTextBelow);
            }}
            className="mr-2 w-5 h-5"
          />
          <label htmlFor="setCopyTheTextBelow" className="text-lg">
            Copy the text below{' '}
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="px-4 py-2 mb-4 mt-4 bg-blue-500 text-white rounded-md"
            onClick={() => {
              setFavorites([]);
              showCustomToast('Clear my favorites');
            }}
          >
            Clear my favorites
          </button>
        </div>

        <div className="flex justify-end">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
            onClick={() => {
              setShowOptionUI(!showOptionUI);
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;
