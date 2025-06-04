import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"

function obtenerColorTipo(tipo) {
  switch (tipo) {
    case "skill/competence":
      return "bg-blue-100 text-blue-800"
    case "knowledge":
      return "bg-green-100 text-green-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

function obtenerColorCategoria(categoria) {
  switch (categoria) {
    case "essential":
      return "bg-green-700 text-white"; 
    case "optional":
      return "bg-white text-blue-800 border border-blue-800"; 
    default:
      return "bg-gray-100 text-gray-800";
  }
}

function obtenerEtiquetaTipo(tipo) {
  switch (tipo) {
    case "skill/competence":
      return "Habilidad"
    case "knowledge":
      return "Conocimiento"
    default:
      return tipo
  }
}

function obtenerEtiquetaCategoria(categoria) {
  switch (categoria) {
    case "essential":
      return "Escencial"
    case "optional":
      return "Opcional"
    default:
      return tipo
  }
}

const CompetenciaItem = ({ competencia, asignado, onToggle, categoria="none" }) => {
  return (
    <div
      className={`!flex !flex-col sm:!flex-row !items-start sm:!items-center !justify-between !gap-4 !p-4 !border !rounded-xl ${
        asignado ? "!bg-green-50 !border-green-200" : "!bg-white"
      }`}
    >
      <div className="!flex-1 !space-y-2">
        <div className="!flex !flex-col sm:!flex-row !items-start sm:!items-center !gap-2">
          <h3 className="!font-semibold !m-0">{competencia.nombre}</h3>
          <div className="!flex !flex-row !gap-2">
            <Badge variant="outline" className={obtenerColorTipo(competencia.tipo)}>
              {obtenerEtiquetaTipo(competencia.tipo)}
            </Badge>
            {
              categoria != "none" && 
                <Badge variant="secondary" className={obtenerColorCategoria(categoria)}>{obtenerEtiquetaCategoria(categoria)}</Badge>
             }
          </div>
        </div>

        <p className="!text-sm !text-muted-foreground">{competencia.descripcion}</p>
      </div>

      <Button
        variant={asignado ? "outline" : "default"}
        size="sm"
        onClick={onToggle}
        className={`!w-full sm:!w-auto !self-stretch sm:!self-center ${
          asignado ? "!text-red-600 hover:!text-red-700" : "!text-white"
        }`}
      >
        {asignado ? (
          <>
            <X className="h-4 w-4 mr-1" />
            Quitar
          </>
        ) : (
          <>
            <Plus className="h-4 w-4 mr-1" />
            Añadir
          </>
        )}
      </Button>
    </div>
  )
}

export default CompetenciaItem
