export const copyText = (item: any, configOptions: any, showCustomToast: Function) => {
    
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





