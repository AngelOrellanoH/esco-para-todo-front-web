// src/components/login/LoginForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAuth } from "@/contexts/AuthContext"; 
import { IonLoading } from "@ionic/react"; 

const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log("Login attempt with:", { email, password });

    try {
      await login(email, password);
      console.log("Login exitoso, redirigiendo...");
      navigate("/", { replace: true }); 
    } catch (err) {
      console.error("Error en el componente LoginForm:", err.message);
      setError(err.message || "Credenciales inválidas. Por favor, inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

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
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" className="w-full">
            Entrar
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          ¿No tienes una cuenta?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            Crear cuenta
          </span>
        </div>
      </CardFooter>
      <IonLoading
        isOpen={loading}
        message={'Iniciando sesión...'}
        duration={0}
      />
    </Card>
  );
};

export default LoginForm;