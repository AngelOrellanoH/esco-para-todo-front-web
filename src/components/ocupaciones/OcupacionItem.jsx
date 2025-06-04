import { Link } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const OcupacionItem = ({ ocupacion }) => {
  const [conteo, setConteo] = useState({ essential: 0, optional: 0 });

  useEffect(() => {
    if (!ocupacion || !ocupacion.competencias) return;

    let esenciales = 0;
    let opcionales = 0;

    for (const comp of ocupacion.competencias) {
      if (comp.tipoRelacion === "essential") {
        esenciales++;
      } else if (comp.tipoRelacion === "optional") {
        opcionales++;
      }
    }

    setConteo({ essential: esenciales, optional: opcionales });
  }, [ocupacion]);

  return (
    <Card className="!w-full !max-w-full hover:!shadow-md !transition-shadow !p-0">
      <CardContent className="!p-6 !min-w-0 !soverflow-hidden">
        <div className="!flex !flex-col sm:!flex-row !items-start !justify-between !gap-4 !min-w-0">
          {/* Columna izquierda */}
          <div className="!flex-1 !space-y-3 !min-w-0">
            <div className="!flex !flex-wrap !items-center !gap-3 !min-w-0">
              <h3 className="!font-semibold !text-lg !m-0">{ocupacion.nombre}</h3>
              <div className="!flex !gap-2">
                <Badge variant="outline">ISCO: {ocupacion.codigoIsco}</Badge>
                <Badge variant="secondary">Educación</Badge>
              </div>
            </div>

            <p className="!text-muted-foreground !text-sm !leading-relaxed !line-clamp-3 !break-words !overflow-hidden">
              {ocupacion.descripcion}
            </p>

            <div className="!flex !items-center !gap-4 !text-sm !flex-wrap">
              <span className="!flex !items-center !gap-1">
                <span className="!font-medium !text-green-600">{conteo.essential}</span>
                <span className="!text-muted-foreground">competencias esenciales</span>
              </span>
              <span className="!flex !items-center !gap-1">
                <span className="!font-medium !text-blue-600">{conteo.optional}</span>
                <span className="!text-muted-foreground">competencias opcionales</span>
              </span>
            </div>
          </div>

          {/* Botón de acción */}
          <Link
            to={`/usuario/ocupaciones/${ocupacion.id}`}
            className="!self-center !w-full sm:!w-auto !inline-flex !items-center !justify-center !gap-2 !px-4 !py-2 !text-sm !font-medium !border !border-input !rounded-md !transition-colors !duration-200 !bg-background hover:!bg-muted/50 !text-foreground !cursor-pointer"
            >
                Ver detalles
                <ArrowRight className="!h-4 !w-4" />
            </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default OcupacionItem
