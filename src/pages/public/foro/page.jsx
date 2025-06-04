// src/pages/public/foro/page.jsx

import Footer from "@/components/footer"
import ForoTitles from "@/components/foro/ForoTitles"
import Header from "@/components/header"
import { IonPage, IonContent } from "@ionic/react"

const Foro = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header></Header>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-[#003060]">Foro de Discusión</h1>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="md:col-span-4">
              <ForoTitles />
            </div>
          </div>
        </div>
        <Footer></Footer>
      </IonContent>
    </IonPage>
  )
}

export default Foro