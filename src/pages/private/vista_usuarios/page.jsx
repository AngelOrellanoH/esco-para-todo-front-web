import {
  IonPage,
  IonContent,
  IonInput,
  IonList,
  IonItem,
  IonLabel,
  IonAvatar,
  IonText,
  IonIcon,
} from "@ionic/react";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { searchOutline } from "ionicons/icons";
import { DatosService } from "@/services/datos-service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SideBar from "@/components/sideBar";

const Usuarios = () => {
  const { t } = useTranslation("profile");
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    DatosService.fetchAllUsers()
      .then(setUsuarios)
      .catch((err) => {
        console.error("Error al cargar usuarios", err);
      });
  }, []);

  const usuariosFiltrados = usuarios.filter((u) =>
    u.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <IonPage>
      <IonContent fullscreen>
        <Header />

        <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
          <SideBar />

          <div className="flex-1 ion-padding overflow-auto">
            <h1 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
              {t("profile.search.title", "Buscar usuarios")}
            </h1>

            <IonInput
              value={busqueda}
              onIonInput={(e) => setBusqueda(e.detail.value)}
              placeholder={t("profile.search.placeholder", "Buscar por nombre")}
              debounce={300}
              className="ion-margin-bottom"
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "8px",
                fontSize: "1rem",
              }}
            >
              <IonIcon icon={searchOutline} slot="start" />
            </IonInput>

            <IonList lines="none">
              {usuariosFiltrados.map((u) => (
                <IonItem
                  key={u.id}
                  button
                  onClick={() => navigate(`/usuarios/${u.id}`)}
                  style={{
                    border: "1px solid #e5e5e5",
                    borderRadius: "0.75rem",
                    marginBottom: "1rem",
                    padding: "1rem",
                    alignItems: "flex-start",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                  }}
                >
                  <IonAvatar slot="start" style={{ marginRight: "1rem" }}>
                    <img
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${u.nombre}`}
                      alt="avatar"
                    />
                  </IonAvatar>
                  <IonLabel>
                    <h2 style={{ fontSize: "1rem", fontWeight: 600 }}>{u.nombre}</h2>
                    <IonText color="medium" style={{ display: "block", marginBottom: "0.5rem" }}>
                      {u.email}
                    </IonText>
                  </IonLabel>
                </IonItem>
              ))}
            </IonList>
          </div>
        </div>
        
        <Footer />
      </IonContent>
    </IonPage>
  );
};

export default Usuarios;
