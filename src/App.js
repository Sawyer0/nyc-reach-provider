import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './components/HomePage';
import ProviderDetails from './components/ProviderDetails';

function App() {
  return (
    <Router>
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />}/>
                <Route path="/provider/:id" element={<ProviderDetails />}/>

            </Routes>
        </div>
    </Router>
  );
}

export default App;
