import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MapPin, Phone, Clock, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const ContactInfo = () => {
  const { t } = useTranslation('contact');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold !text-[#003060] mb-4">{t('info.title')}</h1>
        <p className="text-lg !text-gray-600 dark:!text-gray-400">
          {t('info.description')}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('info.card.title')}</CardTitle>
          <CardDescription>{t('info.card.description')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">{t('info.card.email.title')}</h3>
              <p className="!text-gray-600 dark:!text-gray-400">{t('info.card.email.address')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">{t('info.card.phone.title')}</h3>
              <p className="!text-gray-600 dark:!text-gray-400">{t('info.card.phone.number')}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">{t('info.card.address.title')}</h3>
              <p className="!text-gray-600 dark:!text-gray-400">
                {t('info.card.address.line1')}
                <br />
                {t('info.card.address.line2')}
                <br />
                {t('info.card.address.line3')}
                <br />
                {t('info.card.address.line4')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">{t('info.card.hours.title')}</h3>
              <p className="!text-gray-600 dark:!text-gray-400">
                {t('info.card.hours.weekday')}
                <br />
                {t('info.card.hours.weekend')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ExternalLink className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">{t('info.card.social.title')}</h3>
              <div className="flex gap-4 mt-2">
                <a href="#" className="!text-gray-600 hover:!text-[#00a19a] transition-colors">
                  {t('info.card.social.twitter')}
                </a>
                <a href="#" className="!text-gray-600 hover:!text-[#00a19a] transition-colors">
                  {t('info.card.social.linkedin')}
                </a>
                <a href="#" className="!text-gray-600 hover:!text-[#00a19a] transition-colors">
                  {t('info.card.social.facebook')}
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactInfo;