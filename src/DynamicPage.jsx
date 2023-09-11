import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from 'react-icons/io';

function DynamicPage({ groups, setGroups }) {
  const { groupname } = useParams();
  const group = groups.find((g) => g.name === groupname);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(group?.messages || []);
  const navigate = useNavigate();

  const handleHomeNav = () => {
    navigate("/");
  };

  useEffect(() => {
    const newGroup = groups.find((g) => g.name === groupname);
    setMessages(newGroup?.messages || []);
  }, [groupname, groups]);

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
    sendMessage();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent Enter key from adding a newline
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (message.trim() !== "") {
      const newMessage = {
        text: message,
        timestamp: new Date().toString(),
      };

      setMessages([...messages, newMessage]);

      const updatedGroups = groups.map((g) =>
        g.name === groupname
          ? { ...g, messages: [...(g.messages || []), newMessage] }
          : g
      );

      setGroups(updatedGroups);

      setMessage("");
    }
  };

  return (
    <div className="container-page">
      <div className="top-bar">
        <div onClick={handleHomeNav} className="back-button">
          {<IoMdArrowBack/>}
        </div>
        {group && (
          <div className="group-info">
            <div
              className="group-circle"
              style={{ backgroundColor: group.color }}
            >
              {group.name.charAt(0).toUpperCase()}
            </div>
            <div className="group-name">{group.name}</div>
          </div>
        )}
      </div>

      <div className="messages">
        {messages.map((msg, index) => (
          <div className="message" key={index}>
            <div className="timestamp">{msg.timestamp}</div>
            <div className="text">{msg.text}</div>
          </div>
        ))}
      </div>
      <div className="fixed-input">
        <input
          type="text"
          placeholder="Enter your message..."
          value={message}
          onChange={handleMessageChange}
          onKeyDown={handleKeyDown} // Listen for Enter key press
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

export default DynamicPage;
