import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Check } from "lucide-react"
import CompetenciaItem from "./CompetenciaItem";


const PerfilCompetencias = ({competencias, onQuitar}) => {
    
    return (
        <Card className="!bg-white !shadow-md !rounded-2xl !mt-4 !mb-4">
            <CardHeader>
                <CardTitle className="!text-xl !font-semibold !flex !items-center !gap-2">
                    <Check className="w-5 h-5 text-green-600" />
                    Mi Perfil de Competencias ({competencias.length})
                </CardTitle>
                <CardDescription className="!text-sm !text-muted-foreground">
                    Competencias añadidas a tu perfil profesional
                </CardDescription>
            </CardHeader>

            <CardContent>
                {competencias.length === 0 ? (
                    <p className="!text-center !text-muted-foreground !py-4">
                        No has añadido competencias a tu perfil aún. Explora las disponibles y añádelas con el botón "+".
                    </p>
                    ) : (
                    <div className="!grid !gap-3">
                        {competencias.map((competencia) => (
                            <CompetenciaItem
                                key={competencia.id}
                                competencia={competencia}
                                asignado={true}
                                onToggle={() => onQuitar(competencia.id)}
                            />
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default PerfilCompetencias;