import { IonApp } from '@ionic/react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/public/home/page'
import About from './pages/public/about/page'
import Contact from './pages/public/contact/page'
import Foro from './pages/public/foro/page'
import Login from './pages/public/login/page'
import Register from './pages/public/register/page'
import MainLayout from './layouts/mainLayout'
import ForoDetails from './components/foro/ForoDetails'


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
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
    ],
  },
])


function App() {
  return (
    <IonApp>    
      <RouterProvider router={router} />
    </IonApp>
  )
}

export default App