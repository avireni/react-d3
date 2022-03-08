import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SearchPage from './pages/SearchPage/SearchPage';
import CompanyDetails from './pages/CompanyDetailsPage/CompanyDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/company/:companyId" element={<CompanyDetails />} />
        <Route path="/" element={<SearchPage />} />
      </Routes>
    </Router>
  );
}

export default App;
