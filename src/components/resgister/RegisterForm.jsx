// src/components/RegisterForm.jsx (MODIFICADO)
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

import { AuthService } from "@/services/auth-service";
import { useTranslation } from "react-i18next";
import { IonLoading } from "@ionic/react"; 

const RegisterForm = () => {
    const { t } = useTranslation('register');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState(null); 
    const [successMessage, setSuccessMessage] = useState(null); 
    const [loading, setLoading] = useState(false); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === "password" || name === "confirmPassword") {
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);         // Limpiar errores anteriores
        setSuccessMessage(null); // Limpiar mensajes de éxito anteriores

        if (formData.password !== formData.confirmPassword) {
            setError(t('registerForm.passwordMismatch')); // Error de validación del cliente
            setLoading(false);
            return; 
        }

        try {
            const user = {
                nombre: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: formData.password,
                rol: "USER"
            };

            await AuthService.register(user);

            setSuccessMessage(t('registerForm.registrationSuccess')); 
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (err) {
            console.error('Error en el componente RegisterForm:', err.message);
            setError(err.message || t('registerForm.genericRegistrationError')); 
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-md !border !bg-white dark:!bg-gray-900 dark:!text-white">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center !text-[#003060]">
                    {t('registerForm.title')}
                </CardTitle>
                <CardDescription className="text-center !text-gray-600 dark:!text-gray-400">
                    {t('registerForm.description')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">{t('registerForm.firstNameLabel')}</Label>
                            <Input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">{t('registerForm.lastNameLabel')}</Label>
                            <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">{t('registerForm.emailLabel')}</Label>
                        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{t('registerForm.passwordLabel')}</Label>
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
                        <Label htmlFor="confirmPassword">{t('registerForm.confirmPasswordLabel')}</Label>
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
                        disabled={loading} // Deshabilitar el botón si está cargando
                        className="w-full py-6 !bg-blue-600 hover:!bg-blue-700 !text-white font-semibold"
                    >
                        {loading ? t('registerForm.registeringButton') : t('registerForm.registerButton')}
                    </Button>
                </form>
                {/* Mostrar el mensaje de error o éxito */}
                {error && (
                    <p className="text-red-500 text-center text-sm mt-4">
                        {error}
                    </p>
                )}
                {successMessage && (
                    <p className="text-green-600 text-center text-sm mt-4">
                        {successMessage}
                    </p>
                )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <div className="text-center text-sm">
                    {t('registerForm.alreadyHaveAccount')}{" "}
                    <span
                        onClick={() => navigate("/login")}
                        className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                        {t('registerForm.loginLink')}
                    </span>
                </div>
            </CardFooter>
            <IonLoading
                isOpen={loading}
                message={t('registerForm.loadingMessage')}
                duration={0}
            />
        </Card>
    );
};

export default RegisterForm;