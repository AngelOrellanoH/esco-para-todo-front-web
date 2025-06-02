// src/components/ui/UserDropdown.jsx
import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom'; 
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronUp, User, LogOut } from 'lucide-react'; 

const UserDropdown = ({ user, onLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null); 
  const portalContentRef = useRef(null); 
  const [dropdownStyle, setDropdownStyle] = useState({}); 

  const handleToggle = () => setIsOpen(!isOpen);

  const handleViewProfile = () => {
    navigate("/perfil");
    setIsOpen(false); 
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsOpen(false); 
  };

  // Efecto para cerrar el dropdown al hacer clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        buttonRef.current && !buttonRef.current.contains(event.target) &&
        portalContentRef.current && !portalContentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Efecto para calcular y actualizar la posición del dropdown al abrirlo o redimensionar la ventana
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
    
      setDropdownStyle({
        position: 'fixed',
        zIndex: 1000,
        top: rect.bottom + 5,
        left: rect.right - 180, 
        width: '180px', 
      });
    }

    const handleResize = () => {
      if (isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        // Recalcula la posición en caso de redimensionamiento
        setDropdownStyle({
          position: 'fixed',
          zIndex: 1000,
          top: rect.bottom + 5,
          left: rect.right - 180,
          width: '180px',
        });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

 
  const portalRoot = document.getElementById('dropdown-root');
  if (!portalRoot) {
    console.error("ERROR: El elemento con ID 'dropdown-root' no se encontró en el DOM. Asegúrate de añadirlo a tu index.html.");
    return null; 
  }

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          ref={buttonRef}
          className="flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300 py-1.5 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
          id="user-menu-button"
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {/* Muestra el nombre del usuario o un texto por defecto */}
          👤 {user?.nombre || t("nav.user")}
          {/* Cambia el icono de flecha según si el dropdown está abierto o cerrado */}
          {isOpen ? (
            <ChevronUp className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-300" />
          ) : (
            <ChevronDown className="ml-1 h-4 w-4 text-gray-500 dark:text-gray-300" />
          )}
        </button>
      </div>

      {/* Renderiza el contenido del dropdown usando un portal para evitar problemas de z-index */}
      {isOpen && ReactDOM.createPortal(
        <div
          ref={portalContentRef}
          className={`rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800`}
          style={dropdownStyle}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {/* Opción para ver el perfil */}
            <button
              onClick={handleViewProfile}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-profile"
            >
              <User className="mr-2 h-4 w-4" />
              {t("nav.view_profile")}
            </button>

            {/* Separador visual entre opciones */}
            <div className="border-t border-gray-100 dark:border-gray-700 my-1" role="separator"></div>

            {/* Botón para cerrar sesión */}
            <button
              onClick={handleLogoutClick}
              className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900"
              role="menuitem"
              tabIndex="-1"
              id="user-menu-item-logout"
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t("nav.logout")}
            </button>
          </div>
        </div>,
        portalRoot
      )}
    </div>
  );
};

export default UserDropdown;