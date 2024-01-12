import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskBoard from "./components/TaskBoard";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/task-board" element={<TaskBoard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
