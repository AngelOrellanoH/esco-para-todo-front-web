import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { IonHeader, IonToolbar } from "@ionic/react";
import { useTranslation } from "react-i18next";
import logo from "../assets/logo.png";
import { useAuth } from "@/contexts/AuthContext";
import LanguageSelector from "./ui/LanguageSelector";

const Header = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.forum"), href: "/foro" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  return (
    <>
      <IonHeader className="!bg-white dark:!bg-gray-950 shadow-sm">
        <IonToolbar>
          <div className="container mx-auto px-4 w-full">
            <div className="flex h-16 items-center justify-between">
              <NavLink to="/" className="flex items-center">
                <img src={logo} alt="ESCO para todos" className="h-10 w-auto" />
              </NavLink>

              {/* Navegación (Desktop) */}
              <nav className="hidden md:flex items-center space-x-6">
                {navigation.map((item) => (
                  <NavLink
                    key={item.href}
                    to={item.href}
                    className={({ isActive }) =>
                      `text-sm font-medium transition-colors hover:!text-blue-600 ${
                        isActive
                          ? "!text-blue-600"
                          : "!text-gray-700 dark:!text-gray-300"
                      }`
                    }
                  >
                    {item.name}
                  </NavLink>
                ))}
              </nav>

              {/* Botones + Language Selector (Desktop) */}
              <div className="hidden md:flex items-center space-x-3 relative">
                {/* 🌐 Selector flotante */}
                <LanguageSelector onLanguageChange={changeLanguage} />

                {!isAuthenticated ? (
                  <>
                    <NavLink
                      to="/login"
                      className="text-sm border border-gray-300 px-4 py-1.5 rounded dark:text-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {t("nav.login")}
                    </NavLink>
                    <NavLink
                      to="/register"
                      className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700"
                    >
                      {t("nav.register")}
                    </NavLink>
                  </>
                ) : (
                  <>
                    <div className="text-sm text-gray-700 dark:text-gray-300 py-1.5">
                      👤 {user?.email || t("nav.user")}
                    </div>
                    <button
                      onClick={logout}
                      className="bg-blue-600 text-white text-sm px-4 py-1.5 rounded hover:bg-blue-700"
                    >
                      {t("nav.logout")}
                    </button>
                  </>
                )}
              </div>

              {/* Menú móvil (Botón toggle) */}
              <div className="md:hidden">
                <button
                  type="button"
                  className="ml-2 inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <span className="sr-only">{t("sr_only.open_menu")}</span>
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

      {/* Menú móvil desplegable */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 shadow-md z-50 relative">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block rounded-md px-3 py-2 text-base font-medium ${
                  pathname === item.href
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
              >
                {item.name}
              </NavLink>
            ))}

            {/* 🌐 Idiomas en menú móvil */}
            <div className="px-3 py-2">
              <LanguageSelector onLanguageChange={changeLanguage} isMobile={true} />
            </div>

            <div className="mt-4 flex flex-col space-y-2 px-3">
              {!isAuthenticated ? (
                <>
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full border border-gray-300 px-4 py-2 text-sm rounded dark:border-gray-600 dark:hover:bg-gray-800">
                      {t("nav.login")}
                    </button>
                  </NavLink>
                  <NavLink to="/register" onClick={() => setIsMenuOpen(false)}>
                    <button className="w-full bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700">
                      {t("nav.register")}
                    </button>
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="text-sm text-gray-700 dark:text-gray-300 px-2">
                    👤 {user?.email || t("nav.user")}
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700"
                  >
                    {t("nav.logout")}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
