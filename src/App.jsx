import './style/App.css'
import { Routes, Route } from 'react-router-dom';
import { Homepage } from './components/Homepage';
import { Dashboard } from './components/Dashboard';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  // const [token, setToken] = useState("");

  return (
    <>
      <GoogleOAuthProvider clientId="61433605438-3f0ajbbbntafustnuu26m1t96jouabj9.apps.googleusercontent.com">
        {/* <header>
          <a href="/">Home</a>
          <a href="/dashboard">Dashboard</a>
        </header> */}
        <Routes>
          <Route exact path="/" element={<Homepage />}/>
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </GoogleOAuthProvider>
    </>
  )
}

export default App
