import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import JA from '@/assets/JA.png'
import AO from '@/assets/AO.png'
import AM from '@/assets/AM.png'
import JH from '@/assets/JH.png'

const AboutTeam = () => {
  const teamMembers = [
    {
      name: 'Javier Antoranz',
      role: 'Diseñador de Base de Datos y Desarrollador Backend',
      avatar: JA,
      initials: 'JA',
    },
    {
      name: 'Amle Martinez',
      role: 'Diseñador de Interface y Desarrollador Móvil',
      avatar: AM,
      initials: 'AM',
    },
    {
      name: 'Antonio Orellano',
      role: 'Responsable de Equipo y Desarrollador Backend',
      avatar: AO,
      initials: 'AO',
    },
    {
      name: 'Joel Hernández',
      role: 'Diseñador de Interface y Desarrollador Web',
      avatar: JH,
      initials: 'JH',
    },
  ]

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold !text-[#003060] mb-4">Nuestro equipo</h2>
          <p className="text-lg !text-gray-600 dark:!text-gray-400 max-w-3xl mx-auto">
            Un equipo multidisciplinario comprometido con el desarrollo de soluciones innovadoras para la educación.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6 text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={member.avatar || '/placeholder.svg'} alt={member.name} />
                  <AvatarFallback className="text-lg !bg-[#00a19a] !text-white">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                <p className="!text-gray-500 dark:!text-gray-400">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutTeam
