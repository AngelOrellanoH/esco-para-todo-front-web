import { useAuth } from '@/contexts/AuthContext'
import { Navigate } from 'react-router-dom'

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <Navigate to="/perfil" /> : children
}

export default RedirectIfAuthenticated
