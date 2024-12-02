
import type { Metadata } from "next";
import SearchList from './searchList';

import { OptionsProvider } from './optionsContext';
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
