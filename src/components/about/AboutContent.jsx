import { Card, CardContent } from '@/components/ui/card';
import escoProyect from '@/assets/ESCO-proyect.png';
import { useTranslation } from 'react-i18next';

const AboutContent = () => {
  const { t } = useTranslation('about');

  return (
    <section className="py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold !text-[#003060] mb-6">{t('content.title')}</h2>
          <div className="space-y-4">
            <p className="!text-gray-600 dark:!text-gray-400">{t('content.p1')}</p>
            <p className="!text-gray-600 dark:!text-gray-400">{t('content.p2')}</p>
            <p className="!text-gray-600 dark:!text-gray-400">{t('content.p3')}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="overflow-hidden w-full max-w-md">
            <CardContent className="p-0">
              <img
                src={escoProyect}
                alt="ESCO para todos"
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutContent;