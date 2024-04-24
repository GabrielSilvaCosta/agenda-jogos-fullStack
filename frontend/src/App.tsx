import Jogos from "./components/jogos";
import Login from "./components/login";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/jogos" element={<Jogos />} />
      </Routes>
    </div>
  );
}

export default App;
