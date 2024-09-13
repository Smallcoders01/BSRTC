import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminComponents/AdminPanel';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/admin/*" element={<AdminPanel />} />
                {/* Add other routes here */}
            </Routes>
        </Router>
    );
}

export default App;