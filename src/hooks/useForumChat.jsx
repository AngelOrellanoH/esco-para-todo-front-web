import { useState, useEffect, useRef, useCallback } from 'react';
import { Client } from '@stomp/stompjs';
import { API_BASE_URL } from '@/config';

const WEBSOCKET_ENDPOINT = API_BASE_URL.replace(/^http/, 'ws') + '/ws';

const useForumChat = (forumId, jwtToken) => {
  const [isConnected, setIsConnected] = useState(false);
  const [forumMessages, setForumMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const stompClient = useRef(null);

  const connect = useCallback(() => {
    if (!jwtToken || !forumId) {
      setError("JWT Token y Forum ID son necesarios para conectar.");
      return;
    }
    if (stompClient.current && stompClient.current.active) {
      setIsConnected(true);
      return;
    }

    const socket = new WebSocket(WEBSOCKET_ENDPOINT);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      connectHeaders: { Authorization: `Bearer ${jwtToken}` },
      debug: () => {},
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    stompClient.current.onConnect = (frame) => {
      setIsConnected(true);
      setError(null);

      // Suscribirse a mensajes públicos
      stompClient.current.subscribe(`/topic/foros/${forumId}`, (message) => {
        const msg = JSON.parse(message.body);
        // msg.timestamp viene como ISO (LocalDateTime serializado)
        const rawISO = msg.timestamp || new Date().toISOString();
        const dateObj = new Date(rawISO);

        const formattedMsg = {
          username: msg.nombre || msg.username || 'Desconocido',
          content: msg.content || '[Sin contenido]',
          // timestampRaw es un Date real
          timestampRaw: dateObj,
          // timestamp es la cadena para mostrar
          timestamp: dateObj.toLocaleString('es-ES'),
        };
        setForumMessages((prev) => [...prev, formattedMsg]);
      });

      // Suscripción a notificaciones privadas
      stompClient.current.subscribe('/user/queue/notifications', (notif) => {
        const noti = JSON.parse(notif.body);
        const text = noti.text || '[Notificación sin texto]';
        setNotifications((prev) => [...prev, text]);
      });

      document.getElementById("sendBtn")?.removeAttribute("disabled");
    };

    stompClient.current.onStompError = (frame) => {
      setIsConnected(false);
      setError("Error de conexión STOMP: " + (frame.headers['message'] || frame.body));
    };
    stompClient.current.onWebSocketError = (event) => {
      setIsConnected(false);
      setError("Error de conexión WebSocket.");
    };
    stompClient.current.onDisconnect = () => {
      setIsConnected(false);
    };

    stompClient.current.activate();
  }, [forumId, jwtToken]);

  const disconnect = useCallback(() => {
    if (stompClient.current && stompClient.current.active) {
      stompClient.current.deactivate();
    }
  }, []);

  const sendMessage = useCallback((content, currentUserName) => {
    if (stompClient.current && stompClient.current.active && content) {
      try {
        stompClient.current.publish({
          destination: `/app/foros/${forumId}`,
          body: JSON.stringify({ content: content }),
        });
      } catch (e) {
        setError("No se pudo enviar el mensaje.");
      }
    } else {
      setError("No conectado al chat o mensaje vacío.");
    }
  }, [forumId]);

  useEffect(() => {
    if (jwtToken && forumId) {
      connect();
    }
    return () => disconnect();
  }, [connect, disconnect, jwtToken, forumId]);

  return {
    isConnected,
    forumMessages,
    notifications,
    error,
    sendMessage,
  };
};

export default useForumChat;
