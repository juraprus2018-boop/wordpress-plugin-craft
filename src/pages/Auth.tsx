import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wallet } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const signInSchema = z.object({
  email: z.string().email('Voer een geldig e-mailadres in'),
  password: z.string().min(4, 'Wachtwoord moet minimaal 4 karakters zijn'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Naam moet minimaal 2 karakters zijn'),
  email: z.string().email('Voer een geldig e-mailadres in'),
  password: z.string().min(4, 'Wachtwoord moet minimaal 4 karakters zijn'),
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;
type AuthFormData = SignInFormData | SignUpFormData;

function AuthForm({
  isSignUp,
  isLoading,
  onSubmit,
  onToggleMode,
}: {
  isSignUp: boolean;
  isLoading: boolean;
  onSubmit: (data: AuthFormData) => Promise<void>;
  onToggleMode: () => void;
}) {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: isSignUp
      ? ({ email: '', password: '', fullName: '' } satisfies SignUpFormData)
      : ({ email: '', password: '' } satisfies SignInFormData),
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {isSignUp && (
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Naam</FormLabel>
                  <FormControl>
                    <Input placeholder="Je naam" autoComplete="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="je@email.nl" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wachtwoord</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Laden...' : isSignUp ? 'Registreren' : 'Inloggen'}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        <button onClick={onToggleMode} type="button" className="text-primary hover:underline">
          {isSignUp ? 'Al een account? Log in' : 'Nog geen account? Registreer'}
        </button>
      </div>
    </>
  );
}

export default function Auth() {
  const [searchParams] = useSearchParams();
  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const title = isSignUp ? 'Account aanmaken | FinOverzicht' : 'Inloggen | FinOverzicht';
    document.title = title;

    const description = isSignUp
      ? 'Maak een gratis FinOverzicht account aan om je inkomsten, uitgaven, vaste lasten en schulden bij te houden.'
      : 'Log in bij FinOverzicht om je inkomsten, uitgaven, vaste lasten en schulden bij te houden.';

    let meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = `${window.location.origin}/auth`;
  }, [isSignUp]);

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user, navigate]);

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      if (isSignUp) {
        const signUpData = data as SignUpFormData;
        const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('Dit e-mailadres is al geregistreerd');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account aangemaakt! Je bent nu ingelogd.');
        }
      } else {
        const signInData = data as SignInFormData;
        const { error } = await signIn(signInData.email, signInData.password);
        if (error) {
          toast.error('Ongeldige inloggegevens');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link to="/" className="flex items-center justify-center gap-2 mb-4" aria-label="Terug naar home">
            <Wallet className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="font-heading font-bold text-2xl">FinOverzicht</span>
          </Link>

          <h1 className="font-heading text-2xl font-semibold tracking-tight">
            {isSignUp ? 'Account aanmaken' : 'Inloggen'}
          </h1>

          <CardDescription>
            {isSignUp ? 'Maak een gratis account aan' : 'Log in op je account'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AuthForm
            key={isSignUp ? 'signup' : 'signin'}
            isSignUp={isSignUp}
            isLoading={isLoading}
            onSubmit={onSubmit}
            onToggleMode={() => setIsSignUp((v) => !v)}
          />
        </CardContent>
      </Card>
    </main>
  );
}
