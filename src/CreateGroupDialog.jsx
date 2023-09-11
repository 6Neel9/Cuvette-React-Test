import { useState } from 'react';

const availableColors = [ '#F19576', '#B38BFA', '#FF79F2','#43E6FC'];

function CreateGroupDialog({ onClose, onCreateGroup }) {
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);

  const handleCreateGroup = () => {
    if (groupName.trim() === '') {
      alert('Please enter a group name.');
      return;
    }

    const newGroup = {
      name: groupName,
      color: selectedColor,
    };

    onCreateGroup(newGroup);
    setGroupName('');
    setSelectedColor(availableColors[0]);
    onClose();
  };

  return (
    <div className="create-group-dialog">
      <h2>Create New Group</h2>
      <label htmlFor="groupName">Group Name:</label>
      <input
        type="text"
        id="groupName"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <label>Choose Color:</label>
      <div className="color-options">
        {availableColors.map((color) => (
          <div
            key={color}
            className={`color-option${selectedColor === color ? ' selected' : ''}`}
            style={{ backgroundColor: color }}
            onClick={() => setSelectedColor(color)}
          ></div>
        ))}
      </div>
      <button onClick={handleCreateGroup}>Create</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default CreateGroupDialog;
