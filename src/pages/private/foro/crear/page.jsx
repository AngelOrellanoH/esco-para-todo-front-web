// src/pages/public/foro/crear/page.jsx

import CrearForo from "@/components/foro/crearForo";
import { IonPage, IonContent, IonButtons, IonIcon, IonButton } from "@ionic/react"; 
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/header"; // Tu componente Header
import Footer from "@/components/footer"; // Tu componente Footer


const CrearForoPage = () => {
  const { t } = useTranslation('foros');
  const navigate = useNavigate();

  return (
      <IonPage>
          <IonContent fullscreen>
              <Header />

              <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
                  <SideBar />

                  <div className="flex-1 ion-padding overflow-auto">
                      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
                        <CrearForo />
                      </div>
                  </div>
              </div>

              <Footer />
          </IonContent>
      </IonPage>
  );
};

export default CrearForoPage;