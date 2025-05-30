import { CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next';

const FeatureSection = () => {
  const { t } = useTranslation('home');

  const features = [
    {
      title: t('featureSection.features.0.title'),
      description: t('featureSection.features.0.description'),
    },
    {
      title: t('featureSection.features.1.title'),
      description: t('featureSection.features.1.description'),
    },
    {
      title: t('featureSection.features.2.title'),
      description: t('featureSection.features.2.description'),
    },
    {
      title: t('featureSection.features.3.title'),
      description: t('featureSection.features.3.description'),
    },
    {
      title: t('featureSection.features.4.title'),
      description: t('featureSection.features.4.description'),
    },
    {
      title: t('featureSection.features.5.title'),
      description: t('featureSection.features.5.description'),
    },
  ];

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold !text-[#003060] mb-4">
            {t('featureSection.title')}
          </h2>
          <p className="text-lg !text-gray-600 dark:!text-gray-400 max-w-3xl mx-auto">
            {t('featureSection.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <CheckCircle className="h-6 w-6 flex-shrink-0 !text-[#00a19a]" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="!text-gray-600 dark:!text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection