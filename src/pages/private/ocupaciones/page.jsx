import Footer from "@/components/footer";
import Header from "@/components/header";
import SideBar from "@/components/sideBar";
import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Search} from "lucide-react"
import OcupacionItem from "@/components/ocupaciones/OcupacionItem";
import { OcupacionesService } from "@/services/ocupaciones-service";

const datosOcupaciones = [
  {
    id: "049dd949-4856-56a4-96e1-2c2fcae3932b",
    codigo_isco: "2359",
    descripcion:
      "Los profesores de educación permanente para adultos enseñan a estudiantes adultos en una variedad de materias...",
    nombre: "profesor de educación permanente para adultos",
    id_padre: null,
    categoria: "Educación",
    nivel: 2,
    competenciasEsenciales: 15,
    competenciasOpcionales: 8,
  },
  {
    id: "0526e99-42a1-5803-92f2-d5558583ecac",
    codigo_isco: "2330",
    descripcion:
      "Los profesores de física en educación secundaria enseñan física a estudiantes de educación secundaria...",
    nombre: "profesor de física en educación secundaria",
    id_padre: null,
    categoria: "Educación",
    nivel: 2,
    competenciasEsenciales: 12,
    competenciasOpcionales: 6,
  },
  {
    id: "0530e8bd-5b85-5b95-9b2e-d5558583ecac",
    codigo_isco: "2310",
    descripcion:
      "Los profesores de teatro en educación superior enseñan teatro y artes escénicas a nivel universitario...",
    nombre: "profesor de teatro en educación superior",
    id_padre: null,
    categoria: "Educación",
    nivel: 2,
    competenciasEsenciales: 18,
    competenciasOpcionales: 10,
  },
  {
    id: "0723108b-bc96-537e-9b99-264b27fec134",
    codigo_isco: "2310",
    descripcion: "Los profesores universitarios de estudios artísticos enseñan materias relacionadas con las artes...",
    nombre: "profesor universitario de estudios artísticos",
    id_padre: null,
    categoria: "Educación",
    nivel: 2,
    competenciasEsenciales: 16,
    competenciasOpcionales: 9,
  },
  {
    id: "081abeee-9427-5a01-b221-96c676a11e81",
    codigo_isco: "2355",
    descripcion:
      "Los coordinadores educativos de actividades artísticas planifican y coordinan programas educativos...",
    nombre: "coordinador educativo de actividades artísticas",
    id_padre: null,
    categoria: "Educación",
    nivel: 2,
    competenciasEsenciales: 14,
    competenciasOpcionales: 7,
  },
  {
    id: "091a4127-6cc5-5217-8bf9-9b98d9bc7711",
    codigo_isco: "2341",
    descripcion: "Los profesores de colegio Steiner forman a los alumnos en metodologías pedagógicas alternativas...",
    nombre: "profesor de colegio Steiner",
    id_padre: null,
    categoria: "Educación",
    nivel: 2,
    competenciasEsenciales: 13,
    competenciasOpcionales: 5,
  },
]

const Ocupaciones = () => {

    const [ocupaciones, setOcupaciones] = useState([]);
    const [mensaje, setMensaje] = useState("");
    
    useEffect(() => {        
        OcupacionesService.obtenerTodas()
            .then((datos) => {
                setOcupaciones(datos)
            })
            .catch(() => setMensaje("Error al cargar los datos de las ocupaciones")); 
          
    }, [])



    const [consultaBusqueda, setConsultaBusqueda] = useState("")

    const ocupacionesFiltradas = ocupaciones.filter((ocupacion) => {
        return (
          ocupacion.nombre.toLowerCase().includes(consultaBusqueda.toLowerCase()) ||
          ocupacion.codigo_isco.includes(consultaBusqueda)
        )
    })


    return (
        <IonPage>
            <IonContent fullscreen>
                <Header />

                <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
                    <SideBar />

                    <div className="flex-1 ion-padding overflow-auto">
                        <div>
                            <h1 className="!text-3xl !font-bold !text-[#003060]">Ocupaciones ESCO</h1>
                            <p className="!text-muted-foreground !mb-4">Explora las ocupaciones y sus competencias asociadas</p>
                        </div>

                        {/* Búsqueda */}
                        <Card>
                            <CardHeader>
                            <CardTitle className="!mb-2">Buscar Ocupaciones</CardTitle>
                            <CardDescription>Filtra ocupaciones por nombre o código ISCO</CardDescription>
                            </CardHeader>
                            <CardContent className="!space-y-4">
                            <div className="!relative">
                                <Search className="!absolute !left-2.5 !top-2.5 !h-4 !w-4 !text-muted-foreground" />
                                <Input
                                placeholder="Buscar ocupaciones..."
                                value={consultaBusqueda}
                                onChange={(e) => setConsultaBusqueda(e.target.value)}
                                className="!pl-8"
                                />
                            </div>
                            {/* Lista de Ocupaciones */}
                            <div className="!grid !gap-4 sm:!grid-cols-1 md:!grid-cols-1 xl:!grid-cols-1">
                                {ocupacionesFiltradas.map((ocupacion) => (
                                <OcupacionItem key={ocupacion.id} ocupacion={ocupacion} />
                                ))}
                            </div>

                            {ocupacionesFiltradas.length === 0 && (
                                <Card>
                                <CardContent className="!text-center !py-8">
                                    <p className="!text-muted-foreground">
                                    No se encontraron ocupaciones que coincidan con la búsqueda.
                                    </p>
                                </CardContent>
                                </Card>
                            )}
                            </CardContent>
                        </Card>

                    </div>
                </div>

                <Footer />
            </IonContent>
        </IonPage>
    )
}

export default Ocupaciones;