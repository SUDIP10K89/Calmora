import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from './components/NotFound';
import Chat from "./pages/Chat";
import LoginScreen from "./pages/Login";
import RegisterScreen from "./pages/Register";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
