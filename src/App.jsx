import Home from './pages/homePage/Home';
import { Routes, Route, Navigate } from 'react-router-dom';
function App() {
  return (
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
