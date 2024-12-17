import language_data_sheet from "./language_data_sheet.json";


import { showCustomToast,translateTextAndSpeak } from '../common/sharedFunction';

export const copyText = (item: any, configOptions: any) => {
    
  const text =
  !configOptions.copyTheTextAbove && !configOptions.copyTheTextBelow
  ? 'No copy conditions selected\n(未選擇複製條件)'
  : configOptions.copyTheTextAbove && configOptions.copyTheTextBelow
  ? item.translations.en + "\n" + item.translations.zh
  : configOptions.copyTheTextBelow
  ? item.translations.zh
  : configOptions.copyTheTextAbove
  ? item.translations.en
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

export const toggleStarred = (
  index: number,
  favorites: number[],
  setFavorites: (favorites: number[]) => void,
  showCustomToast: (message: string) => void
) => {
  if (favorites.includes(index)) {
    setFavorites(favorites.filter((item) => item !== index));
    showCustomToast("已取消收藏");
  } else {
    setFavorites([...favorites, index]);
    showCustomToast("已收藏");
  }
};

export const checkDuplicates = () => {
  const zhMap = new Map();
  const duplicates: { zh: string; indices: any[]; }[] = [];
  
  language_data_sheet.forEach((item: { translations: { zh: string }; index: any; }) => {
    const zhTranslation = item.translations.zh; // 獲取 zh 翻譯
    if (zhMap.has(zhTranslation) && zhMap.get(zhTranslation) !== item.index) {
      duplicates.push({
        zh: zhTranslation,
        indices: [zhMap.get(zhTranslation), item.index]
      });
    } else {
      zhMap.set(zhTranslation, item.index);
    }
  });
  
  console.log(
    "%c checkDuplicates",
    "color:#DDDD00;font-family:system-ui;font-size:2rem;font-weight:bold",
    "duplicates:",
    duplicates
  );
}


