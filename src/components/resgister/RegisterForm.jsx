import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { setRegister } from "@/services/register-service"


const RegisterForm = () => {
    const navigate = useNavigate()
    
    const [isCorrectPassword, setIsCorrectPassword] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [error, setError] = useState(null)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData({
        ...formData,
        [name]: value,
        })
        if(name === "password" || name === "confirmPassword"){
            setIsCorrectPassword(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if(formData.password === formData.confirmPassword){
            setIsCorrectPassword(true)
            try{
                const user = {
                    nombre: `${formData.firstName} ${formData.lastName}`,
                    email: formData.email,
                    password: formData.password,
                    rol: "USER"
                }
                await setRegister(user)
                setIsSubmitted(true)
                setError(false)
                setTimeout(() => {
                navigate("/login"); // Redirige a la página de login
            }, 1500); // 1.5 segundos de retraso
            }catch(error){
                console.error('Error al registrar al usuario:', error)
                setIsSubmitted(false)
                setError(true)
            }finally{
                setIsSubmitting(false)
            }
        }else{
            setIsCorrectPassword(false)
            setIsSubmitting(false)
        }

    }

    return (
        <Card className="w-full max-w-md !border !bg-white dark:!bg-gray-900 dark:!text-white">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center !text-[#003060]">
                Crear cuenta
                </CardTitle>
                <CardDescription className="text-center !text-gray-600 dark:!text-gray-400">
                Regístrate completando la información solicitada
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">Nombre</Label>
                            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Apellido</Label>
                            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Correo electrónico</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">Contraseña</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                        <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <Button type="submit" 
                        disabled={isSubmitting}
                        className="w-full py-6 !bg-blue-600 hover:!bg-blue-700 !text-white font-semibold"
                    >
                        {isSubmitting ? 'Registrando...' : 'Crear Cuenta'}
                    </Button>
                </form>
                {error && (
                    <p className="text-red-500 text-center text-sm">
                        Hubo un error al registrar. Intenta nuevamente.
                    </p>
                )}
                {isCorrectPassword == false && (
                    <p className="text-red-500 text-center text-sm">
                        Las contraseñas no coinciden.
                    </p>
                )}
                {isSubmitted && (
                    <p className="text-green-600 text-center text-sm">
                        Registro exitoso. Redirigiendo...
                    </p>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
                    ¿Ya tienes una cuenta? {" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                        Iniciar sesión
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default RegisterForm;