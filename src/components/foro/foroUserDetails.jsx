import { IonContent, IonPage } from "@ionic/react"
import Header from "../header"
import SideBar from "../sideBar"
import Footer from "../footer"
import ForoDetails from "./ForoDetails"
import ForoDetailsForUser from "./ForoDetailsForUser"

const ForoUserDetails = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Header />

                <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
                    <SideBar />

                    <div className="flex-1 ion-padding overflow-auto">
                        <ForoDetailsForUser></ForoDetailsForUser>
                    </div>
                </div>

                <Footer />
            </IonContent>
        </IonPage>
    )
}

export default ForoUserDetails