import { IonPage, IonContent } from '@ionic/react'
import BannerSection from '../../../components/home/BannerSection.jsx'
import InfoSection from '../../../components/home/InfoSection.jsx'
import FeatureSection from '../../../components/home/FeatureSection.jsx'
import AccountSection from '../../../components/home/AccountSection.jsx'
import Header from '../../../components/header.jsx'
import Footer from '../../../components/footer.jsx'

const Home = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header></Header>
          <div className="container mx-auto px-4">
            <BannerSection />
            <InfoSection />
            <FeatureSection />
            <AccountSection />
          </div>
        <Footer></Footer> 
      </IonContent>
    </IonPage>
  )
}

export default Home