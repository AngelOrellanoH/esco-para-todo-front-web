// src/components/foro/ChatStatus.jsx
import { IonNote, IonSpinner } from "@ionic/react";

const ChatStatus = ({ isConnected, chatError, t }) => {
  if (chatError) {
    return (
      <IonNote color="danger" className="ion-padding-bottom">
        {t("details.chat.connectionError")}: {chatError}
      </IonNote>
    );
  }

  if (!isConnected) {
    return (
      <IonNote color="medium" className="ion-padding-bottom">
        <IonSpinner
          name="lines-small"
          style={{
            width: "16px",
            height: "16px",
            verticalAlign: "middle",
            marginRight: "5px",
          }}
        />
        {t("details.chat.connecting_chat")}
      </IonNote>
    );
  }

  return (
    <IonNote color="success" className="ion-padding-bottom">
      {t("details.chat.connected")}
    </IonNote>
  );
};

export default ChatStatus;
