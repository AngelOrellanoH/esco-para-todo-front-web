// src/components/foro/ForoTitles.jsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IonSpinner } from "@ionic/react";
import { getForos, getMensajes } from "@/services/foro-service";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";

const ForoTitles = () => {
  const { t } = useTranslation("foros");
  const navigate = useNavigate();
  const { user } = useAuth();

  const [foros, setForos] = useState([]);
  const [mensajeCounts, setMensajeCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadForos = async () => {
      try {
        const fetchedForos = await getForos();
        setForos(fetchedForos);

        const countsObj = {};
        await Promise.all(
          fetchedForos.map(async (foro) => {
            try {
              const mensajes = await getMensajes(foro.id);
              countsObj[foro.id] = mensajes.length;
            } catch {
              countsObj[foro.id] = 0;
            }
          })
        );
        setMensajeCounts(countsObj);
      } catch (err) {
        console.error("Error al cargar los foros:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadForos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <IonSpinner name="lines-small" />
        <p>{t("titles.loading")}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-600">
        <p>
          {t("titles.loadingError")}: {error}
        </p>
      </div>
    );
  }

  return (
    <Card className="!border !bg-white dark:!bg-gray-900 dark:!text-white">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="!text-[#003060]">
            {t("titles.cardTitle")}
          </CardTitle>
          <CardDescription className="!text-gray-600 dark:!text-gray-400">
            {t("titles.cardDescription")}
          </CardDescription>
        </div>

        {user && (
          <Link to="usuario/foro/crear">
            <button
              className="
                !bg-gradient-to-r !from-[#00a19a] !to-[#008f85] 
                !text-white 
                !py-3 !px-6 
                !rounded-full 
                !shadow-md 
                hover:!shadow-lg 
                transition-shadow
              "
            >
              {t("titles.createForoButton")}
            </button>
          </Link>
        )}
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {foros.length === 0 ? (
            <div className="flex justify-center items-center text-blue-900 text-center">
              <h3 className="text-lg font-semibold">
                {t("titles.noForums")}
              </h3>
            </div>
          ) : (
            foros.map((foro) => (
              <div
                key={foro.id}
                className="!rounded-lg !border !p-4 cursor-pointer hover:!bg-gray-50 dark:hover:!bg-gray-800 transition-colors"
                onClick={() => navigate(`${user?'/usuario':''}/foro/${foro.id}`)}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-lg !text-black dark:!text-white">
                      {foro.titulo}
                    </h3>
                    <p className="text-sm !text-gray-500 dark:!text-gray-400">
                      {t("titles.authorPrefix")}{" "}
                      <span className="font-semibold">
                        {foro.autor?.nombre || "Desconocido"}
                      </span>{" "}
                      {" • "}
                      {foro.fechaCreacion
                        ? new Date(
                            foro.fechaCreacion
                          ).toLocaleDateString("es-ES")
                        : foro.lastUpdate
                        ? new Date(foro.lastUpdate).toLocaleDateString("es-ES")
                        : "Fecha Desconocida"}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm !text-gray-500 dark:!text-gray-400">
                    <div className="flex items-center">
                      <MessageCircle className="mr-1 h-4 w-4" />{" "}
                      <span>
                        {typeof mensajeCounts[foro.id] === "number"
                          ? mensajeCounts[foro.id]
                          : 0}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForoTitles;
