import { NavLink } from 'react-router-dom'
import { IonFooter, IonToolbar } from '@ionic/react'
import logo from '../assets/logo.png'
import euFlag from '../assets/banderaEuropea.png'

const Footer = () => {
  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Foro', href: '/foro' },
    { name: 'Acerca de', href: '/about' },
    { name: 'Contacto', href: '/contact' },
  ]

  return (
    <IonFooter>
      <IonToolbar>
        {/* Aquí aplicamos todo el estilo con un div */}
        <div className="w-full bg-[#003060] text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Logo y descripción */}
              <div className="space-y-4">
                <NavLink to="/" className="flex items-center">
                  <img src={logo} alt="ESCO para todos" className="h-10 w-auto" />
                </NavLink>
                <p className="text-sm !text-gray-300">
                  Plataforma educativa basada en la clasificación ESCO para facilitar el acceso a habilidades y ocupaciones.
                </p>
              </div>

              {/* Navegación */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Navegación</h3>
                <ul className="space-y-2 text-sm">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className="!text-white hover:!text-blue-400 no-underline transition-colors"
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recursos */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Recursos</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a
                      href="https://esco.ec.europa.eu/es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!text-white hover:!text-blue-400 no-underline transition-colors"
                    >
                      ESCO Oficial
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ec.europa.eu/esco/portal/skill"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!text-white hover:!text-blue-400 no-underline transition-colors"
                    >
                      Habilidades y Competencias
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ec.europa.eu/esco/portal/occupation"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="!text-white hover:!text-blue-400 no-underline transition-colors"
                    >
                      Ocupaciones
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">Legal</h3>
                <ul className="space-y-2 text-sm">
                  <li>
                    <NavLink
                      to="/privacy"
                      className="!text-white hover:!text-blue-400 no-underline"
                    >
                      Política de Privacidad
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/terms"
                      className="!text-white hover:!text-blue-400 no-underline"
                    >
                      Términos y Condiciones
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/cookies"
                      className="!text-white hover:!text-blue-400 no-underline"
                    >
                      Política de Cookies
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Derechos */}
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
              <p>
                &copy; {new Date().getFullYear()} ESCO para todos. Todos los derechos reservados.
              </p>
              <div className="mt-2 flex justify-center">
                <img src={euFlag} alt="European Union" className="h-5 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </IonToolbar>
    </IonFooter>
  )
}

export default Footer
