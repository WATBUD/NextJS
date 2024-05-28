
import type { Metadata } from "next";
import SearchList from './searchList';

import { OptionsProvider } from './optionsContext'; // 导入 OptionsProvider

export const metadata: Metadata = {
  title: "language_practice_tool",
  description: `
    這是一個精心設計的語言學習工具，能夠幫助您輕鬆地掌握不同語言的精髓。我們稱之為「Language Practice Tool」（語言實踐工具），因為它不僅僅是一個翻譯工具，更像是您的語言學習良師益友。
    
    This meticulously crafted language learning tool is designed to help you effortlessly grasp the essence of different languages. We call it the 'Language Practice Tool' because it's not just a translation tool, but rather your companion in language learning journey. 

    這個工具不僅提供了一流的翻譯功能，還擁有豐富的語言學習功能，讓您可以通過各種互動式練習，深入了解語言結構和詞彙用法。而更令人驚嘆的是，它是由「create next app」創建的，這保證了它的技術支持和穩定性。
    
    This tool not only offers top-notch translation capabilities but also comes packed with rich language learning features, allowing you to delve into language structures and vocabulary usage through various interactive exercises. What's even more remarkable is that it's generated by 'create next app,' ensuring its technological support and stability. 

    不僅如此，我們還致力於不斷更新和改進這個工具，以確保您始終能夠享受到最新的學習資源和技術支援。
    
    Moreover, we are committed to constantly updating and improving this tool to ensure that you always have access to the latest learning resources and technological support. 

    不要再讓語言成為學習的障礙，讓「Language Practice Tool」幫助您輕鬆掌握多種語言，拓展您的視野，讓您在多語言的世界中自如遨遊！
    
    Don't let language be a barrier to your learning. Let the 'Language Practice Tool' assist you in effortlessly mastering multiple languages, expanding your horizons, and navigating through the multilingual world with ease!
  `,
};



const App: React.FC = () => {
  return (
    <div>
      {/* 这里是你的内容 */}
      <OptionsProvider>
        <SearchList />
      </OptionsProvider>
    </div>
  );
};
export default App;
