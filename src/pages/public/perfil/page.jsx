import { IonPage, IonContent, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerfilView from "@/components/perfil/PerfilView";
import { DatosService } from "@/services/datos-service";
import { useTranslation } from "react-i18next"; 

const Perfil = () => {
  const { t } = useTranslation('profile'); 

  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  const fetchUsuarioActualizado = async () => {
    try {
      const datos = await DatosService.fetchUserProfile();
      setUsuario(datos);
    } catch (err) {
      console.error(t("profile.general.error_updating_profile"), err); 
      setError(err.message || t("profile.general.unknown_error"));
    }
  };

  useEffect(() => {
    fetchUsuarioActualizado();
  }, [t]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <div className="ion-padding">
          {error && <IonText color="danger">{error}</IonText>}
          {!usuario && !error && (
            <IonText>{t("profile.general.loading_user_data")}</IonText> 
          )}
          {usuario && <PerfilView usuario={usuario} recargarDatosUsuario={fetchUsuarioActualizado} />}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Perfil;