// src/components/foro/MessagesList.jsx
import { useEffect, useRef } from "react";
import { IonText } from "@ionic/react";
import MessageCard from "./MessageCard";

const MessagesList = ({ messages, currentUserName, emptyText }) => {
  // 1) Referencia al div que contiene la lista de mensajes
  const containerRef = useRef(null);

  // 2) Cada vez que cambian los mensajes, ajustamos el scrollTop del contenedor
  useEffect(() => {
    const div = containerRef.current;
    if (div) {
      // Scroll “suave” al final del contenedor
      div.scrollTo({ top: div.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  if (!messages.length) {
    return (
      <IonText color="medium">
        <p className="ion-text-center">{emptyText}</p>
      </IonText>
    );
  }

  // 3) Ordenamos por timestampRaw ascendente
  const sortedByDate = [...messages].sort(
    (a, b) => a.timestampRaw.getTime() - b.timestampRaw.getTime()
  );

  return (
    <div
      ref={containerRef} // <-- Aquí ponemos la referencia
      className="messages-container"
      style={{
        maxHeight: "400px",
        overflowY: "auto",
        marginBottom: "1rem",
        border: "1px solid #e0e0e0",
        borderRadius: "0.75rem",
        padding: "1rem",
      }}
    >
      {sortedByDate.map((msg, index) => {
        const isCurrentUser = currentUserName && msg.username === currentUserName;
        return <MessageCard key={index} msg={msg} isCurrentUser={isCurrentUser} />;
      })}
    </div>
  );
};

export default MessagesList;
