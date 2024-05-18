/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
//import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid'
//import { DocumentDuplicateIcon as DocumentDuplicateIconOutline } from '@heroicons/react/24/outline'
import { 
DocumentDuplicateIcon as DocumentDuplicateIconSolid,
SpeakerWaveIcon 
} from "@heroicons/react/24/solid";
import React, { useState, useEffect, useRef, useContext } from "react";
import searchListModule from "./searchListModule.json";
import toast, {
  Renderable,
  Toast,
  Toaster,
  ValueFunction,
} from "react-hot-toast";
import OptionsModal from "./optionsModal";
import { useOptions, showCustomToast } from "./optionsContext";
import { set_indexedDB_Data, get_indexedDB_data } from "./indexedDBUtils";
import './optionsModal.css'; 

const SearchList: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [filteredData, setFilteredData] = useState<
    { en: string; zh: string; index: number; tag: string }[]
  >([]);
  // const [tt, sett] = useState<boolean>(false);
  // useEffect(() => {
  //   console.log(
  //     "%c useEffect+tt",
  //     "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
  //     "tt:",
  //     tt
  //   );
  // }, [tt]);
  const {
    showOptionUI,
    setShowOptionUI,
    favorites,
    setFavorites,configOptions
  } = useOptions();
  const intialCountRef = useRef(0);
  useEffect(() => {
    console.log(
      "%c useEffect+showFavoritesListOnly",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
      "intialCountRef.current",
      intialCountRef.current,
    );
    if (intialCountRef.current === 0) {
      intialCountRef.current += 1;
      showCustomToast(configOptions.showFavoritesListOnly ? "最愛模式" : "全部模式");
    } else {
      showCustomToast(configOptions.showFavoritesListOnly ? "最愛模式" : "全部模式");
      const event = {
        target: {
          value: query,
        },
      };
      handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
    }
  }, [configOptions.showFavoritesListOnly]);

  const toggleStarred = (index: number) => {
    if (favorites.includes(index)) {
      setFavorites(favorites.filter((item) => item !== index));
      showCustomToast("已取消收藏");
    } else {
      setFavorites([...favorites, index]);
      showCustomToast("已收藏");
    }
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "%c handleInputChange",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
      "event:",
      event,
    );
    const newQuery = event.target.value;
    setQuery(newQuery);
    const filtered = searchListModule.filter(
      (item) =>
        (item.en.toLowerCase().includes(newQuery.toLowerCase()) ||
          item.zh.toLowerCase().includes(newQuery.toLowerCase())) &&
        (!configOptions.showFavoritesListOnly || favorites.includes(item.index)),
    );
    setFilteredData(filtered);
    if (filtered.length <= 0 && configOptions.showFavoritesListOnly) {
      showCustomToast("最愛模式:無收藏名單");
    }
  };

  useEffect(() => {
    typeof Storage == "undefined" ? console.log("本地存储不可用") : null;
    if (intialCountRef.current > 1) {
      //localStorage.setItem('favorites', JSON.stringify(favorites));
      set_indexedDB_Data("favorites", "data", favorites, () => {});
    } else {
      intialCountRef.current += 1;
    }
  }, [favorites]);

  useEffect(() => {
    setTimeout(() => {
      get_indexedDB_data("favorites", "data")
        .then((data) => {
          if (data !== undefined) {
            console.log(
              "favorites !== undefined retrieved successfully:",
              data,
            );
            setFavorites(data);
          }
        })
        .catch((error) => {
          console.error((error as Error).message);
        });
      // console.log(
      //   "%c useEffect+init",
      //   "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
      //   "storedBlockedList:",
      //   storedBlockedList
      // );
      // const storedBlockedList = localStorage.getItem('favorites');
      // if (storedBlockedList) {
      //   setFavorites(JSON.parse(storedBlockedList));
      // }
    }, 500);

    //document.title = "language_practice_tool";
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollToTopButton = document.getElementById("scrollToTopButton");
      if (scrollToTopButton) {
        if (scrollTop > 200) {
          scrollToTopButton.style.display = "block";
        } else {
          scrollToTopButton.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const copyText = (item:any) => {
    
    const text =
    !copyTheTextAbove && !copyTheTextBelow
    ? 'No copy conditions selected\n(未選擇複製條件)'
    : copyTheTextAbove && copyTheTextBelow
    ? item.en + "\n" + item.zh
    : copyTheTextBelow
    ? item.zh
    : copyTheTextAbove
    ? item.en
    : 'No copy conditions selected';

    if(text.includes('未選擇複製條件')){
      showCustomToast(text);
    }
    else{
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      //toast.success('Successfully created!');
      showCustomToast(text);
      showCustomToast("Copied");
    }
    //navigator.clipboard.writeText(text);

  };
  function translateTextAndSpeak(text: string='') {
    console.log(`enter translateTextAndSpeak ${text}`);
    const utterance_input = new SpeechSynthesisUtterance(text);
    //const utterance_input = new SpeechSynthesisUtterance(`You pressed ${text}`);
    utterance_input.lang = "en-US";
    utterance_input.volume = 1;
    //const synth = window.speechSynthesis;
    let voices = speechSynthesis.getVoices();
    //console.log(`voices ${JSON.stringify(voices)}`);
    console.dir(voices);
    if(voices[2]){
      utterance_input.voice = voices[1];
    }
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance_input);
  }
  const scrollToTop = () => {
    //   window.scrollTo({
    //     top: 0,
    //     behavior: 'smooth',
    //   });
    const scrollDuration = 150; // 滾動時間為 500 毫秒
    const scrollStep = -window.scrollY / (scrollDuration / 15);

    const scrollInterval = setInterval(() => {
      if (window.scrollY !== 0) {
        window.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval); 
      }
    }, 15);
  };
  return (
    <div id="MainScreenUI" className={`container mx-auto mt-7 block w-full items-center bg-transparent${!showOptionUI ? ' show' : ''}`}>
      <OptionsModal />
      <Toaster />
      <div id="navbar" className="mb-2 flex w-full flex-col sticky top-0 z-2">
        <div className="mb-2 flex w-full items-center justify-between">
          <h1 className="self-center text-2xl font-bold">Sentence Search</h1>
          <button
            onClick={() => setShowOptionUI(true)}
            className="rounded-md bg-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          >
            Options
          </button>
        </div>
        <div className="flex w-full">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            className="w-[100%] rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
          />
        </div>
      </div>
      <div className="flex w-[100%] flex-col items-center">
        {query && (
          <ul className="mt-2 bg-[#0000] px-1 flex flex-col">
            {filteredData.map((item) => (
              <li
                key={item.zh}
                className="flex items-center border-b border-gray-300 py-2"
              >
                <button
                  className="mr-5 bg-[#0000]"
                  onClick={() => toggleStarred(item.index)}
                >
                  {/* <StarIcon className="size-6 text-blue-500" /> */}
                  <StarIconOutline
                    className={`size-6 ${favorites.includes(item.index) ? "fill-current text-yellow-400" : "stroke-current text-gray-400"}`}
                  />
                  {/* <StarIconSolid className={`size-6 ${favorites.includes(item.index) ? 'text-yellow-400 fill-current' : 'text-gray-400 stroke-current'}`} /> */}
                </button>
                <div className="break-word w-[80%] bg-[#0000]">
                  {item.en}
                  <br />
                  {item.zh}
                </div>
                <div className="flex justify-end">
                  <button className="rounded" onClick={() => { translateTextAndSpeak(item.en)}}>
                    <SpeakerWaveIcon className="h-6 w-6 fill-current text-gray-200" />
                  </button>
                  <button
                    className="rounded" onClick={() => {copyText(item);}}>
                    <DocumentDuplicateIconSolid className="h-6 w-6 fill-current text-gray-200" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button
        id="scrollToTopButton"
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 hidden rounded-md bg-gray-300 px-3 py-2 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
      >
        Scroll To Top
      </button>
    </div>
  );
};

export default SearchList;
