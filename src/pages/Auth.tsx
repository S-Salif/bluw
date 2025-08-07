import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signUp, signIn } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let result;
      if (isSignUp) {
        if (!fullName.trim()) {
          setError('Nom complet requis');
          setLoading(false);
          return;
        }
        result = await signUp(email, password, fullName);
        if (!result.error) {
          toast({
            title: "Compte créé avec succès",
            description: "Vérifiez votre email pour confirmer votre compte.",
          });
        }
      } else {
        result = await signIn(email, password);
        if (!result.error) {
          toast({
            title: "Connexion réussie",
            description: "Bienvenue !",
          });
          navigate('/');
        }
      }

      if (result.error) {
        if (result.error.message.includes('User already registered')) {
          setError('Un compte existe déjà avec cet email');
        } else if (result.error.message.includes('Invalid login credentials')) {
          setError('Email ou mot de passe incorrect');
        } else if (result.error.message.includes('Password should be at least')) {
          setError('Le mot de passe doit contenir au moins 6 caractères');
        } else {
          setError(result.error.message);
        }
      }
    } catch (err) {
      setError('Une erreur inattendue s\'est produite');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à l'accueil
          </Link>
        </div>
        
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              {isSignUp ? 'Créer un compte' : 'Se connecter'}
            </CardTitle>
            <CardDescription>
              {isSignUp 
                ? 'Créez votre compte pour commander vos designs'
                : 'Connectez-vous à votre compte'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nom complet</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isSignUp ? 'Créer le compte' : 'Se connecter'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button
                variant="link"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setError('');
                  setEmail('');
                  setPassword('');
                  setFullName('');
                }}
                className="text-sm"
              >
                {isSignUp 
                  ? 'Vous avez déjà un compte ? Se connecter'
                  : 'Pas de compte ? Créer un compte'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}