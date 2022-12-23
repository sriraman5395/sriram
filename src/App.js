
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  
} from "react-router-dom";
import Signup from './component/Signup';
import Signup2 from './component/Signup2';
import Puzzle from './component/Puzzle';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup2" element={<Signup2 />} />
        <Route path="/puzzle" element={<Puzzle />} />
        
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
