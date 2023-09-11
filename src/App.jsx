import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PocketNotes from './PocketNote';
import DynamicPage from './DynamicPage';
import './App.css'

function App() {
  const [groups, setGroups] = useState([]);
  const isDesktop = window.innerWidth >= 768;

  useEffect(() => {
    const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
    setGroups(storedGroups);
  }, []);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
  }, [groups]);

  return (
    <Router>
    {
      isDesktop?(
            <div className="app-container">
        <div className="left-sidebar">
          {/* Include PocketNotes component here */}
          <PocketNotes groups={groups} setGroups={setGroups} />
        </div>
        <div className="right-content">
          <Routes>
            <Route path="/" element={<div className='homepage'></div>} />
            {/* Define routes for dynamic content */}
            <Route path="/create-group" element={<div>Create Group Page</div>} />
            <Route path="/:groupname" element={<DynamicPage groups={groups} setGroups={setGroups} />} />
          </Routes>
        </div>
      </div>
      )
      :(
        <Routes>
        <Route path="/" element={<PocketNotes groups={groups} setGroups={setGroups} />} />
        <Route path="/:groupname" element={<DynamicPage groups={groups} setGroups={setGroups} />} />
      </Routes>
      )
    }
    

    </Router>
  );
}

export default App;
