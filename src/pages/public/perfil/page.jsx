import { IonPage, IonContent, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PerfilView from "@/components/perfil/PerfilView";
import { DatosService } from "@/services/datos-service";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);

  const fetchUsuarioActualizado = async () => {
    try {
      const datos = await DatosService.fetchUserProfile();
      setUsuario(datos);
    } catch (err) {
      console.error("Error al actualizar el perfil:", err);
      setError(err.message || "Error desconocido");
    }
  };

  useEffect(() => {
    fetchUsuarioActualizado();
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />
        <div className="ion-padding">
          {error && <IonText color="danger">{error}</IonText>}
          {!usuario && !error && <IonText>Cargando datos del usuario...</IonText>}
          {usuario && <PerfilView usuario={usuario} recargarDatosUsuario={fetchUsuarioActualizado} />}
        </div>
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
