import "./App.css";
import Home from "./Components/Home";
import About from "./Components/About";
import Work from "./Components/Work";
import Contact from "./Components/Contact";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import ImageUploading from "./Components/ImageUploading";

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route
        path="/aero/about"
        element={<About/>}
      />
      <Route
        path="/aero/ImageUpload"
        element={<ImageUploading/>}
      />
      <Route
        path="/aero/work"
        element={<Work/>}
      />
      <Route
        path="/aero/contact"
        element={<Contact/>}
      />
    </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
