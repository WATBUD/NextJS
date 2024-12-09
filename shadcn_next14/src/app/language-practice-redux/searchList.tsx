/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
//import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
//import { DocumentDuplicateIcon as DocumentDuplicateIconOutline } from '@heroicons/react/24/outline'


import { 
DocumentDuplicateIcon as DocumentDuplicateIconSolid,
SpeakerWaveIcon,
ChevronDoubleUpIcon
} from "@heroicons/react/24/solid";
import React, { useState, useEffect, useRef, useContext } from "react";
import toast, {
  Renderable,
  Toast,
  Toaster,
  ValueFunction,
} from "react-hot-toast";
import OptionsModal from "./optionsModal";
import { useOptions } from "./redux/optionsReducer";

import { copyText,handleScroll,scrollToTop  } from '../common/languagePracticeTool';
import { handleShowMode, handleInputChange,toggleStarred } from './redux/optionsReducer';
import { showCustomToast,translateTextAndSpeak } from '../common/sharedFunction';

import { set_indexedDB_Data, get_indexedDB_data } from "../common/indexedDBUtils";
import '../common/languageComponent.css'; 
import { useDispatch } from "react-redux";
const SearchList: React.FC = () => {
  const {
    showOptionUI,
    databaseHasBeenLoaded,
    initializeConfigOptions,
    batchUpdateConfigOptions,
    configOptions,
    favorites,
    setFavorites,
    setDatabaseHasBeenLoaded,
    setConfigOptions,
    setShowOptionUI,
    filteredData,
    queryString,
  } = useOptions();

  useEffect(() => {
    console.log(
      "%c optionsReducer+useEffect+showFavoritesListOnly",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold"
    );
    if (databaseHasBeenLoaded) {
      set_indexedDB_Data("favorites", "configOptions", configOptions, () => {});
    }
  }, [configOptions]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleShowMode());
  }, [configOptions.showFavoritesListOnly]);

  useEffect(() => {
    console.log(
      "%c useEffect+optionsState.favorites",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold"
    );
    if (databaseHasBeenLoaded) {
      set_indexedDB_Data("favorites", "data", favorites, () => {});
    } 
  }, [favorites]);

  useEffect(() => {
    if(!databaseHasBeenLoaded){
      Promise.all([
        get_indexedDB_data("favorites", "configOptions"),
        get_indexedDB_data("favorites", "data")
      ])
      .then(([prevConfigOptions, favoritesData]) => {
        if (prevConfigOptions !== undefined) {
          console.log("configOptions retrieved successfully:", prevConfigOptions);
          initializeConfigOptions(prevConfigOptions);

        }
        
        if (favoritesData !== undefined) {
          console.log("favorites/data retrieved successfully:", favoritesData);
          setFavorites(favoritesData);
        }
        setDatabaseHasBeenLoaded(true);
      })
      .catch((error) => {
        console.error((error as Error).message);
      });
    }
    handleScroll();
  }, []);
  const highlightText = (text: string, query: string) => {
    if (!query) return text; 
    const parts = text.split(new RegExp(`(${query})`, "gi")); 
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: "#ff0" }}>{part}</span> 
      ) : part
    );
  };

  return (
    <div className="w-full flex flex-col items-center mr-5">
      <div
        id="MainScreenUI"
        className={`flex flex-col items-center bg-transparent${
          !showOptionUI ? " show" : ""
        }`}
      >
        <div
          id="navbar"
          className="max-w-[980px] w-[86%] mb-2 flex flex-col sticky top-0 z-2"
        >
          <div className="mb-2 flex w-full items-center justify-between">
            <h1 className="self-center text-2xl font-bold">Sentence Search</h1>
            <button
              onClick={() => {
                console.log(
                  "%c searchList+onClick",
                  "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
                  showOptionUI
                );
                setShowOptionUI(true);
              }}
              className="rounded-md px-3 py-2 bg-blue-500 text-white shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            >
              Options
            </button>
          </div>
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search..."
              value={queryString}
              onChange={(e) => dispatch(handleInputChange(e.target.value))}
              className="w-[100%] rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="max-w-[980px] w-[86%] flex flex-col items-center">
          {queryString!=null && (
            <ul className="flex flex-col mt-2 bg-[#0000] w-[100%]">
              <button
                id="scrollToTopButton"
                onClick={scrollToTop}
                className="fixed bottom-8 self-end hidden rounded-md px-3 py-2 text-yellow-50  shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                style={{ backgroundColor: "rgba(45, 114, 210,0.3)" }}
              >
                <ChevronDoubleUpIcon className="h-6 w-6 fill-current text-yellow-50 mr-2" />
                Top
              </button>
              {filteredData.map((item) => (
                <li
                  // key={item.translations.zh}
                  className="flex w-[100%] items-center border-b border-gray-300 py-2"
                >
                  <button
                    className="mr-5 bg-[#0000]"
                    onClick={() => dispatch(toggleStarred(item.index))}
                  >
                    {/* <StarIcon className="size-6 text-blue-500" /> */}
                    <StarIconOutline
                      className={`size-6 ${
                        favorites.includes(item.index)
                          ? "fill-current text-yellow-400"
                          : "stroke-current text-gray-400"
                      }`}
                    />
                    {/* <StarIconSolid className={`size-6 ${favorites.includes(item.index) ? 'text-yellow-400 fill-current' : 'text-gray-400 stroke-current'}`} /> */}
                  </button>
                  <div className="break-word flex-grow-[1] bg-[#0000]">
                    <div>{highlightText(item.translations[configOptions.selectedLanguages[0]], queryString)}</div>
                    {/* <br /> */}
                    <div>{highlightText(item.translations[configOptions.selectedLanguages[1]], queryString)}</div>
                  </div>
                  <div className="flex justify-end flex-grow-[1]">
                    <button
                      className=""
                      onClick={() => {
                        translateTextAndSpeak(item.translations.en);
                      }}
                    >
                      <SpeakerWaveIcon className="h-6 w-6 fill-current text-gray-200" />
                    </button>
                    <button
                      className="ml-2"
                      onClick={() => {
                        copyText(item, configOptions);
                      }}
                    >
                      <DocumentDuplicateIconSolid className="h-6 w-6 fill-current text-gray-200" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <OptionsModal />
      <Toaster />
    </div>
  );
};

export default SearchList;
