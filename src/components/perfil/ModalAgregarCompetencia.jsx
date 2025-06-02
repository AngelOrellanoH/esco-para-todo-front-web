import {
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonCheckbox,
  IonIcon,
  IonChip,
  IonButtons,
  IonSelect,
  IonSelectOption,
  IonToast,
  IonText 
} from "@ionic/react";
import { closeOutline, cubeOutline } from "ionicons/icons";
import { useState, useEffect } from "react";
import { CompetenciaService } from "@/services/competencia-service";
import { useTranslation } from "react-i18next"; 

const ModalAgregarCompetencia = ({ isOpen, onClose, onAdd, usuario }) => {
  const { t } = useTranslation('profile');

  const [competenciasDisponibles, setCompetenciasDisponibles] = useState([]);
  const [seleccionadas, setSeleccionadas] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [textoFiltro, setTextoFiltro] = useState("");
  const [tiposSeleccionados, setTiposSeleccionados] = useState([]);

  useEffect(() => {
    if (isOpen) {
      CompetenciaService.obtenerTodas()
        .then(setCompetenciasDisponibles)
        .catch(() => setMensaje(t("profile.competencies.modal.error_loading"))); 
    }
  }, [isOpen, t]); 

  const handleGuardar = async () => {
    try {
      await CompetenciaService.asignarCompetencias(seleccionadas);
      setMensaje(t("profile.competencies.modal.success_message")); 
      onAdd();
      onClose();
    } catch {
      setMensaje(t("profile.competencies.modal.error_adding"));
    }
  };

  const toggleSeleccion = (id) => {
    setSeleccionadas((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : [...prev, id]
    );
  };

  const competenciasFiltradas = competenciasDisponibles
    .filter((c) =>
      c.nombre.toLowerCase().includes(textoFiltro.toLowerCase())
    )
    .filter((c) =>
      tiposSeleccionados.length > 0 ? tiposSeleccionados.includes(c.tipo) : true
    );

  return (
    <>
      <IonModal
        isOpen={isOpen}
        onDidDismiss={onClose}
        style={{
          "--width": "50%",
          "--height": "70%",
          "--border-radius": "1rem",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
          overflow: "hidden",
        }}
      >
        <IonHeader>
          <IonToolbar style={{ borderBottom: "1px solid #eee" }}>
            <IonTitle style={{ fontWeight: "bold", fontSize: "1.2rem", textAlign: "center" }}>
              {t("profile.competencies.modal.title")} {/* ¡TRADUCIR! */}
            </IonTitle>
            <IonButtons slot="end">
              <IonButton fill="clear" onClick={onClose}>
                <IonIcon icon={closeOutline} slot="icon-only" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          {/* Buscador */}
          <IonInput
            placeholder={t("profile.competencies.modal.search_placeholder")}
            value={textoFiltro}
            onIonInput={(e) => setTextoFiltro(e.detail.value)}
            style={{
              marginBottom: "1rem",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
              padding: "0.5rem 1rem",
            }}
          />

          {/* Filtro por tipo */}
          <IonSelect
            placeholder={t("profile.competencies.modal.filter_placeholder")} 
            multiple
            interface="popover"
            onIonChange={(e) => setTiposSeleccionados(e.detail.value)}
            style={{
              marginBottom: "1.25rem",
              padding: "0.5rem",
              border: "1px solid #ccc",
              borderRadius: "0.5rem",
            }}
          >
            {[...new Set(competenciasDisponibles.map((c) => c.tipo))].map((tipo) => (
              <IonSelectOption key={tipo} value={tipo}>
                {tipo}
              </IonSelectOption>
            ))}
          </IonSelect>

          {/* Lista visual de competencias */}
          {competenciasFiltradas.length === 0 ? (
            <IonText color="medium">
              <p className="ion-text-center">{t("profile.competencies.modal.no_competencies_found")}</p> 
            </IonText>
          ) : (
            competenciasFiltradas.map((comp) => (
              <IonItem
                key={comp.id}
                style={{
                  border: "1px solid #e0e0e0",
                  borderRadius: "0.75rem",
                  padding: "1rem",
                  marginBottom: "1rem",
                  alignItems: "flex-start",
                }}
              >
                <IonCheckbox
                  slot="start"
                  checked={seleccionadas.includes(comp.id)}
                  onIonChange={() => toggleSeleccion(comp.id)}
                  style={{ marginTop: "0.5rem", marginRight: "0.75rem" }}
                />
                <IonIcon
                  icon={cubeOutline}
                  color="primary"
                  style={{ fontSize: "1.3rem", marginTop: "0.6rem", marginRight: "0.75rem" }}
                />
                <IonLabel>
                  <h2 style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>
                    {comp.nombre}
                  </h2>
                  <IonChip
                    color="tertiary"
                    style={{
                      fontSize: "0.7rem",
                      marginBottom: "0.4rem",
                      background: "#f0ecfc",
                      color: "#6633cc",
                      textTransform: "uppercase",
                    }}
                  >
                    {comp.tipo}
                  </IonChip>
                  <p style={{ fontSize: "0.9rem", color: "#444" }}>{comp.descripcion}</p>
                </IonLabel>
              </IonItem>
            ))
          )}


          <IonButton
            expand="block"
            className="ion-margin-top"
            onClick={handleGuardar}
            disabled={seleccionadas.length === 0}
          >
            {t("profile.competencies.modal.save_button")} 
          </IonButton>
        </IonContent>
      </IonModal>

      <IonToast
        isOpen={!!mensaje}
        message={mensaje}
        duration={2000}
        onDidDismiss={() => setMensaje("")}
      />
    </>
  );
};

export default ModalAgregarCompetencia;