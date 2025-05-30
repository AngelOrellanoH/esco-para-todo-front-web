import { useTranslation } from "react-i18next"; 

const AboutBanner = () => {
  const { t } = useTranslation('about');

  return (
    <section className="py-12 md:py-16">
      <div className="text-center">
        <h1 className="text-4xl font-bold !text-[#003060] mb-6">
          {t("banner.title")} 
        </h1>
        <div className="max-w-3xl mx-auto">
          <p className="text-lg !text-gray-600 dark:!text-gray-400 mb-6">
            {t("banner.description")} 
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-20 !bg-[#00a19a] rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutBanner;