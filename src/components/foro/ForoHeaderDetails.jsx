// src/components/foro/ForoHeaderDetails.jsx
import { ArrowLeft } from "lucide-react";       // usamos Lucide directamente
import { useNavigate } from "react-router-dom";

const ForoHeaderDetails = ({ foro, messageCount, t }) => {
  const navigate = useNavigate();

  return (
    <>
      {/* Botón de retroceso + Título formateado */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="
            flex items-center 
            border border-[#003060] 
            bg-white text-[#003060] 
            hover:bg-[#003060]/10 
            rounded-md 
            px-3 py-1 
            mr-4
            transition
          "
        >
          <ArrowLeft size={20} className="mr-2" />
          <span className="text-sm font-medium">
            {t("details.backButton")}
          </span>
        </button>

        <h1 className="text-2xl font-bold text-[#003060]">
          <span className="font-normal">Título:</span>{" "}
          <span className="font-semibold">{foro?.titulo}</span>
        </h1>
      </div>

      {/* Descripción formateada */}
      {foro?.descripcion && (
        <div className="
          mb-6 
          border 
          rounded-xl 
          p-4 
          bg-gray-100 dark:bg-gray-800 
          dark:text-gray-200
        ">
          <p className="text-gray-800 dark:text-gray-200">
            <span className="font-semibold">Descripción:</span>{" "}
            {foro.descripcion}
          </p>
        </div>
      )}

      {/* Autor, fecha de creación y contador de mensajes */}
      <div className="flex items-center text-sm text-gray-500 mb-4 flex-wrap gap-3">
        <span>
          {t("details.authorPrefix")}{" "}
          <span className="font-semibold">
            {foro?.autor?.nombre || "Desconocido"}
          </span>
        </span>
        <span>{" • "}</span>
        <span>
          {foro?.fechaCreacion
            ? new Date(foro.fechaCreacion).toLocaleDateString("es-ES")
            : foro?.lastUpdate
            ? new Date(foro.lastUpdate).toLocaleDateString("es-ES")
            : "Fecha Desconocida"}
        </span>
        <span className="flex items-center">
          <span className="mr-1">💬</span>{" "}
          {t("details.messageCountSuffix", { count: messageCount })}
        </span>
      </div>
    </>
  );
};

export default ForoHeaderDetails;
