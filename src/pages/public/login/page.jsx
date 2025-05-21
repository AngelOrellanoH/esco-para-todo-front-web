import Footer from "@/components/footer";
import Header from "@/components/header";
import LoginForm from "@/components/login/LoginForm";
import { IonPage, IonContent } from "@ionic/react"


const Login = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <Header></Header>
                <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-200px)]">
                    <LoginForm />
                </div>
                <Footer></Footer>
            </IonContent>
        </IonPage>
    )
}

export default Login;