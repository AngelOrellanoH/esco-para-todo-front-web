import { NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { IonHeader, IonToolbar } from '@ionic/react'
import logo from '../assets/logo.png'

const Header = () => {
  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Foro', href: '/foro' },
    { name: 'Acerca de', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ]

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { pathname } = useLocation()

  return (
    <>
      <IonHeader className="!bg-white dark:!bg-gray-950 shadow-sm">
        <IonToolbar>
          <div className="container mx-auto px-4 w-full">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <NavLink to="/" className="flex items-center">
                  <img src={logo} alt="ESCO para todos" className="h-10 w-auto" />
                </NavLink>
              </div>

              {/* Navegación */}
              <nav className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:!text-blue-600 ${
                        isActive ? '!text-blue-600' : '!text-gray-700 dark:!text-gray-300'
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              {/* Botones */}
              <div className="hidden md:flex items-center space-x-2">
                <NavLink 
                  to="/login"
                  className="!text-gray-700 dark:!text-gray-300 border border-gray-300 text-sm px-4 py-1.5 rounded transition-colors hover:!bg-gray-100 hover:!text-black dark:border-gray-600 dark:hover:!bg-gray-800 dark:hover:!text-white"
                >
                    Iniciar sesión 
                </NavLink>
                <NavLink 
                  to="/register"
                  className="!bg-blue-600 !text-white text-sm px-4 py-1.5 rounded hover:!bg-blue-700 transition-colors"
                >
                    Registrarse
                </NavLink>
              </div>

              {/* Botón menú móvil */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="ml-2 inline-flex items-center justify-center !rounded-md p-2 !text-gray-700 hover:!bg-gray-100 hover:!text-gray-900 focus:!outline-none focus:!ring-2 focus:!ring-inset focus:!ring-blue-600 dark:!text-gray-300 dark:hover:!bg-gray-800 dark:hover:!text-gray-100"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="sr-only">Abrir menú</span>
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      {/* Menú móvil */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 shadow-md z-50 relative">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={`block !rounded-md px-3 py-2 !text-base font-medium ${
                  pathname === item.href
                    ? '!bg-blue-600 !text-white'
                    : '!text-gray-700 hover:!bg-gray-50 hover:!text-blue-600 dark:!text-gray-300 dark:hover:!bg-gray-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            <div className="mt-4 flex flex-col space-y-2 px-3">
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="w-full !justify-center !border !border-gray-300 !text-sm !px-4 !py-2 !min-h-[44px] !rounded !text-black hover:!bg-gray-100 dark:!border-gray-600 dark:hover:!bg-gray-800 inline-flex items-center"
              >
                Iniciar sesión
              </NavLink>
              <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full justify-start bg-blue-600 text-white text-sm px-4 !py-2 !min-h-[44px] rounded hover:bg-blue-700">
                  Registrarse
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Header