import Footer from "@/components/footer";
import Header from "@/components/header";
import SideBar from "@/components/sideBar";
import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Users, BookOpen, Award } from "lucide-react"
import Buscador from "@/components/buscadorEsco/Buscador";
import ResultadoItem from "@/components/buscadorEsco/ResultadoItem";


const resultadosMock = [
  {
    id: "informatica-powercenter",
    titulo: "Informatica PowerCenter",
    descripcion:
      "Programa de integración de datos desarrollado por Informatica, que permite integrar información de múltiples aplicaciones.",
    tipo: "competencia",
    categoria: "Tecnologías de la información",
    puntuacionRelevancia: 0.95,
  },
  {
    id: "ibm-informix",
    titulo: "IBM Informix",
    descripcion:
      "Herramienta de IBM para gestionar bases de datos. Permite crear, actualizar y mantener bases de datos.",
    tipo: "competencia",
    categoria: "Gestión de bases de datos",
    puntuacionRelevancia: 0.89,
  },
  {
    id: "operate-mailing-systems",
    titulo: "Operar sistemas de correo",
    descripcion:
      "Operar sistemas de información de correo para registrar y rastrear envíos. Identificar errores y asegurar entrega.",
    tipo: "competencia",
    categoria: "Sistemas de información",
    puntuacionRelevancia: 0.84,
  },
  {
    id: "information-architecture",
    titulo: "Arquitectura de la información",
    descripcion:
      "Métodos para generar, estructurar, mantener, enlazar, almacenar y utilizar la información.",
    tipo: "competencia",
    categoria: "Arquitectura de información",
    puntuacionRelevancia: 0.78,
  },
  {
    id: "administer-ict-system",
    titulo: "Administrar sistemas TIC",
    descripcion:
      "Gestionar configuraciones, usuarios, recursos, copias de seguridad e instalaciones de software y hardware.",
    tipo: "competencia",
    categoria: "Administración de sistemas",
    puntuacionRelevancia: 0.72,
  },
]

const BuscadorEsco = () => {

    const [resultados, setResultados] = useState([])
    const [consulta, setConsulta] = useState("")
    const [buscando, setBuscando] = useState(false)
    const [yaBusco, setYaBusco] = useState(false)

    const realizarBusqueda = (query, cantidad) => {
        setConsulta(query)
        setBuscando(true)
        setYaBusco(true)

        setTimeout(() => {
        const filtrados = resultadosMock
            .filter(
            (item) =>
                item.titulo.toLowerCase().includes(query.toLowerCase()) ||
                item.descripcion.toLowerCase().includes(query.toLowerCase())
            )
            .slice(0, cantidad)
            .sort((a, b) => b.puntuacionRelevancia - a.puntuacionRelevancia)

        setResultados(filtrados)
        setBuscando(false)
        }, 600)
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <Header />

                <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
                    <SideBar />

                    <div className="flex-1 ion-padding overflow-auto">
                        <div className="!space-y-6 !p-4">
                            <div className="!flex !items-center !justify-between">
                                
                                <div>
                                    <h1 className="!text-3xl !font-bold !text-[#003060]">Buscador ESCO</h1>
                                    <p className="!text-muted-foreground">
                                    Busca ocupaciones, competencias y cualificaciones en la clasificación europea
                                    </p>
                                </div>
                            </div>

                            <Buscador onBuscar={realizarBusqueda} />

                            {yaBusco && (
                                <Card>
                                <CardHeader>
                                    <CardTitle>
                                    {buscando
                                        ? "Buscando..."
                                        : `Resultados de búsqueda (${resultados.length})`}
                                    </CardTitle>
                                    {!buscando && resultados.length > 0 && (
                                    <CardDescription>
                                        Resultados para "{consulta}" ordenados por relevancia
                                    </CardDescription>
                                    )}
                                </CardHeader>
                                <CardContent>
                                    {buscando ? (
                                    <div className="!space-y-4">
                                        {[...Array(3)].map((_, i) => (
                                        <div key={i} className="!animate-pulse">
                                            <div className="!h-4 !bg-gray-200 !rounded !w-3/4 !mb-2"></div>
                                            <div className="!h-3 !bg-gray-200 !rounded !w-full !mb-1"></div>
                                            <div className="!h-3 !bg-gray-200 !rounded !w-2/3"></div>
                                        </div>
                                        ))}
                                    </div>
                                    ) : resultados.length > 0 ? (
                                    <div className="!space-y-4">
                                        {resultados.map((resultado) => (
                                        <ResultadoItem key={resultado.id} {...resultado} />
                                        ))}
                                    </div>
                                    ) : (
                                    <div className="!text-center !py-8">
                                        <Search className="!h-12 !w-12 !text-muted-foreground !mx-auto !mb-4" />
                                        <h3 className="!text-lg !font-semibold !mb-2">
                                        No se encontraron resultados
                                        </h3>
                                        <p className="!text-muted-foreground">
                                        Intenta con términos de búsqueda diferentes o ajusta los parámetros.
                                        </p>
                                    </div>
                                    )}
                                </CardContent>
                                </Card>
                            )}

                            {!yaBusco && (
                                <Card>
                                <CardContent className="!text-center !py-12">
                                    <Search className="!h-12 !w-12 !text-muted-foreground !mx-auto !mb-4" />
                                    <h3 className="!text-lg !font-semibold !mb-2">
                                    Busca en la clasificación ESCO
                                    </h3>
                                    <p className="!text-muted-foreground !mb-6">
                                    Utiliza nuestro buscador para encontrar ocupaciones, competencias y cualificaciones
                                    </p>
                                    <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-4 !max-w-2xl !mx-auto">
                                    <div className="!text-center !p-4 !border !rounded-lg">
                                        <Users className="!h-8 !w-8 !text-blue-600 !mx-auto !mb-2" />
                                        <h4 className="!font-medium">Ocupaciones</h4>
                                        <p className="!text-sm !text-muted-foreground">Perfiles profesionales</p>
                                    </div>
                                    <div className="!text-center !p-4 !border !rounded-lg">
                                        <BookOpen className="!h-8 !w-8 !text-green-600 !mx-auto !mb-2" />
                                        <h4 className="!font-medium">Competencias</h4>
                                        <p className="!text-sm !text-muted-foreground">Habilidades y conocimientos</p>
                                    </div>
                                    <div className="!text-center !p-4 !border !rounded-lg">
                                        <Award className="!h-8 !w-8 !text-purple-600 !mx-auto !mb-2" />
                                        <h4 className="!font-medium">Cualificaciones</h4>
                                        <p className="!text-sm !text-muted-foreground">Títulos oficiales</p>
                                    </div>
                                    </div>
                                </CardContent>
                                </Card>
                            )}
                            </div>
                    </div>
                </div>

                <Footer />
            </IonContent>
        </IonPage>
    )
}

export default BuscadorEsco;