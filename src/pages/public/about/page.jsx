import { IonPage, IonContent } from '@ionic/react'

import AboutTeam from '@/components/about/AboutTeam'
import AboutBanner from '@/components/about/AboutBanner'
import AboutContent from '@/components/about/AboutContent'
import AboutGoals from '@/components/about/AboutGoals'
import Header from '@/components/header'
import Footer from '@/components/footer'


const About = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <Header></Header>
        <div className="container mx-auto px-4 py-8">
          <AboutBanner />
          <AboutContent />
          <AboutGoals />
          <AboutTeam />
        </div>
        <Footer></Footer>
      </IonContent>
    </IonPage>
  )
}

export default About
