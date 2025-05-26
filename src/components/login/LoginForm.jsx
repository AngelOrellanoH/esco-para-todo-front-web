import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const  LoginForm = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt with:", { email, password })
  }

  return (
    <Card className="w-full max-w-md !border !bg-white dark:!bg-gray-900 dark:!text-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center !text-[#003060]">
          Iniciar sesión
        </CardTitle>
        <CardDescription className="text-center !text-gray-600 dark:!text-gray-400">
          Accede con tu correo y contraseña
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Contraseña</Label>
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </span>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          ¿No tienes una cuenta? {" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Crear cuenta
          </span>
        </div>
      </CardFooter>
    </Card>
  )
}

export default LoginForm;