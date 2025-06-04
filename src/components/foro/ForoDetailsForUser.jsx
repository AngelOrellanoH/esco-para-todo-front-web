// src/components/foro/ForoDetails.jsx

import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  IonPage,
  IonContent,
  IonSpinner,
  IonToast,
  IonButton,
} from "@ionic/react";
import { getForo, getMensajes } from "@/services/foro-service";
import Header from "@/components/header";
import Footer from "@/components/footer";
import useForumChat from "@/hooks/useForumChat";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

import ForoHeaderDetails from "./ForoHeaderDetails";
import ChatStatus from "./ChatStatus";
import MessagesList from "./MessagesList";
import ChatInput from "./ChatInput";

const ForoDetailsForUser = () => {
  const { t } = useTranslation("foros");
  const navigate = useNavigate();
  const { id } = useParams();
  const { user, token } = useAuth();
  const currentUserName = user?.nombre;

  const [foro, setForo] = useState(null);
  const [historicalMessages, setHistoricalMessages] = useState([]);
  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [error, setError] = useState(null);
  const [messageInput, setMessageInput] = useState("");

  const {
    isConnected,
    forumMessages,
    notifications,
    error: chatError,
    sendMessage,
  } = useForumChat(id, token);

  const messagesEndRef = useRef(null);

  // Carga inicial: obtener foro y mensajes históricos
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoadingInitialData(true);
        const fetchedForo = await getForo(id);
        const fetchedHistorical = await getMensajes(id);
        setForo(fetchedForo);
        setHistoricalMessages(fetchedHistorical);
      } catch (err) {
        console.error("Error al cargar detalles:", err);
        setError(err.message);
      } finally {
        setLoadingInitialData(false);
      }
    };
    loadData();
  }, [id]);

  // Mapear mensajes históricos
  const mappedHistorical = historicalMessages.map((m) => ({
    username: m.nombre || "Desconocido",
    content: m.content || "[Sin contenido]",
    timestamp: m.fechaEnvio ? new Date(m.fechaEnvio) : new Date(),
  }));

  // Mapear mensajes en tiempo real (STOMP)
  const mappedLive = forumMessages.map((m) => ({
    username: m.username || "Desconocido",
    content: m.content || "[Sin contenido]",
    // Aquí usamos el Date real que nos envió useForumChat en timestampRaw:
    timestamp: m.timestampRaw instanceof Date ? m.timestampRaw : new Date(),
  }));

  // Mezclar y ordenar todos los mensajes por fecha ascendente
  const allMessages = [...mappedHistorical, ...mappedLive].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  // Construir formattedMessages con timestampRaw y timestamp formateado
  const formattedMessages = allMessages.map((msg) => ({
    username: msg.username,
    content: msg.content,
    timestampRaw: msg.timestamp,
    timestamp: msg.timestamp.toLocaleString("es-ES"),
  }));

  // Enviar mensaje al chat
  const handleSendMessage = () => {
    if (messageInput.trim() && isConnected) {
      sendMessage(messageInput.trim(), currentUserName || "Desconocido");
      setMessageInput("");
    } else if (!isConnected) {
      setError(t("details.chat.notConnectedError"));
    }
  };

  // Notificaciones privadas (toasts)
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [notificationToastMessage, setNotificationToastMessage] = useState("");

  // Estado para agrupar notificaciones en un intervalo de 3 segundos:
  const [groupedToast, setGroupedToast] = useState({
    count: 0,
    timeoutId: null,
  });

  useEffect(() => {
    if (notifications.length === 0) return;

    // Cada vez que llegue una notificación nueva:
    if (groupedToast.timeoutId) {
      // Ya estamos en período de agrupación: solo incrementamos el contador
      clearTimeout(groupedToast.timeoutId);
      setGroupedToast((prev) => ({
        count: prev.count + 1,
        timeoutId: prev.timeoutId,
      }));
    } else {
      // Primera notificación que llega; iniciamos contador 1 y programamos el timeout
      setGroupedToast({ count: 1, timeoutId: null });
    }

    // Siempre (re)programamos un timeout de 3 segundos para “emitir” la notificación final
    const newTimeoutId = setTimeout(() => {
      const total = groupedToast.count > 0 ? groupedToast.count : 1;
      // Podemos personalizar el texto: “X mensajes nuevos en este foro”
      const toastText =
        total === 1
          ? notifications[notifications.length - 1] // último texto
          : `${total} mensajes nuevos en el foro`;

      setNotificationToastMessage(toastText);
      setShowNotificationToast(true);
      // Reiniciamos el groupedToast a 0
      setGroupedToast({ count: 0, timeoutId: null });
    }, 3000);

    // Guardamos ese nuevo timeoutId en el estado
    setGroupedToast((prev) => ({
      count: prev.count,
      timeoutId: newTimeoutId,
    }));

    // Limpiar si cambia `notifications`
    return () => clearTimeout(newTimeoutId);
  }, [notifications]);

  // Estados de carga / error antes de renderizar el contenido
  if (!foro && !loadingInitialData && !error) {
    return (
      
        <div className="container mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">
                {t("details.notFound.title")}
            </h1>
            <p className="mb-4">{t("details.notFound.message")}</p>
            <Link to="/foro">
                <IonButton>{t("details.notFound.button")}</IonButton>
            </Link>
        </div>
    );
  }

  if (loadingInitialData) {
    return (
        <>
            <IonSpinner name="lines-small" />
            <p>{t("details.loading")}</p>
        </>
    );
  }

  if (error) {
    return (
      
        <div className="text-center py-4 text-red-600">
            <p>
                {t("details.error.prefix")} {error}
            </p>
            <Link to="/foro">
                <IonButton>{t("details.error.button")}</IonButton>
            </Link>
        </div>
          
    );
  }

  // Render cuando ya tenemos el foro y los mensajes
  return (
    <>

        <div className="container mx-auto px-4 py-8">
          {/* Encabezado del foro */}
          <ForoHeaderDetails
            foro={foro}
            messageCount={formattedMessages.length}
            t={t}
          />

          {/* Estado del chat */}
          {/* <ChatStatus isConnected={isConnected} chatError={chatError} t={t} /> */}

          {/* Lista de mensajes */}
          <MessagesList
            messages={formattedMessages}
            currentUserName={currentUserName}
            messagesEndRef={messagesEndRef}
            emptyText={t("details.chat.noMessages")}
          />

          {/* Input para enviar mensaje */}
          <ChatInput
            messageInput={messageInput}
            setMessageInput={setMessageInput}
            handleSendMessage={handleSendMessage}
            isConnected={isConnected}
            user={user}
            t={t}
          />
        </div>

        <IonToast
          isOpen={showNotificationToast}
          message={notificationToastMessage}
          duration={3000}
          color="tertiary"
          onDidDismiss={() => setShowNotificationToast(false)}
          position="top"
        />

    </>
  );
};

export default ForoDetailsForUser;
