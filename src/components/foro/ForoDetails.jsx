import { IonPage, IonContent } from "@ionic/react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { getForo, getMensajes } from "@/services/foro-service";
import Footer from "../footer";
import Header from "../header";
import { useTranslation } from "react-i18next";

const ForoDetails = () => {
  const { t } = useTranslation('foros');
  const navigate = useNavigate();
  const { id } = useParams();
  const usuario = "anonimo"; 

  const [foro, setForo] = useState(null); 
  const [mensajes, setMensajes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedForo = await getForo(id);
        const fetchedMensajes = await getMensajes(id);
        setForo(fetchedForo);
        setMensajes(fetchedMensajes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (!foro && !loading) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Header />
          <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">{t('details.notFound.title')}</h1>
            <p className="mb-4">{t('details.notFound.message')}</p>
            <Link to="/foro">
              <Button>{t('details.notFound.button')}</Button>
            </Link>
          </div>
          <Footer />
        </IonContent>
      </IonPage>
    );
  }

  if (loading) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <p className="text-center py-4">{t('details.loading')}</p>
        </IonContent>
      </IonPage>
    );
  }

  if (error) {
    return (
      <IonPage>
        <IonContent fullscreen>
          <Header />
          <div className="text-center py-4 text-red-600">
            <p>{t('details.error.prefix')} {error}</p>
            <Link to="/foro">
              <Button>{t('details.error.button')}</Button>
            </Link>
          </div>
          <Footer />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <div className="container mx-auto px-4 py-8">
          <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" /> {t('details.backButton')}
          </Button>

          <h1 className="text-2xl font-bold mb-2 text-[#003060]">{foro.titulo}</h1>
          <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap gap-3">
            <span>{t('details.authorPrefix')} {t('details.defaultAuthor')}</span>
            <span>{foro.lastUpdate.slice(0, 10)}</span>
            <span className="flex items-center">
              <MessageSquare className="mr-1 h-4 w-4" /> {t('details.messageCountSuffix', { count: mensajes.length })}
            </span>
          </div>

          <Card className="mb-6 border-[#00a19a]">
            <CardHeader className="bg-[#f0fdfa] pb-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage
                      src={`https://ui-avatars.com/api/?name=${usuario
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}&background=00a19a&color=fff`}
                    />
                    <AvatarFallback>
                      {usuario
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-base">{usuario}</CardTitle>
                    <p className="text-xs text-gray-500">{t('details.topicAuthor')}</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{foro.lastUpdate.slice(0, 10)}</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div>
                <p>{mensajes[0]?.contenido}</p>
              </div>
            </CardContent>
          </Card>

          {mensajes.length > 1 && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-[#003060]">
                {t('details.repliesTitle', { count: mensajes.length - 1 })}
              </h2>
              {mensajes.slice(1).map((mensaje, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader className="bg-gray-50 pb-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-3">
                          <AvatarImage
                            src={`https://ui-avatars.com/api/?name=${usuario
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}&background=6b7280&color=fff`}
                          />
                          <AvatarFallback>
                            {usuario
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-base">{usuario}</CardTitle>
                      </div>
                      <span className="text-sm text-gray-500">{mensaje.fecha}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <div>
                      <p>{mensaje.contenido}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default ForoDetails;