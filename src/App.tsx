import '@/App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import { HomePage, LoginPage, RegisterPage } from '@pages/index'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  )
}

export default App
