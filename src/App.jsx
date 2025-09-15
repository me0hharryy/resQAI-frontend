// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardPage from './components/DashboardPage';
import PublicPortalPage from './pages/PublicPortalPage';
import 'leaflet/dist/leaflet.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/public" element={<PublicPortalPage />} />
      </Routes>
    </Router>
  );
}

export default App;