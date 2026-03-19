import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth";
import Home from "./pages/home";
import Protected from "./components/auth/protected";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />

        <Route element={<Protected />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
