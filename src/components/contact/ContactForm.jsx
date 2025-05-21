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
import { CheckCircle2 } from 'lucide-react'

const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value) => {
    setFormState((prev) => ({ ...prev, subject: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    setTimeout(() => {
      console.log('Formulario enviado:', formState)
      setIsSubmitting(false)
      setIsSubmitted(true)

      setTimeout(() => {
        setIsSubmitted(false)
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        })
      }, 3000)
    }, 1500)
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
            <Label htmlFor="name" className="!text-[#003060] font-medium">Nombre completo</Label>
            <Input
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="!text-[#003060] font-medium">Correo electrónico</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="!text-[#003060] font-medium">Asunto</Label>
            <Select onValueChange={handleSelectChange} value={formState.subject}>
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
            <Label htmlFor="message" className="!text-[#003060] font-medium">Mensaje</Label>
            <Textarea
              id="message"
              name="message"
              rows={5}
              value={formState.message}
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
