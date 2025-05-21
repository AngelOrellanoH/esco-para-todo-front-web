import { IonPage, IonContent } from '@ionic/react'

import Header from '@/components/header'
import Footer from '@/components/footer'
import ContactInfo from '@/components/contact/ContactInfo'
import ContactForm from '@/components/contact/ContactForm'

const Contact = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header></Header>
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <ContactInfo />
            <ContactForm />
          </div>
        </div>
        <Footer></Footer>
      </IonContent>
    </IonPage>
  )
}

export default Contact
