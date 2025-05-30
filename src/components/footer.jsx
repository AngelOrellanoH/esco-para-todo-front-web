import { NavLink } from 'react-router-dom';
import { IonFooter, IonToolbar } from '@ionic/react';
import logo from '../assets/logo.png';
import euFlag from '../assets/banderaEuropea.png';
import { useTranslation } from 'react-i18next'; // Importar useTranslation

const Footer = () => {
  const { t } = useTranslation('common'); // Usar el namespace 'common'

  // Las estructuras de navigation, resources y legal ahora se obtendrán del JSON
  const navigation = t('footer.navigationLinks', { returnObjects: true });
  const resources = t('footer.resourcesLinks', { returnObjects: true });
  const legal = t('footer.legalLinks', { returnObjects: true });

  return (
    <IonFooter>
      <IonToolbar>
        <div className="w-full bg-[#003060] text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              {/* Logo y descripción */}
              <div className="space-y-4">
                <NavLink to="/" className="flex items-center">
                  <img src={logo} alt="ESCO para todos" className="h-10 w-auto" />
                </NavLink>
                <p className="text-sm !text-gray-300">
                  {t('footer.description')}
                </p>
              </div>

              {/* Navegación */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">{t('footer.navigationTitle')}</h3>
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
                <h3 className="mb-4 text-lg font-semibold">{t('footer.resourcesTitle')}</h3>
                <ul className="space-y-2 text-sm">
                  {resources.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="!text-white hover:!text-blue-400 no-underline transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="mb-4 text-lg font-semibold">{t('footer.legalTitle')}</h3>
                <ul className="space-y-2 text-sm">
                  {legal.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className="!text-white hover:!text-blue-400 no-underline"
                      >
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Derechos */}
            <div className="mt-8 border-t border-gray-700 pt-6 text-center text-sm">
              <p>
                &copy; {new Date().getFullYear()} {t('footer.copyright')}
              </p>
              <div className="mt-2 flex justify-center">
                <img src={euFlag} alt="European Union" className="h-5 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;