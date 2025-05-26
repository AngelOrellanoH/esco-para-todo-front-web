import { Card, CardContent } from '@/components/ui/card'
import escoProyect from '@/assets/ESCO-proyect.png'

const AboutContent = () => {
  return (
    <section className="py-12">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold !text-[#003060] mb-6">El Proyecto</h2>
          <div className="space-y-4">
            <p className="!text-gray-600 dark:!text-gray-400">
              El grupo de investigación Acuario ha estado trabajando durante los últimos meses en un programa capaz de
              permitir a los docentes conocer las habilidades, competencias, cualificaciones y ocupaciones relevantes
              reflejadas en ESCO para el mercado laboral y la educación de la UE.
            </p>
            <p className="!text-gray-600 dark:!text-gray-400">
              Este conocimiento puede ser aplicado principalmente en las guías docentes de sus asignaturas simplemente
              proporcionando una descripción de su perfil. Nuestra plataforma proporciona una interfaz gráfica e
              interactiva para que los usuarios puedan hacer uso de esta herramienta de forma sencilla e intuitiva.
            </p>
            <p className="!text-gray-600 dark:!text-gray-400">
              El sistema ha sido desarrollado mediante metodologías ágiles, cuenta con diferentes perfiles de usuario y
              está disponible tanto en versión web como móvil, con soporte para múltiples idiomas.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <Card className="overflow-hidden w-full max-w-md">
            <CardContent className="p-0">
              <img
                src={escoProyect}
                alt="ESCO para todos"
                className="w-full h-auto"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default AboutContent
