import { CheckCircle } from 'lucide-react'

const FeatureSection = () => {
  const features = [
    {
      title: 'Perfil personalizable',
      description: 'Crea y gestiona tu perfil con tus habilidades, formación y experiencia.',
    },
    {
      title: 'Competencias ESCO',
      description: 'Explora y añade competencias oficiales del marco ESCO.',
    },
    {
      title: 'Coincidencia inteligente',
      description: 'Te sugerimos ocupaciones basadas en tus competencias.',
    },
    {
      title: 'Foro comunitario',
      description: 'Participa en debates, haz preguntas y comparte conocimientos.',
    },
    {
      title: 'Historial de cambios',
      description: 'Consulta el historial de modificaciones en tu perfil.',
    },
    {
      title: 'Disponible en varios idiomas',
      description: 'La plataforma está accesible en múltiples idiomas para mayor inclusión.',
    },
  ]

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold !text-[#003060] mb-4">
            Características principales
          </h2>
          <p className="text-lg !text-gray-600 dark:!text-gray-400 max-w-3xl mx-auto">
            Nuestra plataforma ofrece herramientas clave para ayudarte a gestionar y desarrollar tu perfil profesional.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              <CheckCircle className="h-6 w-6 flex-shrink-0 !text-[#00a19a]" />
              <div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="!text-gray-600 dark:!text-gray-400">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeatureSection
