import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, MapPin, Phone, Clock, ExternalLink } from 'lucide-react'

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold !text-[#003060] mb-4">Contacto</h1>
        <p className="text-lg !text-gray-600 dark:!text-gray-400">
          ¿Tienes preguntas o deseas más información? Ponte en contacto con nosotros.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Información de contacto</CardTitle>
          <CardDescription>Estamos aquí para ayudarte</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">Correo electrónico</h3>
              <p className="!text-gray-600 dark:!text-gray-400">info@escoparatodos.es</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">Teléfono</h3>
              <p className="!text-gray-600 dark:!text-gray-400">+34 912 345 678</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">Dirección</h3>
              <p className="!text-gray-600 dark:!text-gray-400">
                Universidad de Alcala de Henares
                <br />
                Facultad de Informática
                <br />
                Calle Principal, 123
                <br />
                28003 Madrid, España
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">Horario de atención</h3>
              <p className="!text-gray-600 dark:!text-gray-400">
                Lunes a viernes: 9:00 - 18:00
                <br />
                Sábados y domingos: Cerrado
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <ExternalLink className="h-5 w-5 !text-[#00a19a] mt-0.5" />
            <div>
              <h3 className="font-medium">Redes sociales</h3>
              <div className="flex gap-4 mt-2">
                <a href="#" className="!text-gray-600 hover:!text-[#00a19a] transition-colors">
                  Twitter
                </a>
                <a href="#" className="!text-gray-600 hover:!text-[#00a19a] transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="!text-gray-600 hover:!text-[#00a19a] transition-colors">
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ContactInfo
