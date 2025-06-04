import { IonApp } from '@ionic/react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// --- Componentes de V0.4 ---
import Home from './pages/public/home/page'
import About from './pages/public/about/page'
import Contact from './pages/public/contact/page'
import Foro from './pages/public/foro/page'
import Login from './pages/public/login/page'
import Register from './pages/public/register/page'
import MainLayout from './layouts/mainLayout'
import ForoDetails from './components/foro/ForoDetails'
import Perfil from './pages/private/perfil/page'
import Usuarios from './pages/private/vista_usuarios/page'
import UsuarioVista from './pages/private/vista_usuarios/page-detalle'
import RedirectIfAuthenticated from './routes/redirectAuthenticate'
import ProtectedRoute from './routes/protectedRoute'
import Analitica from './pages/private/analitica/page'
import Competencias from './pages/private/competencias/page'
import Ocupaciones from './pages/private/ocupaciones/page'
import ForoUser from './pages/private/foro/page'
import BuscadorEsco from './pages/private/buscadorEsco/page'
import OcupacionDetalle from './components/ocupaciones/OcupacionDetalle'
import ForoUserDetails from './components/foro/foroUserDetails'
import CrearForoPage from './pages/private/foro/crear/page'
// Configuración del router de react-router-dom v6
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', element: <About /> },
      { path: '/foro', element: <Foro /> },
      { path: '/foro/:id', element: <ForoDetails /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <RedirectIfAuthenticated><Login /></RedirectIfAuthenticated> },
      { path: '/register', element: <RedirectIfAuthenticated><Register /></RedirectIfAuthenticated> },

      // Rutas protegidas
      {
        element: <ProtectedRoute />,
        children: [
          { path: '/perfil', element: <Perfil /> },
          { path: '/usuarios', element: <Usuarios /> },
          { path: '/usuarios/:id', element: <UsuarioVista /> },
          { path: '/estadisticas', element: <Analitica /> },
          { path: '/usuario/competencias', element: <Competencias /> },
          { path: '/usuario/ocupaciones', element: <Ocupaciones /> },
          { path: '/usuario/ocupaciones/:id', element: <OcupacionDetalle /> },
          { path: '/usuario/foro', element: <ForoUser /> },
          { path: '/usuario/foro/:id', element: <ForoUserDetails /> },
          { path: '/usuario/foro/crear', element: <CrearForoPage /> },
          { path: '/usuario/buscador', element: <BuscadorEsco /> },
        ],
      },
    ],
  },
])

function App() {
  return (
    <IonApp>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </IonApp>
  )
}

export default App
