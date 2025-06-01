import {
  IonCard,
  IonCardContent,
  IonCardTitle,
  IonText,
  IonItem,
  IonLabel,
  IonList,
  IonAvatar,
  IonIcon,
  IonChip,
  IonAccordionGroup,
  IonAccordion,
  IonButton
} from "@ionic/react";
import {
  mailOutline,
  shieldCheckmark,
  schoolOutline,
  documentsOutline,
  chatboxEllipses,
  timeOutline,
} from "ionicons/icons";
import ModalAgregarCompetencia from './ModalAgregarCompetencia'; 
import React, { useState } from 'react';


const PerfilView = ({ usuario,recargarDatosUsuario }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div style={{ padding: "1.5rem" }}>
      {/* -------- PERFIL -------- */}
      <IonCard className="ion-margin-bottom" color="light">
        <IonCardContent className="ion-text-center">
          <IonAvatar
            style={{ margin: "0 auto", width: "6.5rem", height: "6.5rem" }}
            className="ion-margin-bottom"
          >
            <img
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${usuario.nombre}`}
              alt="avatar"
            />
          </IonAvatar>
          <IonCardTitle
            style={{ fontSize: "1.6rem", fontWeight: 600, marginBottom: "0.5rem" }}
          >
            {usuario.nombre}
          </IonCardTitle>
          <IonText color="medium">
            <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              <IonIcon icon={mailOutline} style={{ marginRight: "0.5rem" }} />
              {usuario.email}
            </p>
            <IonChip color="primary" style={{ fontSize: "0.9rem" }}>
              <IonIcon icon={shieldCheckmark} />&nbsp;
              <IonLabel>{usuario.rol}</IonLabel>
            </IonChip>
          </IonText>
        </IonCardContent>
      </IonCard>

      {/* -------- CONTENIDO -------- */}
      <IonAccordionGroup expand="multiple">
        {/* -------- COMPETENCIAS -------- */}
        <IonAccordion>
          <IonItem slot="header" color="light">
            <IonIcon
              icon={schoolOutline}
              slot="start"
              color="primary"
              style={{ marginRight: "0.75rem" }}
            />
            <IonLabel style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              Competencias
            </IonLabel>
          </IonItem>
          <div slot="content" style={{ padding: "1.5rem" }}>
            <IonButton expand="block" fill="outline" onClick={() => setShowModal(true)}>
              Añadir Competencia
            </IonButton>
            <ModalAgregarCompetencia
              isOpen={showModal}
              onClose={() => setShowModal(false)}
              onAdd={recargarDatosUsuario}
              usuario={usuario}
            />
            {usuario.competencias.length === 0 ? (
              <IonText color="medium">No hay competencias registradas.</IonText>
            ) : (
              <IonList lines="none">
                {usuario.competencias.map((c) => (
                  <IonItem
                    key={c.id}
                    className="ion-margin-bottom"
                    style={{
                      border: "1px solid #e8e8e8",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      marginBottom: "1.25rem",
                      alignItems: "flex-start",
                    }}
                  >
                    <IonIcon
                      icon={schoolOutline}
                      slot="start"
                      color="primary"
                      style={{
                        fontSize: "1.75rem",
                        marginTop: "0.25rem",
                        marginRight: "1rem",
                      }}
                    />
                    <IonLabel>
                      <h2
                        style={{
                          fontSize: "1rem",
                          fontWeight: "bold",
                          textTransform: "capitalize",
                          marginBottom: "0.4rem",
                        }}
                      >
                        {c.nombre}
                      </h2>
                      <IonText color="medium">
                        <p
                          style={{
                            fontSize: "0.95rem",
                            lineHeight: "1.5rem",
                            marginBottom: "0.5rem",
                          }}
                        >
                          {c.descripcion}
                        </p>
                      </IonText>
                      <IonChip
                        color="tertiary"
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 500,
                          padding: "0 0.75rem",
                          textTransform: "uppercase",
                          backgroundColor: "#f0ecfc",
                          color: "#6633cc",
                        }}
                      >
                        <IonLabel>{c.tipo}</IonLabel>
                      </IonChip>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </div>
        </IonAccordion>

        {/* -------- PETICIONES -------- */}
        <IonAccordion>
          <IonItem slot="header" color="light">
            <IonIcon
              icon={documentsOutline}
              slot="start"
              color="warning"
              style={{ marginRight: "0.75rem" }}
            />
            <IonLabel style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              Peticiones a ESCO-GPT
            </IonLabel>
          </IonItem>
          <div slot="content" style={{ padding: "1.5rem" }}>
            {usuario.historico.length === 0 ? (
              <IonText color="medium">Sin historial disponible.</IonText>
            ) : (
              <IonList lines="none">
                {usuario.historico.map((h) => (
                  <IonItem
                    key={h.id}
                    style={{
                      border: "1px solid #f1f1f1",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      marginBottom: "1.25rem",
                      alignItems: "flex-start",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <IonIcon
                      icon={documentsOutline}
                      slot="start"
                      color="warning"
                      style={{ fontSize: "1.75rem", marginTop: "0.25rem", marginRight: "1rem" }}
                    />
                    <IonLabel>
                      <h2 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                        📥 {h.input}
                      </h2>
                      <p style={{ marginBottom: "0.3rem" }}>
                        <strong>Modelo:</strong>{" "}
                        <IonText color="primary" style={{ fontWeight: 500 }}>
                          {h.model}
                        </IonText>
                      </p>
                      <p style={{ marginBottom: "0.3rem" }}>
                        <strong>Resultados:</strong> {h.numResults} &nbsp;|&nbsp;
                        <strong>Tiempo:</strong> {h.timeSeconds.toFixed(2)}s
                      </p>
                      <p style={{ marginBottom: "0.3rem" }}>
                        <strong>Avg. Distancia:</strong>{" "}
                        <IonChip color="medium" style={{ fontSize: "0.75rem" }}>
                          <IonLabel>{h.avgDistance.toFixed(3)}</IonLabel>
                        </IonChip>
                      </p>
                      <p style={{ marginBottom: "0.3rem" }}>
                        <IonIcon icon={timeOutline} />{" "}
                        <small>{new Date(h.timestamp).toLocaleString()}</small>
                      </p>
                      <IonText color="success" style={{ fontWeight: "500" }}>
                        {h.mensajeRespuesta}
                      </IonText>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </div>
        </IonAccordion>

        {/* -------- FOROS -------- */}
        <IonAccordion>
          <IonItem slot="header" color="light">
            <IonIcon
              icon={chatboxEllipses}
              slot="start"
              color="success"
              style={{ marginRight: "0.75rem" }}
            />
            <IonLabel style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              Foros Suscritos
            </IonLabel>
          </IonItem>
          <div slot="content" style={{ padding: "1.5rem" }}>
            {usuario.forosSuscritos.length === 0 ? (
              <IonText color="medium">No estás suscrito a ningún foro aún.</IonText>
            ) : (
              <IonList lines="none">
                {usuario.forosSuscritos.map((foro) => (
                  <IonItem
                    key={foro.id}
                    style={{
                      border: "1px solid #f1f1f1",
                      borderRadius: "0.75rem",
                      padding: "1rem",
                      marginBottom: "1.25rem",
                      alignItems: "flex-start",
                      boxShadow: "0px 2px 4px rgba(0,0,0,0.05)",
                    }}
                  >
                    <IonIcon
                      icon={chatboxEllipses}
                      slot="start"
                      color="success"
                      style={{ fontSize: "1.75rem", marginTop: "0.25rem", marginRight: "1rem" }}
                    />
                    <IonLabel>
                      <h2 style={{ fontSize: "1rem", fontWeight: "bold", marginBottom: "0.4rem" }}>
                        {foro.titulo}
                      </h2>
                      <IonText color="medium">
                        <p style={{ fontSize: "0.95rem", marginBottom: "0.5rem" }}>
                          {foro.descripcion}
                        </p>
                      </IonText>
                      <p>
                        <IonIcon icon={timeOutline} style={{ marginRight: "0.3rem" }} />
                        <small>
                          Última actualización:{" "}
                          {new Date(foro.lastUpdate).toLocaleString()}
                        </small>
                      </p>
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            )}
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

export default PerfilView;
