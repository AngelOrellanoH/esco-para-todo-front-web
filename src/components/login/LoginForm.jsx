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
import { useTranslation } from "react-i18next";

const LoginForm = () => {
  const { t } = useTranslation('login');
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
      setError(err.message || t('loginForm.invalidCredentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md !border !bg-white dark:!bg-gray-900 dark:!text-white">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center !text-[#003060]">
          {t('loginForm.title')}
        </CardTitle>
        <CardDescription className="text-center !text-gray-600 dark:!text-gray-400">
          {t('loginForm.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">{t('loginForm.emailLabel')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('loginForm.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">{t('loginForm.passwordLabel')}</Label>
              <span
                onClick={() => navigate("/forgot-password")}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {t('loginForm.forgotPassword')}
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
            {t('loginForm.loginButton')}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-center text-sm">
          {t('loginForm.noAccountPrompt')}{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {t('loginForm.createAccountLink')}
          </span>
        </div>
      </CardFooter>
      <IonLoading
        isOpen={loading}
        message={t('loginForm.loadingMessage')}
        duration={0}
      />
    </Card>
  );
};

export default LoginForm;