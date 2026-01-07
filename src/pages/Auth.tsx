import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wallet, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

// Password must be at least 8 characters with at least 1 special character
const passwordSchema = z.string()
  .min(8, 'Wachtwoord moet minimaal 8 karakters zijn')
  .regex(/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/`~]/, 'Wachtwoord moet minimaal 1 speciaal teken bevatten (!@#$%^&* etc.)');

const signInSchema = z.object({
  email: z.string().email('Voer een geldig e-mailadres in'),
  password: z.string().min(1, 'Wachtwoord is verplicht'),
});

const signUpSchema = z.object({
  fullName: z.string().min(2, 'Naam moet minimaal 2 karakters zijn'),
  email: z.string().email('Voer een geldig e-mailadres in'),
  password: passwordSchema,
});

const resetPasswordSchema = z.object({
  email: z.string().email('Voer een geldig e-mailadres in'),
});

const newPasswordSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Wachtwoorden komen niet overeen",
  path: ["confirmPassword"],
});

type SignInFormData = z.infer<typeof signInSchema>;
type SignUpFormData = z.infer<typeof signUpSchema>;
type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
type NewPasswordFormData = z.infer<typeof newPasswordSchema>;
type AuthFormData = SignInFormData | SignUpFormData;

function PasswordInput({ 
  field, 
  placeholder, 
  autoComplete 
}: { 
  field: any; 
  placeholder: string; 
  autoComplete: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        {...field}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}

function AuthForm({
  isSignUp,
  isLoading,
  onSubmit,
  onToggleMode,
  onForgotPassword,
}: {
  isSignUp: boolean;
  isLoading: boolean;
  onSubmit: (data: AuthFormData) => Promise<void>;
  onToggleMode: () => void;
  onForgotPassword: () => void;
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
                  <PasswordInput 
                    field={field} 
                    placeholder="••••••••" 
                    autoComplete={isSignUp ? 'new-password' : 'current-password'} 
                  />
                </FormControl>
                <FormMessage />
                {isSignUp && (
                  <p className="text-xs text-muted-foreground">
                    Minimaal 8 karakters met minimaal 1 speciaal teken
                  </p>
                )}
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Laden...' : isSignUp ? 'Registreren' : 'Inloggen'}
          </Button>
        </form>
      </Form>

      {!isSignUp && (
        <div className="mt-4 text-center">
          <button 
            onClick={onForgotPassword} 
            type="button" 
            className="text-sm text-muted-foreground hover:text-primary hover:underline"
          >
            Wachtwoord vergeten?
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-sm">
        <button onClick={onToggleMode} type="button" className="text-primary hover:underline">
          {isSignUp ? 'Al een account? Log in' : 'Nog geen account? Registreer'}
        </button>
      </div>
    </>
  );
}

function ForgotPasswordForm({
  isLoading,
  onSubmit,
  onBack,
}: {
  isLoading: boolean;
  onSubmit: (data: ResetPasswordFormData) => Promise<void>;
  onBack: () => void;
}) {
  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' },
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Versturen...' : 'Wachtwoord herstellen'}
          </Button>
        </form>
      </Form>

      <div className="mt-4 text-center">
        <button onClick={onBack} type="button" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-1 mx-auto">
          <ArrowLeft className="h-4 w-4" />
          Terug naar inloggen
        </button>
      </div>
    </>
  );
}

function NewPasswordForm({
  isLoading,
  onSubmit,
}: {
  isLoading: boolean;
  onSubmit: (data: NewPasswordFormData) => Promise<void>;
}) {
  const form = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nieuw wachtwoord</FormLabel>
              <FormControl>
                <PasswordInput 
                  field={field} 
                  placeholder="••••••••" 
                  autoComplete="new-password" 
                />
              </FormControl>
              <FormMessage />
              <p className="text-xs text-muted-foreground">
                Minimaal 8 karakters met minimaal 1 speciaal teken
              </p>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bevestig wachtwoord</FormLabel>
              <FormControl>
                <PasswordInput 
                  field={field} 
                  placeholder="••••••••" 
                  autoComplete="new-password" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Opslaan...' : 'Wachtwoord opslaan'}
        </Button>
      </form>
    </Form>
  );
}

type AuthMode = 'signin' | 'signup' | 'forgot' | 'reset';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 
                      searchParams.get('mode') === 'reset' ? 'reset' : 'signin';
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, signUp, resetPassword, updatePassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const title = mode === 'signup' ? 'Account aanmaken | FinOverzicht' : 
                  mode === 'forgot' ? 'Wachtwoord vergeten | FinOverzicht' :
                  mode === 'reset' ? 'Nieuw wachtwoord | FinOverzicht' :
                  'Inloggen | FinOverzicht';
    document.title = title;

    const description = mode === 'signup'
      ? 'Maak een gratis FinOverzicht account aan om je inkomsten, uitgaven, vaste lasten en schulden bij te houden.'
      : mode === 'forgot' 
      ? 'Herstel je wachtwoord voor FinOverzicht.'
      : mode === 'reset'
      ? 'Stel een nieuw wachtwoord in voor je FinOverzicht account.'
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
  }, [mode]);

  useEffect(() => {
    if (user && mode !== 'reset') navigate('/dashboard');
  }, [user, navigate, mode]);

  const onSubmit = async (data: AuthFormData) => {
    setIsLoading(true);
    try {
      if (mode === 'signup') {
        const signUpData = data as SignUpFormData;
        const { error } = await signUp(signUpData.email, signUpData.password, signUpData.fullName);
        if (error) {
          if (error.message.includes('already registered')) {
            toast.error('Dit e-mailadres is al geregistreerd');
          } else {
            toast.error(error.message);
          }
        } else {
          toast.success('Account aangemaakt! Controleer je e-mail voor een welkomstbericht.');
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

  const onForgotPasswordSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await resetPassword(data.email);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Als er een account met dit e-mailadres bestaat, ontvang je een e-mail met instructies. Controleer ook je spam/ongewenste map!');
        setMode('signin');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onNewPasswordSubmit = async (data: NewPasswordFormData) => {
    setIsLoading(true);
    try {
      const { error } = await updatePassword(data.password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Je wachtwoord is succesvol gewijzigd!');
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    switch (mode) {
      case 'signup': return 'Account aanmaken';
      case 'forgot': return 'Wachtwoord vergeten';
      case 'reset': return 'Nieuw wachtwoord';
      default: return 'Inloggen';
    }
  };

  const getDescription = () => {
    switch (mode) {
      case 'signup': return 'Maak een gratis account aan';
      case 'forgot': return 'Vul je e-mailadres in om je wachtwoord te herstellen. Controleer ook je spam/ongewenste map.';
      case 'reset': return 'Kies een nieuw wachtwoord';
      default: return 'Log in op je account';
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
            {getTitle()}
          </h1>

          <CardDescription>
            {getDescription()}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {mode === 'forgot' ? (
            <ForgotPasswordForm
              isLoading={isLoading}
              onSubmit={onForgotPasswordSubmit}
              onBack={() => setMode('signin')}
            />
          ) : mode === 'reset' ? (
            <NewPasswordForm
              isLoading={isLoading}
              onSubmit={onNewPasswordSubmit}
            />
          ) : (
            <AuthForm
              key={mode}
              isSignUp={mode === 'signup'}
              isLoading={isLoading}
              onSubmit={onSubmit}
              onToggleMode={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
              onForgotPassword={() => setMode('forgot')}
            />
          )}
        </CardContent>
      </Card>
    </main>
  );
}
