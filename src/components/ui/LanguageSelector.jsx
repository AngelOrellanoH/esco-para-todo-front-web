import { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSelector = ({ onLanguageChange, isMobile = false }) => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownContainerRef = useRef(null); 
  const buttonRef = useRef(null);
  const portalContentRef = useRef(null); 
  const [dropdownStyle, setDropdownStyle] = useState({}); 

  const languages = [
    { code: 'es', short: t("language.es_short"), long: t("language.es_long") },
    { code: 'en', short: t("language.en_short"), long: t("language.en_long") },
    { code: 'pt', short: t("language.pt_short"), long: t("language.pt_long") },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language);

  const handleSelectLanguage = (langCode) => {
    onLanguageChange(langCode);
    setIsOpen(false);
  };

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
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect(); 
      
      let newStyle = {
        position: 'fixed', 
        zIndex: 1000, 
      };

      if (isMobile) {
        newStyle.top = rect.bottom; 
        newStyle.left = 0;
        newStyle.width = '100%';
        newStyle.paddingLeft = '1rem'; 
        newStyle.paddingRight = '1rem';
      } else {
        newStyle.top = rect.bottom;
        newStyle.left = rect.right - 128; 
        newStyle.width = '128px'; 
      }
      setDropdownStyle(newStyle);
    }

    const handleResize = () => {
      if (isOpen && buttonRef.current) { 
        const rect = buttonRef.current.getBoundingClientRect();
        let updatedStyle = {
          position: 'fixed',
          zIndex: 1000,
        };
        if (isMobile) {
          updatedStyle.top = rect.bottom;
          updatedStyle.left = 0;
          updatedStyle.width = '100%';
          updatedStyle.paddingLeft = '1rem';
          updatedStyle.paddingRight = '1rem';
        } else {
          updatedStyle.top = rect.bottom;
          updatedStyle.left = rect.right - 128;
          updatedStyle.width = '128px';
        }
        setDropdownStyle(updatedStyle);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, isMobile]); 

  const portalRoot = document.getElementById('dropdown-root');
  if (!portalRoot) {
    console.error("ERROR: El elemento con ID 'dropdown-root' no se encontró en el DOM. Asegúrate de añadirlo a tu index.html.");
    return null;
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownContainerRef}>
      <div>
        <button
          type="button"
          ref={buttonRef} 
          className={`flex items-center justify-center text-sm border border-gray-300 rounded px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-900 dark:text-white ${isMobile ? 'w-full' : ''}`}
          id="menu-button"
          aria-expanded={isOpen ? "true" : "false"}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Globe className="w-4 h-4 text-gray-500 dark:text-gray-300 mr-1" />
          {currentLanguage ? currentLanguage.short : i18n.language.toUpperCase()}
          <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.23 8.29a.75.75 0 010-1.08z" clipRule="evenodd" />
          </svg>
        </button>
      </div>

      {isOpen && ReactDOM.createPortal( 
        <div
          ref={portalContentRef}
          className={`rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800`}
          style={dropdownStyle} 
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleSelectLanguage(lang.code)}
                className={`block w-full text-left px-4 py-2 text-sm ${
                  i18n.language === lang.code ? 'bg-blue-100 text-blue-900 dark:bg-blue-800 dark:text-white' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-200 dark:hover:bg-gray-700'
                }`}
                role="menuitem"
                tabIndex="-1"
                id={`menu-item-${lang.code}`}
              >
                {lang.long}
              </button>
            ))}
          </div>
        </div>,
        portalRoot 
      )}
    </div>
  );
};

export default LanguageSelector;