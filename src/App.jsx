import { Route, Routes } from "solid-app-router";

import Main from "./pages/main";
import Login from "./pages/login";
import OperationLogs from "./pages/operationlog";

function App() {
  return (
    <Routes>
      <Route path="/withdrawlist" element={<Main />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/operationlogs" element={<OperationLogs />}></Route>
    </Routes>
  );
}

export default App;
