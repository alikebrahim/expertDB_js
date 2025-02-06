// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

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
