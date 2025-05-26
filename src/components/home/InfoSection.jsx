import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const InfoSection = () => {
  return (
    <section className="py-12 !bg-gray-50 dark:!bg-gray-900 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold !text-[#003060] mb-4">
            ¿Qué es ESCO?
          </h2>
          <p className="text-lg !text-gray-600 dark:!text-gray-400 max-w-3xl mx-auto">
            La clasificación europea de capacidades, competencias, cualificaciones y ocupaciones.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="!text-[#00a19a]">ESCO</CardTitle>
              <CardDescription>Clasificación Europea</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                ESCO es la clasificación europea multilingüe de capacidades, competencias,
                cualificaciones y ocupaciones. ESCO funciona como un diccionario que describe,
                identifica y clasifica las profesiones, capacidades y cualificaciones pertinentes
                para el mercado laboral y la educación y formación de la UE.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="!text-[#00a19a]">Competencias</CardTitle>
              <CardDescription>Habilidades y conocimientos</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Las competencias son los conocimientos, aptitudes y habilidades que pueden aplicarse
                en un contexto ocupacional. ESCO distingue entre competencias/capacidades y
                conocimientos, y entre competencias/capacidades y conocimientos transversales y
                específicos de una ocupación.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="!text-[#00a19a]">Cualificaciones</CardTitle>
              <CardDescription>Certificaciones y títulos</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Las cualificaciones son el resultado formal de un proceso de evaluación y validación
                que se obtiene cuando una autoridad competente establece que una persona ha
                alcanzado los resultados de aprendizaje correspondientes a unas normas determinadas.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default InfoSection
