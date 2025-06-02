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
} from "@ionic/react";
import {
  schoolOutline,
  businessOutline,
  mailOutline,
  shieldCheckmark,
} from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";

const UsuarioResumenView = ({ usuario }) => {
  const { t } = useTranslation("profile");

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
            style={{
              fontSize: "1.6rem",
              fontWeight: 600,
              marginBottom: "0.5rem",
            }}
          >
            {usuario.nombre}
          </IonCardTitle>
          <IonText color="medium">
            <p style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
              <IonIcon icon={mailOutline} style={{ marginRight: "0.5rem" }} />
              {usuario.email}
            </p>
            <IonChip color="primary" style={{ fontSize: "0.9rem" }}>
              <IonIcon icon={shieldCheckmark} />
              &nbsp;
              <IonLabel>{t(`roles.${usuario.rol}`)}</IonLabel>
            </IonChip>
          </IonText>
        </IonCardContent>
      </IonCard>

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
              {t("profile.competencies.title")}
            </IonLabel>
          </IonItem>
          <div slot="content" style={{ padding: "1.5rem" }}>
            {usuario.competencias?.length > 0 ? (
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
            ) : (
              <IonText color="medium">{t("profile.competencies.no_registered")}</IonText>
            )}
          </div>
        </IonAccordion>

        {/* -------- OCUPACIONES SUGERIDAS -------- */}
        <IonAccordion>
          <IonItem slot="header" color="light">
            <IonIcon
              icon={businessOutline}
              slot="start"
              color="secondary"
              style={{ marginRight: "0.75rem" }}
            />
            <IonLabel style={{ fontSize: "1.2rem", fontWeight: "500" }}>
              {t("profile.suggestions.title")}
            </IonLabel>
          </IonItem>
          <div slot="content" style={{ padding: "1.5rem" }}>
            {usuario.ocupacionesSugeridas?.length > 0 ? (
              <IonList lines="none">
                {usuario.ocupacionesSugeridas.map((o) => (
                  <IonItem
                    key={o.id}
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
                      icon={businessOutline}
                      slot="start"
                      color="secondary"
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
                          marginBottom: "0.4rem",
                        }}
                      >
                        {o.nombre}
                      </h2>
                      <IonText color="medium">
                        <p
                          style={{
                            fontSize: "0.95rem",
                            lineHeight: "1.5rem",
                          }}
                        >
                          {o.descripcion}
                        </p>
                      </IonText>
                      {o.codigoIsco && (
                        <IonChip color="medium" style={{ fontSize: "0.75rem" }}>
                          <IonLabel>ISCO: {o.codigoIsco}</IonLabel>
                        </IonChip>
                      )}
                    </IonLabel>
                  </IonItem>
                ))}
              </IonList>
            ) : (
              <IonText color="medium">{t("profile.suggestions.none")}</IonText>
            )}
          </div>
        </IonAccordion>
      </IonAccordionGroup>
    </div>
  );
};

export default UsuarioResumenView;
