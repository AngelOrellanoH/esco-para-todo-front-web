// src/components/foro/crearForo.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IonToast, IonSpinner } from "@ionic/react";
import { createForo, subscribeToForo } from "@/services/foro-service"; // Importa ambas funciones
import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext"; // Importa useAuth para obtener el token

const CrearForo = () => {
  const { t } = useTranslation('foros');
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('success');
  const [isLoading, setIsLoading] = useState(false);

  const { token } = useAuth(); // Obtén el token del contexto de autenticación

  const handleCreateForo = async (e) => {
    e.preventDefault(); // Evitar la recarga de la página al enviar el formulario

    if (isLoading) return; // Evitar doble envío mientras ya está cargando

    // Validar campos obligatorios
    if (!titulo.trim() || !descripcion.trim()) {
      setToastMessage(t('create.validationError'));
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    setIsLoading(true); // Deshabilitar el botón y mostrar el spinner
    try {
      // 1. Intentar crear el foro
      const newForo = await createForo({ titulo, descripcion });

      // 2. Intentar suscribir al usuario al foro recién creado
      if (token && newForo && newForo.id) { // Solo intentar suscribir si hay token y el foro se creó con éxito
        try {
          await subscribeToForo(newForo.id, token);
          console.log(`Usuario suscrito automáticamente al foro ${newForo.id}`);
          // Si la suscripción es exitosa, el mensaje principal es de éxito total
          setToastMessage(t('create.success'));
          setToastColor('success');
        } catch (subError) {
          console.warn(`No se pudo suscribir automáticamente al usuario al foro ${newForo.id}:`, subError);
          // Si la suscripción falla, muestra un mensaje de advertencia pero aún así el foro se creó
          setToastMessage(t('create.successWithSubscriptionWarning'));
          setToastColor('warning');
        }
      } else if (!token) {
        console.warn("No hay token de autenticación disponible para suscribir al usuario al foro recién creado.");
        // Si no hay token para la suscripción, también es una advertencia
        setToastMessage(t('create.successNoSubscription'));
        setToastColor('warning');
      }

      setShowToast(true); // Mostrar el toast con el mensaje y color adecuados

      // Pequeño retraso para que el usuario pueda ver el toast antes de navegar
      setTimeout(() => {
        navigate(`usuario/foro/${newForo.id}`);
      }, 500);
    } catch (error) {
      // Si falla la creación del foro (paso 1), mostramos un error general
      setToastMessage(`${t('create.error')} ${error.message}`);
      setToastColor('danger');
      setShowToast(true);
      console.error("Error al crear el foro:", error);
    } finally {
      setIsLoading(false); // Volver a habilitar el botón al finalizar la operación (éxito o error)
    }
  };

  return (
    <Card className="w-full max-w-md !border !bg-white dark:!bg-gray-900 dark:!text-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center !text-[#003060]">
          {t('create.pageTitle')}
        </CardTitle>
        <CardDescription className="text-center !text-gray-600 dark:!text-gray-400">
          {t('create.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleCreateForo} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="titulo">{t('create.tituloLabel')}</Label>
            <Input
              id="titulo"
              type="text"
              placeholder={t('create.tituloPlaceholder')}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              required
              disabled={isLoading} // Deshabilitar mientras carga
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">{t('create.descripcionLabel')}</Label>
            <Textarea
              id="descripcion"
              placeholder={t('create.descripcionPlaceholder')}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              rows={5}
              required
              disabled={isLoading} // Deshabilitar mientras carga
            />
          </div>

          <Button type="submit" className="w-full bg-[#00a19a] text-white" disabled={isLoading}>
            {isLoading ? ( // Mostrar spinner si está cargando
              <IonSpinner name="lines-small" />
            ) : (
              t('create.submitButton')
            )}
          </Button>
        </form>
      </CardContent>

      <IonToast
        isOpen={showToast}
        message={toastMessage}
        duration={3000}
        color={toastColor}
        onDidDismiss={() => setShowToast(false)}
        position="top"
      />
    </Card>
  );
};

export default CrearForo;