
import language_data_sheet from "../common/language_data_sheet.json";
import { showCustomToast,translateTextAndSpeak } from '../common/sharedFunction';


export const copyText = (item: any, configOptions: any) => {
    
  const text =
  !configOptions.copyTheTextAbove && !configOptions.copyTheTextBelow
  ? 'No copy conditions selected\n(未選擇複製條件)'
  : configOptions.copyTheTextAbove && configOptions.copyTheTextBelow
  ? item.en + "\n" + item.zh
  : configOptions.copyTheTextBelow
  ? item.zh
  : configOptions.copyTheTextAbove
  ? item.en
  : 'No copy conditions selected';

  if (text.includes('未選擇複製條件')) {
      showCustomToast(text);
  } else {
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      showCustomToast(text);
      showCustomToast("Copied");
  }
};

export const handleShowMode = (
  showFavoritesListOnly: boolean,
  databaseHasBeenLoaded: boolean,
  query: string,
  favorites: number[],
  configOptions: any,
  setQuery: (query: string) => void,
  setFilteredData: (filteredData: any[]) => void,
) => {
  console.log(
    "%c useEffect+showFavoritesListOnly",
    "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
  );
  
  if (databaseHasBeenLoaded) {
    showCustomToast(showFavoritesListOnly ? "最愛模式" : "全部模式");
    const event:any = {
      target: {
        value: query,
      },
    };
    handleInputChangeShared(
      event,
      favorites,
      configOptions,
      setQuery,
      setFilteredData
    );
  }
};

export const handleInputChangeShared = (
  event: React.ChangeEvent<HTMLInputElement>,
  favorites: number[],
  configOptions: any,
  setQuery: (query: string) => void,
  setFilteredData: (filteredData: any[]) => void,
) => {
  console.log(
    "%c handleInputChange",
    "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
    "event:",
    event,
  );
  
  const newQuery = event.target.value;
  setQuery(newQuery);
  
  const filtered = language_data_sheet.filter(
    (item) =>
      (item.en.toLowerCase().includes(newQuery.toLowerCase()) ||
        item.zh.toLowerCase().includes(newQuery.toLowerCase())) &&
      (!configOptions.showFavoritesListOnly || favorites.includes(item.index))
  );
  
  setFilteredData(filtered);
  
  if (filtered.length <= 0 && configOptions.showFavoritesListOnly) {
    showCustomToast("最愛模式:無收藏名單");
  }
};

export const scrollToTop = () => {

  const mainScreenUI = document.getElementById("MainScreenUI");

  if(mainScreenUI){
    const scrollDuration = 300;
    const scrollStep = -mainScreenUI.scrollTop / (scrollDuration / 15);

    const scrollInterval = setInterval(() => {
      if (mainScreenUI.scrollTop !== 0) {
        mainScreenUI.scrollBy(0, scrollStep);
      } else {
        clearInterval(scrollInterval); 
      }
    }, 15);
  }

};

export const handleScroll = () => {
  //document.title = "language_practice_tool";
  const _handleScroll = () => {
      const mainScreenUI = document.getElementById("MainScreenUI");
      const scrollToTopButton = document.getElementById("scrollToTopButton");
      if (mainScreenUI && scrollToTopButton) {
        // console.log(
        //   "%c handleScroll",
        //   "color:#BB3D00;font-family:system-ui;font-size:2rem;font-weight:bold",
        //   "mainScreenUI.scrollTop:",
        //   mainScreenUI.scrollTop
        // );
        if (scrollToTopButton) {
          if (mainScreenUI.scrollTop > 200) {
            scrollToTopButton.style.display = "flex";
          } else {
            scrollToTopButton.style.display = "none";
          }
        }
      }
    };

    const mainScreenUI = document.getElementById('MainScreenUI');
    if (mainScreenUI) {
      mainScreenUI.addEventListener('scroll', _handleScroll);

      return () => {
        mainScreenUI.removeEventListener('scroll', handleScroll);
      };
    }
};