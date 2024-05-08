/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { useState,useEffect,useRef} from 'react';
import searchListModule from './searchListModule.json';
import toast, { Renderable, Toast, Toaster, ValueFunction } from 'react-hot-toast';

const showCustomToast = (text: string) => {
  toast(text, {
    duration: 4000,
    position: 'top-center',
    // Styling
    style: {},
    className: '',
    // Custom Icon
    icon: '❤️',
  
    // Change colors of success/error/loading icon
    iconTheme: {
      primary: '#000',
      secondary: '#fff',
    },
  
    // Aria
    ariaProps: {
      role: 'status',
      'aria-live': 'polite',
    },
  });
};
const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [filteredData, setFilteredData] = useState<{ en: string; zh: string; index: number }[]>([]);
  const [blockedList, setBlockedList] = useState<number[]>([]);
  const [showFavoritesListOnly, setShowFavoritesListOnly] = useState<boolean>(false);
  const toggleshowFavoritesListOnly = () => {
    setShowFavoritesListOnly(!showFavoritesListOnly);
  };
  const toggleStarred = (index: number) => {
    if (blockedList.includes(index)) {
      setBlockedList(blockedList.filter(item => item !== index));
      showCustomToast('已取消收藏')
    } else {
      showCustomToast('已收藏')
      setBlockedList([...blockedList, index]);
    }

  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "%c handleInputChange",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
      "event:",
      event
    );
    const newQuery = event.target.value;
    setQuery(newQuery);

    const filtered = searchListModule.filter(item =>
      (item.en.toLowerCase().includes(newQuery.toLowerCase()) || item.zh.toLowerCase().includes(newQuery.toLowerCase()))
      && (!showFavoritesListOnly || blockedList.includes(item.index))
    );
    setFilteredData(filtered);
  };
  useEffect(() => {
    console.log(
      "%c query,showFavoritesListOnly",
      "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
      "query,showFavoritesListOnly:",
      query,showFavoritesListOnly
    );
    showCustomToast(showFavoritesListOnly?'我的最愛':'全部模式')
    const event = {
      target: {
        value: query
      }
    };
    handleInputChange(event as React.ChangeEvent<HTMLInputElement>);
  }, [showFavoritesListOnly]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollToTopButton = document.getElementById('scrollToTopButton');
      if (scrollToTopButton) {
        if (scrollTop > 200) {
          scrollToTopButton.style.display = 'block';
        } else {
          scrollToTopButton.style.display = 'none';
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const copyText = (text: string) => {
    //navigator.clipboard.writeText(text);
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    //toast.success('Successfully created!');
    showCustomToast('Copied');
  };

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
    <div className="container mx-auto mt-4 flex flex-col items-center w-[100vw] bg-[#0000]">
      <Toaster  />
      <div className="flex justify-between w-full items-center mb-2">
        <h1 className="text-2xl font-bold self-center">Sentence Search</h1>
        <button onClick={toggleshowFavoritesListOnly} className="px-3 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          {showFavoritesListOnly ? 'Show All': 'Show Favorites'}
        </button>
      </div>
      <div className="w-[100%] flex flex-col items-center">
        <div className="flex justify-between w-full items-center mb-2">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleInputChange}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 w-[100%]"
          />
        </div>
        {query && (
          <ul className="mt-2 self-start px-1 w-[100%] bg-[#0000]">
            {filteredData.map(item => (
              <li key={item.zh} className="border-b border-gray-300 py-2 flex items-center">
                <button className="bg-[#0000] mr-5" onClick={() => toggleStarred(item.index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-6 w-6 ${blockedList.includes(item.index) ? 'text-yellow-400 fill-current' : 'text-gray-400 stroke-current'}`}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    overflow-visible
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 17l-6.25 4.75 2.5-7.75-6.5-4 8.25 0.25 3.75-8 3.75 8 8.25-0.25-6.5 4 2.5 7.75-6.25-4.75z"
                    />
                  </svg>
                </button>
                <div className="break-word">
                  {item.en}
                  <br />
                  {item.zh}
                </div>
                <button className="bg-[#0000] ml-auto" onClick={() => copyText(item.en + "\n" + item.zh)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400 stroke-current"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    overflow-visible
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 13l-5 5m0 0l-5-5m5 5V6m0 9a7 7 0 007-7h0a7 7 0 007 7v0a7 7 0 00-7 7h0a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <button id="scrollToTopButton" onClick={scrollToTop} className="fixed bottom-4 right-4 px-3 py-2 bg-gray-300 text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 hidden">
        Scroll To Top
      </button>
    </div>
  );
};

export default App;
