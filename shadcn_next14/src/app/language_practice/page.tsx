
import type { Metadata } from "next";
import SearchList from './searchList';

import { OptionsProvider } from './optionsContext'; // 导入 OptionsProvider

import { CommonMetadata }  from '../common/languageComponent';

export const metadata: Metadata = CommonMetadata;




const App: React.FC = () => {
  return (
    <div>
      <OptionsProvider>
        <SearchList />
      </OptionsProvider>
    </div>
  );
};
export default App;
