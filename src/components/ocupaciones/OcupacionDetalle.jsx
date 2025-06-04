import { IonContent, IonPage } from "@ionic/react";
import Header from "../header";
import SideBar from "../sideBar";
import Footer from "../footer";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft , BookOpen } from "lucide-react"
import CompetenciaItem from "../competencias/CompetenciaItem";
import { OcupacionesService } from "@/services/ocupaciones-service";
import { CompetenciaService } from "@/services/competencia-service";


const datosOcupacion = {
  id: "123",
  nombre: "Profesor de educación permanente para adultos",
  codigoISCO: "2359",
  descripcion:
    "Los profesores de educación permanente para adultos enseñan a estudiantes adultos en una variedad de materias académicas y vocacionales...",
  categoria: "Educación",
  competencias: [
    {
      id: "1",
      titulo: "Negociar con instituciones gubernamentales",
      descripcion: "Negociar acuerdos con entidades gubernamentales...",
      tipo: "skill",
      nivel: "Avanzado",
      categoria: "Gestión",
      tipoRelacion: "essential",
      enPerfil: false,
    },
    {
      id: "2",
      titulo: "Evaluar el desarrollo de los jóvenes",
      descripcion: "Evaluar aspectos del desarrollo juvenil...",
      tipo: "skill",
      nivel: "Básico",
      categoria: "Educación",
      tipoRelacion: "essential",
      enPerfil: true,
    },
    {
      id: "3",
      titulo: "Instrumentos de asistencia",
      descripcion: "Conocimiento sobre dispositivos para discapacidad...",
      tipo: "knowledge",
      nivel: "Intermedio",
      categoria: "Salud",
      tipoRelacion: "optional",
      enPerfil: false,
    },
  ],
}

const OcupacionDetalle = () => {

    const { id } = useParams();
    const [mensaje, setMensaje] = useState("");
    const [ocupacion, setOcupacion] = useState(null)

    const [competenciasDisponibles, setCompetenciasDisponibles] = useState([]);


    useEffect(() => {        
        CompetenciaService.obtenerTodas()
            .then((datos) => {
                setCompetenciasDisponibles(datos)
            })
            .catch(() => setMensaje("Error al cargar los datos de las competencias")); 
         
    }, [])
    
    useEffect(() => {        
        OcupacionesService.obtenerTodas()
            .then((datos) => {
                setOcupacion(datos.find((o) => o.id === id))
            })
            .catch(() => setMensaje("Error al cargar los datos de las ocupaciones")); 
          
    }, [])




    const navigate = useNavigate();

    if(!ocupacion || !competenciasDisponibles){

        return <h1>Loading...</h1>
    }
    
    const idsEsenciales = new Set(
        ocupacion.competencias
            .filter(c => c.tipoRelacion === "essential")
            .map(c => c.competenciaId)
    );

    const idsOpcionales = new Set(
        ocupacion.competencias
            .filter(c => c.tipoRelacion === "optional")
            .map(c => c.competenciaId)
    );

    const competenciasEsenciales = competenciasDisponibles.filter(c => idsEsenciales.has(c.id));
    const competenciasOpcionales = competenciasDisponibles.filter(c => idsOpcionales.has(c.id));
    const todos = competenciasDisponibles.filter(c => idsEsenciales.has(c.id) || idsOpcionales.has(c.id));
 
    console.log(todos)

    const toggleCompetencia = (id) => {
        
    };

    

    return (
        <IonPage>
            <IonContent fullscreen>
                <Header />

                <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
                    <SideBar />

                    <div className="flex-1 ion-padding overflow-auto">
                        
                        <div className="!space-y-6">
                            <div className="!flex !items-center !gap-4">
                                <Button variant="ghost" onClick={() => navigate(-1)}>
                                <ArrowLeft className="!mr-2 !h-4 !w-4" /> Volver a ocupaciones
                                </Button>
                            </div>

                            <Card>
                                <CardHeader>
                                <div className="!flex !items-start !justify-between">
                                    <div className="!space-y-2">
                                    <CardTitle className="!text-2xl">{ocupacion?.nombre}</CardTitle>
                                    <div className="!flex !gap-2">
                                        <Badge variant="outline">ISCO: {ocupacion?.codigoIsco}</Badge>
                                        <Badge variant="secondary">Educación</Badge>
                                    </div>
                                    </div>
                                </div>
                                <CardDescription className="!text-base !leading-relaxed">
                                    {ocupacion?.descripcion}
                                </CardDescription>
                                </CardHeader>
                            </Card>

                            <div className="!grid !gap-4 md:!grid-cols-3">
                                <Card>
                                <CardHeader className="!flex !flex-row !items-center !justify-between !space-y-0 !pb-2">
                                    <CardTitle className="!text-sm !font-medium">Total Competencias</CardTitle>
                                    <BookOpen className="!h-4 !w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="!text-2xl !font-bold">{ocupacion?.competencias.length}</div>
                                    <p className="!text-xs text-muted-foreground">Competencias asociadas</p>
                                </CardContent>
                                </Card>
                                <Card>
                                <CardHeader className="!flex !flex-row !items-center !justify-between !space-y-0 !pb-2">
                                    <CardTitle className="!text-sm !font-medium">Esenciales</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="!text-2xl !font-bold !text-green-600">{competenciasEsenciales?.length}</div>
                                    <p className="!text-xs text-muted-foreground">Competencias esenciales</p>
                                </CardContent>
                                </Card>
                                <Card>
                                <CardHeader className="!flex !flex-row !items-center !justify-between !space-y-0 !pb-2">
                                    <CardTitle className="!text-sm !font-medium">Opcionales</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="!text-2xl !font-bold !text-blue-600">{competenciasOpcionales?.length}</div>
                                    <p className="!text-xs text-muted-foreground">Competencias opcionales</p>
                                </CardContent>
                                </Card>
                            </div>

                            <Tabs defaultValue="esenciales" className="!space-y-6">
                                <TabsList className="!flex !flex-wrap !bg-muted !p-[3px] !gap-[3px] !rounded-lg !w-full !h-auto">
                                    <TabsTrigger value="esenciales" className="!p-2">Competencias Esenciales ({competenciasEsenciales?.length})</TabsTrigger>
                                    <TabsTrigger value="opcionales" className="!p-2">Competencias Opcionales ({competenciasOpcionales?.length})</TabsTrigger>
                                    <TabsTrigger value="todas" className="!p-2">Todas las Competencias ({ocupacion?.competencias.length})</TabsTrigger>
                                </TabsList>

                                <TabsContent value="esenciales" className="!space-y-4">
                                {competenciasEsenciales?.map((c) => (
                                    <CompetenciaItem key={c.id} categoria="essential" competencia={c} asignado={false} onToggle={() => toggleCompetencia(c.id)} />
                                ))}
                                </TabsContent>

                                <TabsContent value="opcionales" className="!space-y-4">
                                {competenciasOpcionales?.map((c) => (
                                    <CompetenciaItem key={c.id} competencia={c} categoria="optional" asignado={false} onToggle={() => toggleCompetencia(c.id)} />
                                ))}
                                </TabsContent>

                                <TabsContent value="todas" className="!space-y-4">
                                {todos?.map((c) => (
                                    <CompetenciaItem key={c.id} categoria={c.tipoRelacion} competencia={c} asignado={false} onToggle={() => toggleCompetencia(c.id)} />
                                ))}
                                </TabsContent>
                            </Tabs>
                            </div>

                    </div>
                </div>

                <Footer />
            </IonContent>
        </IonPage>
    )
}

export default OcupacionDetalle;