import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Chat from './components/Chat'
import LoginScreen from './components/Login'
import RegisterScreen from './components/Register'
import NotFound from './components/NotFound';

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
