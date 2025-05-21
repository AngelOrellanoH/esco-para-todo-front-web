import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Target, Users, Globe, BookOpen, Code, LineChart } from 'lucide-react'

const AboutGoals = () => {
  const goals = [
    {
      icon: <Target className="h-8 w-8 !text-[#00a19a]" />,
      title: 'Proporcionar una herramienta innovadora',
      description: 'Desarrollar una plataforma que facilite a los docentes la comprensión de las competencias y habilidades de ESCO.',
    },
    {
      icon: <Users className="h-8 w-8 !text-[#00a19a]" />,
      title: 'Fomentar la colaboración',
      description: 'Permitir que distintos perfiles educativos colaboren en la construcción de guías docentes alineadas con ESCO.',
    },
    {
      icon: <Globe className="h-8 w-8 !text-[#00a19a]" />,
      title: 'Internacionalización',
      description: 'Ofrecer una plataforma multilingüe que se adapte a diferentes contextos europeos.',
    },
    {
      icon: <BookOpen className="h-8 w-8 !text-[#00a19a]" />,
      title: 'Facilitar el aprendizaje',
      description: 'Mejorar el proceso de enseñanza incorporando referencias claras a competencias laborales.',
    },
    {
      icon: <Code className="h-8 w-8 !text-[#00a19a]" />,
      title: 'Uso de tecnologías abiertas',
      description: 'Desarrollar la solución utilizando software libre y tecnologías web modernas.',
    },
    {
      icon: <LineChart className="h-8 w-8 !text-[#00a19a]" />,
      title: 'Evaluación y mejora continua',
      description: 'Monitorear el uso de la herramienta para implementar mejoras constantes basadas en el feedback.',
    },
  ]

  return (
    <section className="py-12 !bg-gray-50 dark:!bg-gray-900 rounded-lg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold !text-[#003060] mb-4">Objetivos del Proyecto</h2>
          <p className="text-lg !text-gray-600 dark:!text-gray-400 max-w-3xl mx-auto">
            Nuestra plataforma tiene como finalidad apoyar a los docentes en el diseño de sus asignaturas alineadas con las competencias del marco ESCO.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                {goal.icon}
                <CardTitle className="text-xl">{goal.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="!text-gray-600 dark:!text-gray-400">{goal.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutGoals
