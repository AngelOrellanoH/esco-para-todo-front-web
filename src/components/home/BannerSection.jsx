import { NavLink } from 'react-router-dom';
import banner from '../../assets/Esco-banner.jpg';
import { useTranslation } from 'react-i18next';

const BannerSection = () => {
  const { t } = useTranslation('home');

  return (
    <section className="py-12 md:py-20">
      <div className="grid gap-8 md:grid-cols-2 md:gap-12 items-center">
        {/* Texto principal */}
        <div className="space-y-6">
          <h1 className="text-4xl font-bold tracking-tight !text-[#003060] sm:text-5xl md:text-6xl">
            {t('bannerSection.title')}
          </h1>
          <p className="text-lg !text-gray-600 dark:!text-gray-400">
            {t('bannerSection.description')}
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4">
            <NavLink
              to="/about"
              className="text-blue-600 border border-blue-600 text-base font-semibold px-6 py-3 rounded-md hover:!bg-blue-50 transition text-center"
            >
              {t('bannerSection.learnMoreButton')}
            </NavLink>
            <NavLink
              to="/register"
              className="!bg-blue-600 !text-white text-base font-semibold px-6 py-3 rounded-md hover:!bg-blue-700 transition text-center"
            >
              {t('bannerSection.startButton')}
            </NavLink>
          </div>
        </div>

        {/* Imagen de ejemplo */}
        <div className="flex justify-center">
          <div className="w-full h-64 md:h-80 bg-gray-200 rounded-lg flex items-center justify-center">
            <img
              src={banner}
              alt={t('bannerSection.imageAlt')}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;