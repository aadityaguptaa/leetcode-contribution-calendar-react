import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import CalendarLeetcode from "./components/CalendarLeetcode";

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/username/:username" element={<CalendarLeetcode />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
