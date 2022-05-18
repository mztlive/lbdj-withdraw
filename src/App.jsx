import { Route, Routes } from "solid-app-router";

import Main from "./pages/main";
import Login from "./pages/login";

function App() {
  return (
    <Routes>
      <Route path="/withdrawlist" element={<Main />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </Routes>
  );
}

export default App;
