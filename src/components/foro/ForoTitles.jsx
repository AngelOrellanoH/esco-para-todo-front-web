import { getForos } from "@/services/foro-service";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; 

const ForoTitles = () => {
  const { t } = useTranslation('foros'); 
  const navigate = useNavigate();

  const [foros, setForos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const foros = await getForos();
        setForos(foros);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Card className="!border !bg-white dark:!bg-gray-900 dark:!text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="!text-[#003060]">{t('titles.cardTitle')}</CardTitle>
          <CardDescription className="!text-gray-600 dark:!text-gray-400">
            {t('titles.cardDescription')}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {foros.map((foro) => (
            <div
              key={foro.id}
              className="!rounded-lg !border !p-4 cursor-pointer hover:!bg-gray-50 dark:hover:!bg-gray-800 transition-colors"
              onClick={() => navigate(`/foro/${foro.id}`)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-lg !text-black dark:!text-white">{foro.titulo}</h3>
                  <p className="text-sm !text-gray-500 dark:!text-gray-400">
                    {t('titles.authorPrefix')} {t('titles.defaultAuthor')} • {foro.lastUpdate.slice(0, 10)}
                  </p>
                </div>
                <div className="flex items-center space-x-4 text-sm !text-gray-500 dark:!text-gray-400">
                  <div className="flex items-center">
                    <MessageCircle className="mr-1 h-4 w-4" />
                    <span>{t('titles.defaultMessageCount')}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {foros.length === 0 && !loading && (
            <div className="flex justify-center items-center text-blue-900 text-center">
              <h3 className="text-lg font-semibold">{t('titles.noForums')}</h3>
            </div>
          )}
          {error && (
            <div className="text-red-600 text-center font-medium">
              {t('titles.loadingError')} {error}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForoTitles;