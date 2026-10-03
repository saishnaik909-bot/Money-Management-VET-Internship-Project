// WEEK 13 - React Router: each URL shows a different page.
// The Chatbot is placed here so the floating button shows on every page.
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Chatbot from "./components/Chatbot";
import Dashboard from "./pages/Dashboard";
import LogBook from "./pages/LogBook";

function App() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/logbook" element={<LogBook />} />
        </Routes>
      </div>
      <Chatbot />
    </div>
  );
}

export default App;
