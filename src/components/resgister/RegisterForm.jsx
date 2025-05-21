import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


const RegisterForm = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: "",
        agreeTerms: false,
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
        })
    }

    const handleSelectChange = (value) => {
        setFormData({
        ...formData,
        userType: value,
        })
    }

    const handleCheckboxChange = (checked) => {
        setFormData({
        ...formData,
        agreeTerms: checked,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Register attempt with:", formData)
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

                    <Button type="submit" className="w-full">
                        Crear cuenta
                    </Button>
                </form>
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