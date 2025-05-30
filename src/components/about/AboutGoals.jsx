import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Globe, BookOpen, Code, LineChart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const AboutGoals = () => {
  const { t } = useTranslation('about');

  const goals = t('goals.items', { returnObjects: true }).map((item, index) => ({
    icon: [
      <Target key="target" className="h-8 w-8 !text-[#00a19a]" />,
      <Users key="users" className="h-8 w-8 !text-[#00a19a]" />,
      <Globe key="globe" className="h-8 w-8 !text-[#00a19a]" />,
      <BookOpen key="bookOpen" className="h-8 w-8 !text-[#00a19a]" />,
      <Code key="code" className="h-8 w-8 !text-[#00a19a]" />,
      <LineChart key="lineChart" className="h-8 w-8 !text-[#00a19a]" />,
    ][index],
    title: item.title,
    description: item.description,
  }));

  return (
    <section className="py-12 !bg-gray-50 dark:!bg-gray-900 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold !text-[#003060] mb-4">{t('goals.title')}</h2>
          <p className="text-lg !text-gray-600 dark:!text-gray-400 max-w-3xl mx-auto">
            {t('goals.subtitle')}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {goal.icon}
                <CardTitle className="text-xl">{goal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="!text-gray-600 dark:!text-gray-400">{goal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutGoals;