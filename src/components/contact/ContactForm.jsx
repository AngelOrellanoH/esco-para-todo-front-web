import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { XCircle , CheckCircle2 } from 'lucide-react'
import { setContact } from '@/services/contact-service'

const ContactForm = () => {
  const [formState, setFormState] = useState({
    nombre: '',
    usuario: '',
    asunto: '',
    mensaje: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, asunto: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try{
      await setContact(formState)
      setIsSubmitted(true)
      setFormState({
        nombre: '',
        usuario: '',
        asunto: '',
        mensaje: '',
      })
      setError(false)
    }catch(error){
      console.error('Error al enviar el formulario:', error)
      setIsSubmitted(false)
      setError(true)
    }finally{
      setIsSubmitting(false)
      
    }
  }

  if (isSubmitted) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle2 className="h-8 w-8 !text-green-600" />
            </div>
            <h3 className="text-2xl font-bold !text-[#003060] mb-2">¡Mensaje enviado!</h3>
            <p className="!text-gray-600 mb-4">
              Gracias por contactarnos. Te responderemos pronto.
            </p>
            <Button onClick={() => setIsSubmitted(false)} variant="outline">
              Enviar otro mensaje
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
              <XCircle  className="h-8 w-8 !text-red-600" />
            </div>
            <h3 className="text-2xl font-bold !text-[#003060] mb-2">¡Error al enviar el Mensaje!</h3>
            <p className="!text-gray-600 mb-4">
              Pedimos disculpas por las molestias, pero no se pudo enviar el Mensaje
            </p>
            <Button onClick={() => {
                setIsSubmitted(false);
                setError(false);
                setFormState({
                  nombre: '',
                  usuario: '',
                  asunto: '',
                  mensaje: '',
                })
              }} variant="outline">
                Intentar Nuevamente
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-blue-100 shadow-md">
      <CardHeader>
        <CardTitle className="!text-[#003060] text-2xl">Formulario de contacto</CardTitle>
        <CardDescription className="!text-gray-600">
          ¿Tienes preguntas o sugerencias? Envíanos un mensaje.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="nombre" className="!text-[#003060] font-medium">Nombre completo</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formState.nombre}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="usuario" className="!text-[#003060] font-medium">Correo electrónico</Label>
            <Input
              id="usuario"
              name="usuario"
              type="email"
              value={formState.usuario}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="asunto" className="!text-[#003060] font-medium">Asunto</Label>
            <Select onValueChange={handleSelectChange} value={formState.asunto}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona un asunto" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">Consulta general</SelectItem>
                <SelectItem value="technical">Soporte técnico</SelectItem>
                <SelectItem value="feedback">Comentarios</SelectItem>
                <SelectItem value="collaboration">Colaboración</SelectItem>
                <SelectItem value="other">Otro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="mensaje" className="!text-[#003060] font-medium">Mensaje</Label>
            <Textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              value={formState.mensaje}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full py-6 !bg-blue-600 hover:!bg-blue-700 !text-white font-semibold"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default ContactForm
