import Footer from "@/components/footer";
import Header from "@/components/header";
import SideBar from "@/components/sideBar";
import { IonContent, IonPage, IonSpinner } from "@ionic/react";
import { useEffect, useState } from "react"
import PerfilCompetencias from "@/components/competencias/PerfilCompetencias";
import ExplorarCompetencias from "@/components/competencias/ExplorarCompetencias";
import {CompetenciaService} from "@/services/competencia-service"
import { DatosService } from "@/services/datos-service";

const Competencias = () => {
    const [usuario, setUsuario] = useState(null);
    const [usuarioCompetencias, setUsuarioCompetencias] = useState(new Set())
    const [error, setError] = useState(null);
    const [competenciasDisponibles, setCompetenciasDisponibles] = useState([]);
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {        
        CompetenciaService.obtenerTodas()
            .then((datos) => {
                setCompetenciasDisponibles(datos)
            })
            .catch(() => setMensaje("Error al cargar los datos de las competencias")); 
         
    }, [])

    const fetchUsuarioActualizado = async () => {
        try {
          const datos = await DatosService.fetchUserProfile();
          console.log(datos)
          setUsuario(datos);
          setUsuarioCompetencias(new Set(datos.competencias.map(c => c.id)));
        } catch (err) {
          console.error("ERROR al actualizar los datos del usuario", err); 
          setError(err.message || "Error desconocido");
        }
      };
    
    useEffect(() => {
        fetchUsuarioActualizado();
    }, []);

    const [busqueda, setBusqueda] = useState("")
    const [filtroTipo, setFiltroTipo] = useState("todos")
    const tipos = [
        { value: "skill/competence", label: "Habilidades" },
        { value: "knowledge", label: "Conocimientos" },
    ]

    const alternarEnPerfil = async (id) => {
        if (!usuario) return; 

        const yaTiene = usuarioCompetencias.has(id);
        try {
            if (yaTiene) {
                console.log("Ya tiene esta competencia, deberías removerla");
            } else {
                await CompetenciaService.asignarCompetencias([id]);
                setMensaje("Competencia añadida");

                setUsuarioCompetencias(prev => {
                    const nuevoSet = new Set(prev);
                    nuevoSet.add(id);
                    return nuevoSet;
                });

                await fetchUsuarioActualizado();
            }
        } catch (error) {
            setMensaje("Error al añadir la competencia");
        }
    }

    const competenciasFiltradas = competenciasDisponibles.filter(c => {
        const coincideBusqueda =
            c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            c.descripcion.toLowerCase().includes(busqueda.toLowerCase())
        const coincideTipo = filtroTipo === "todos" || c.tipo === filtroTipo
        return coincideBusqueda && coincideTipo
    })

    return (
        <IonPage>
            <IonContent fullscreen>
                <Header />

                <div className="flex flex-col md:flex-row flex-1 min-h-[calc(100vh-120px)]">   
                    <SideBar />

                    <div className="flex-1 ion-padding overflow-auto">
                        
                        
                        <div>
                            <h1 className="text-3xl font-bold text-[#003060]">Competencias ESCO</h1>
                            <p className="text-muted-foreground">Explora y añade competencias a tu perfil profesional</p>
                        </div>
                            

                        {/* Perfil de Competencias */}
                        <PerfilCompetencias
                            competencias={usuario?.competencias || []}
                            onQuitar={alternarEnPerfil}
                        />

                        {/* Buscador y Filtros */}
                        <ExplorarCompetencias
                            busqueda={busqueda}
                            setBusqueda={setBusqueda}
                            filtroTipo={filtroTipo}
                            setFiltroTipo={setFiltroTipo}
                            tipos={tipos}
                            onToggle={alternarEnPerfil}
                            competencias={competenciasFiltradas}
                            usuarioCompetencias={usuarioCompetencias}
                        />

                    </div>
                </div>

                <Footer />
            </IonContent>
        </IonPage>
    )
}

export default Competencias;