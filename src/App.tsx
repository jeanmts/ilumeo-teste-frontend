
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/Login'
import RegisterEntry from './pages/RegisterEntry/RegisterEntry'
import RegisterExit from './pages/RegisterExit/RegisterExit'
import RecordHistory from './pages/RecordHistory/RecordHistory'

function App() {

  return (
    <>
    <Routes>
      <Route path="/collaborators" element = {<Login/>}/>
      <Route path="/" element={<Login/>} />
      <Route path="/register/entry" element={<RegisterEntry/>}/>
      <Route path="/register/exit" element={<RegisterExit/>}/>
      <Route path="/history/:contributor_code" element={<RecordHistory/>}/>
    </Routes>
    </>
  )
}

export default App
