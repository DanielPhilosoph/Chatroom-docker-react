import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import ChatRoom from "./core/ChatRoom";
import EnterNamePage from "./core/EnterNamePage";

function App() {
  const [username, setUsername] = useState("");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterNamePage setUsername={setUsername} />} />
        <Route path="/chat-room" element={<ChatRoom username={username} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
