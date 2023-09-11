import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateGroupDialog from './CreateGroupDialog';
import { BsPersonAdd } from 'react-icons/bs';


function PocketNotes({ groups, setGroups }) {
  const [isCreateGroupDialogOpen, setCreateGroupDialogOpen] = useState(false);
  const navigate = useNavigate(); // Add useNavigate hook to access navigation functionality

  const openCreateGroupDialog = () => {
    setCreateGroupDialogOpen(true);
  };

  const closeCreateGroupDialog = () => {
    setCreateGroupDialogOpen(false);
  };

  const handleCreateGroup = (newGroup) => {
    setGroups([...groups, { ...newGroup, messages: [] }]);
  };

  // Function to navigate to dynamic page when a group name is clicked
  const navigateToDynamicPage = (groupName) => {
    navigate(`/${groupName}`);
  };

  return (
    <div className="container">
      <h1 className="headerText">Pocket Notes</h1>

      <button onClick={openCreateGroupDialog} className="button">
        <BsPersonAdd/> Create Notes Group
      </button>

      {isCreateGroupDialogOpen && (
        <CreateGroupDialog
          onClose={closeCreateGroupDialog}
          onCreateGroup={handleCreateGroup}
        />
      )}

      <div className="notes-container">
        {groups.map((notesGroup) => (
          <div key={notesGroup.name} className="notesGroup" 
          onClick={() => navigateToDynamicPage(notesGroup.name)} // Navigate to dynamic page when clicked
          >
            <div className="group-icon" style={{ backgroundColor: notesGroup.color }}>
              {notesGroup.name
                .split(' ')
                .map((word) => word.charAt(0).toUpperCase())
                .join('')}
            </div>
            <div className="group-info">
              <p
                className="notesGroupName"
              >
                {notesGroup.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PocketNotes;
