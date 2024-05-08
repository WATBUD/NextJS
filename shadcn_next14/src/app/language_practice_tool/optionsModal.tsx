import React from 'react';
import { useOptions } from './optionsContext';

interface OptionsModalProps {
  // onClose: () => void; // 不再需要
}

const OptionsModal: React.FC<OptionsModalProps> = () => {
  const { showFavoritesListOnly, setShowFavoritesListOnly,showOptionUI,setShowOptionUI } = useOptions();

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-[#fff] w-[100%] h-[50%] rounded-lg shadow-lg p-4 flex flex-col items-center">
        <h2 className="text-2xl font-semibold mb-2 ">Options</h2>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="showFavorites"
            checked={showFavoritesListOnly}
            onChange={()=>{setShowFavoritesListOnly(!showFavoritesListOnly)}}
            className="mr-2 w-5 h-5"
          />
          <label htmlFor="showFavorites" className="text-lg">Show Favorites Only</label>
        </div>
        <div className="flex justify-end">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2" onClick={()=>{setShowOptionUI(!showOptionUI)}}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default OptionsModal;
