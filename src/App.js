import Home from './components/Home'
import List from './components/List'
import './cssFile/App.css'
import { BrowserRouter,Routes,Route } from "react-router-dom";
//npm install react-router-dom

function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/list" element={<List />} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
