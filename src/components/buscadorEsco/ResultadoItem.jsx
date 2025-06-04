import { BookOpen, Users, Award } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const iconoPorTipo = {
  ocupacion: <Users className="!h-4 !w-4" />,
  competencia: <BookOpen className="!h-4 !w-4" />,
  cualificacion: <Award className="!h-4 !w-4" />,
}

const etiquetaPorTipo = {
  ocupacion: "Ocupación",
  competencia: "Competencia",
  cualificacion: "Cualificación",
}

const colorPorTipo = {
  ocupacion: "bg-blue-100 text-blue-800",
  competencia: "bg-green-100 text-green-800",
  cualificacion: "bg-purple-100 text-purple-800",
}

const ResultadoItem = ({ id, titulo, descripcion, tipo, categoria, puntuacionRelevancia }) => {
    const icono = iconoPorTipo[tipo] || <BookOpen className="!h-4 !w-4" />
  const etiqueta = etiquetaPorTipo[tipo] || tipo
  const colorEtiqueta = colorPorTipo[tipo] || "bg-gray-100 text-gray-800"

  return (
    <div
      key={id}
      className="!border !rounded-lg !p-4 hover:!border-[#00a19a] hover:!bg-gray-50 !transition-colors"
    >
      <div className="!flex !items-start !justify-between !mb-3">
        <div className="!flex !items-center !gap-2">
          {icono}
          <h3 className="!font-semibold !text-lg">{titulo}</h3>
        </div>
        <div className="!flex !items-center !gap-2">
          <span className="!text-sm !text-muted-foreground">Relevancia:</span>
          <Badge variant="outline">{(puntuacionRelevancia * 100).toFixed(0)}%</Badge>
        </div>
      </div>

      <p className="!text-muted-foreground !mb-3 !leading-relaxed">{descripcion}</p>

      <div className="!flex !items-center !justify-between">
        <span className="!text-sm !text-muted-foreground">{categoria}</span>
        
      </div>
    </div>
  )
}

export default ResultadoItem;