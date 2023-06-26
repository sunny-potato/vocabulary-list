// import React from "react";
import "./App.css";
import Header from "./components/Header";
import DayList from "./components/DayList";
import Day from "./components/Day";
import EmptyPage from "./components/EmptyPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewWord from "./components/NewWord";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route index element={<DayList />} />
          <Route path="/day/:day" element={<Day />} />
          <Route path="/newword" element={<NewWord />} />
          <Route path="*" element={<EmptyPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
