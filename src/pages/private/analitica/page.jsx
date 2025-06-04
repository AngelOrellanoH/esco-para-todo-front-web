import Footer from "@/components/footer";
import Header from "@/components/header";
import SideBar from "@/components/sideBar";
import { IonContent, IonPage } from "@ionic/react";

const Analitica = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Header />

                <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
                    <SideBar />

                    <div className="flex-1 ion-padding overflow-auto">
                        <h1>Analitica</h1>
                    </div>
                </div>

                <Footer />
            </IonContent>
        </IonPage>
    )
}

export default Analitica;