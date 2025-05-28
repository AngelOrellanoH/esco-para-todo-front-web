import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

const InfoSection = () => {
  const { t } = useTranslation('home'); 

  return (
    <section className="py-12 !bg-gray-50 dark:!bg-gray-900 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold !text-[#003060] mb-4">
            {t('infoSection.title')}
          </h2>
          <p className="text-lg !text-gray-600 dark:!text-gray-400 max-w-3xl mx-auto">
            {t('infoSection.description')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {t('infoSection.cards', { returnObjects: true }).map((card, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="!text-[#00a19a]">{card.title}</CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{card.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;