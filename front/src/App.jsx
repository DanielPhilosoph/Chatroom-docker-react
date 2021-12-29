import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import ChatRoom from "./core/ChatRoom";
import EnterNamePage from "./core/EnterNamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<EnterNamePage />} />
        <Route path="/chat-room" element={<ChatRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
