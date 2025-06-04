import { IonPage, IonContent, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "@/components/header";
import Footer from "@/components/footer";
import UsuarioResumenView from "@/components/perfil/UsuarioResumenView";
import { DatosService } from "@/services/datos-service";
import SideBar from "@/components/sideBar";

const UsuarioVista = () => {
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const data = await DatosService.fetchUsuarioPorId(id);
        setUsuario(data);
      } catch (err) {
        console.error("Error al obtener el usuario", err);
        setError("No se pudo cargar el usuario");
      } finally {
        setCargando(false);
      }
    };

    fetchUsuario();
  }, [id]);

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />


        <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
          <SideBar />
            
          <div className="flex-1 ion-padding overflow-auto">
            {cargando && <IonText>Cargando usuario...</IonText>}
            {error && <IonText color="danger">{error}</IonText>}
            {usuario && <UsuarioResumenView usuario={usuario} />}
          </div>
        </div>

        
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default UsuarioVista;
