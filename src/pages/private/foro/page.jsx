import Footer from "@/components/footer";
import ForoTitles from "@/components/foro/ForoTitles";
import Header from "@/components/header";
import SideBar from "@/components/sideBar";
import { IonContent, IonPage } from "@ionic/react";

const ForoUser = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Header />

                <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
                    <SideBar />

                    <div className="flex-1 ion-padding overflow-auto">
                        <div className="container mx-auto px-4 py-8">
                        <h1 className="text-3xl font-bold mb-8 text-[#003060]">Foro de Discusión</h1>
                            <div className="grid md:grid-cols-4 gap-6">
                                <div className="md:col-span-4">
                                <ForoTitles />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Footer />
            </IonContent>
        </IonPage>
    )
}

export default ForoUser;