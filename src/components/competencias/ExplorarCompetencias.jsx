import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import CompetenciaItem from "./CompetenciaItem"

const ExplorarCompetencias = ({
  competencias,
  busqueda,
  setBusqueda,
  filtroTipo,
  setFiltroTipo,
  tipos,
  onToggle,
  usuarioCompetencias,
}) => {

  const enPerfil = (id) =>{
      return usuarioCompetencias.has(id);
  }

  return (
    <div className="!space-y-6">
      {/* Filtros y búsqueda */}
      <Card className="!shadow-none">
        <CardHeader>
          <CardTitle className="!text-lg !text-[#003060]">Explorar Competencias</CardTitle>
          <CardDescription>Busca y filtra competencias para añadir a tu perfil</CardDescription>
        </CardHeader>
        <CardContent className="!space-y-4">
          <div className="!flex !flex-wrap !gap-4">
            {/* Barra de búsqueda */}
            <div className="!relative !flex-grow !min-w-[250px]">
              <Search className="!absolute !left-2.5 !top-2.5 !h-4 !w-4 !text-muted-foreground" />
              <Input
                placeholder="Buscar competencias..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="!pl-8"
              />
            </div>

            {/* Contenedor de filtros */}
            <div className="!flex !gap-4 !flex-wrap sm:!flex-nowrap sm:!w-auto !w-full sm:!flex-row !flex-col">
              <select
                value={filtroTipo}
                onChange={(e) => setFiltroTipo(e.target.value)}
                className="!px-3 !py-2 !border !border-input !rounded-md !bg-background !w-auto !flex-shrink-0"
              >
                <option value="todos">Todos los tipos</option>
                {tipos.map((tipo) => (
                  <option key={tipo.value} value={tipo.value}>
                    {tipo.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Lista de competencias */}
          <div className="!grid !gap-4">
            {competencias.length === 0 ? (
              <Card>
                <CardContent className="!text-center !py-8">
                  <p className="!text-muted-foreground">
                    No se encontraron competencias que coincidan con los filtros seleccionados.
                  </p>
                </CardContent>
              </Card>
            ) : (
              competencias.map((competencia) => (
                <CompetenciaItem
                  key={competencia.id}
                  competencia={competencia}
                  asignado={enPerfil(competencia.id)}
                  onToggle={() => onToggle(competencia.id)}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ExplorarCompetencias
