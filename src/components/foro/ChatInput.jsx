// src/components/foro/ChatInput.jsx
import { IonInput, IonItem, IonNote } from "@ionic/react";
import { Send } from "lucide-react";
import { Link } from "react-router-dom";

const ChatInput = ({
  messageInput,
  setMessageInput,
  handleSendMessage,
  isConnected,
  user,
  t,
}) => {
  return (
    <>
      {user ? (
        <IonItem
          className="
            ion-margin-top 
            rounded-md 
            border border-gray-300 dark:border-gray-700
          "
          lines="none"
        >
          <IonInput
            placeholder={t("details.chat.messagePlaceholder")}
            value={messageInput}
            onIonInput={(e) => setMessageInput(e.detail.value || "")}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
            className="
              w-full 
              px-3 py-2 
              bg-white dark:bg-gray-900 
              border border-gray-200 dark:border-gray-600 
              rounded-md
            "
          />

          {/* Aquí, aplicamos ! para ganar prioridad sobre Ionic */}
          <button
            onClick={handleSendMessage}
            disabled={!isConnected || !messageInput.trim()}
            className={`
              ml-2 flex items-center 
              !bg-[#003060] !text-white 
              !px-6 !py-3 !rounded-lg 
              !hover:bg-[#002a4a] 
              !transition 
              disabled:!opacity-50 disabled:!cursor-not-allowed
            `}
          >
            <Send size={18} className="mr-2" />
            <span className="text-base font-medium">
              {t("details.chat.sendButton") || "Enviar"}
            </span>
          </button>
        </IonItem>
      ) : (
        <IonNote className="ion-padding-top ion-text-center" color="medium">
          {t("details.chat.loginToParticipate")}
          <Link to="/login" className="font-bold text-blue-600 ml-1">
            {t("details.chat.loginLink")}
          </Link>
        </IonNote>
      )}
    </>
  );
};

export default ChatInput;
