import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import BottomNav from "./components/BottomNav";
import Login from "./screens/Login";
import Items from "./screens/Items";
import NewItems from "./screens/NewItem";
import Users from "./screens/Users";
import NewUsers from "./screens/NewUser";
import Types from "./screens/Types";
import NewType from "./screens/NewType";
import Profile from "./screens/Profile";

function App() {
  const user =
    localStorage.getItem("user") != undefined
      ? JSON.parse(localStorage.getItem("user"))
      : {};

  return (
    <>
      <div className="app">
        <header className="app-header">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/items" element={<Items />} />
            <Route path="/new-item" element={<NewItems />} />
            <Route path="/users" element={<Users />} />
            <Route path="/new-user" element={<NewUsers />} />
            <Route path="/types" element={<Types />} />
            <Route path="/new-type" element={<NewType />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </header>
      </div>
      {Object.keys(user).length > 0 && <BottomNav />}
    </>
  );
}

export default App;
