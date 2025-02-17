// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import "./components/profile"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/experts" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App
// <Route path="/dashboard" element={<Dashboard />} />
// <Route path="/" element={<Navigate to="/login" />} />
