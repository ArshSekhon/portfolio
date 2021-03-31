import './App.css';

import {AlphaSpinner} from './components/alpha-spinner/alpha-spinner'
import { LoadingBanner } from './components/loading-banner/loading-banner';

function App() {
  return (
    <div className="App">
      <AlphaSpinner/>
      <LoadingBanner/>
    </div>
  );
}

export default App;
