import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Wallet, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

import { supabase } from '@/integrations/supabase/client';
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

function GoogleIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function AuthForm({
  isSignUp,
  isLoading,
  onSubmit,
  onToggleMode,
  onForgotPassword,
  onGoogleSignIn,
  isGoogleLoading,
}: {
  isSignUp: boolean;
  isLoading: boolean;
  onSubmit: (data: AuthFormData) => Promise<void>;
  onToggleMode: () => void;
  onForgotPassword: () => void;
  onGoogleSignIn: () => Promise<void>;
  isGoogleLoading: boolean;
}) {
  const form = useForm<AuthFormData>({
    resolver: zodResolver(isSignUp ? signUpSchema : signInSchema),
    defaultValues: isSignUp
      ? ({ email: '', password: '', fullName: '' } satisfies SignUpFormData)
      : ({ email: '', password: '' } satisfies SignInFormData),
  });

  return (
    <>
      {/* Google Sign In Button */}
      <Button
        type="button"
        variant="outline"
        className="w-full mb-6 h-12 text-base font-medium"
        onClick={onGoogleSignIn}
        disabled={isGoogleLoading || isLoading}
      >
        <GoogleIcon />
        <span className="ml-3">
          {isGoogleLoading ? 'Laden...' : `Doorgaan met Google`}
        </span>
      </Button>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Of {isSignUp ? 'registreer' : 'log in'} met e-mail
          </span>
        </div>
      </div>

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

          <Button type="submit" className="w-full" disabled={isLoading || isGoogleLoading}>
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
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isVerifyingResetLink, setIsVerifyingResetLink] = useState(false);
  const [resetLinkVerified, setResetLinkVerified] = useState(false);

  const { signIn, signUp, resetPassword, updatePassword, user } = useAuth();
  const navigate = useNavigate();

  // When opening the reset link from email (including inside the PWA), verify it in-app
  // so the user never has to hit the /auth/v1/verify endpoint URL.
  useEffect(() => {
    if (mode !== 'reset') return;

    const token_hash = searchParams.get('token_hash') ?? searchParams.get('token');
    const type = (searchParams.get('type') ?? 'recovery') as any;

    if (!token_hash || resetLinkVerified || isVerifyingResetLink) return;

    setIsVerifyingResetLink(true);
    supabase.auth
      .verifyOtp({ type, token_hash })
      .then(({ data, error }) => {
        if (error || !data.session) {
          toast.error('Resetlink is ongeldig of verlopen. Vraag een nieuwe aan.');
          setMode('forgot');
          return;
        }
        // Session is now established by verifyOtp - the auth listener will pick it up
        // Give it a moment to propagate
        setTimeout(() => {
          setResetLinkVerified(true);
        }, 100);
      })
      .finally(() => setIsVerifyingResetLink(false));
  }, [mode, searchParams, resetLinkVerified, isVerifyingResetLink]);

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

  const onGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) {
        toast.error('Fout bij inloggen met Google');
      }
    } finally {
      setIsGoogleLoading(false);
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
    <main className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left Hero Section - hidden on mobile */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary/90 to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
        
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-white">
          <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
            Gratis & Eenvoudig
          </div>
          
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-center mb-4 leading-tight">
            Alles op één plek.
            <br />
            <span className="text-white/90">Inclusief je financiën.</span>
          </h2>
          
          <div className="mt-12 relative">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-white/20 rounded w-3/4"></div>
                <div className="h-4 bg-white/20 rounded w-1/2"></div>
                <div className="h-8 bg-white/30 rounded w-full mt-4"></div>
                <div className="flex gap-2 mt-2">
                  <div className="h-16 bg-white/20 rounded flex-1"></div>
                  <div className="h-16 bg-white/20 rounded flex-1"></div>
                </div>
              </div>
            </div>
          </div>
          
          <p className="mt-12 text-lg text-white/80 text-center max-w-md">
            FinOverzicht is je persoonlijke assistent voor al je financiële overzichten.
          </p>
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 lg:absolute lg:top-8 lg:right-8" aria-label="Terug naar home">
            <Wallet className="h-7 w-7 text-primary" aria-hidden="true" />
            <span className="font-heading font-bold text-xl">FinOverzicht</span>
          </Link>

          {/* Form Header */}
          <div className="mb-8">
            <h1 className="font-heading text-2xl lg:text-3xl font-bold tracking-tight mb-2">
              {getTitle()}
            </h1>
            <p className="text-muted-foreground">
              {getDescription()}
            </p>
          </div>

          {/* Form Content */}
          <div className="space-y-6">
            {mode === 'forgot' ? (
              <ForgotPasswordForm
                isLoading={isLoading}
                onSubmit={onForgotPasswordSubmit}
                onBack={() => setMode('signin')}
              />
            ) : mode === 'reset' ? (
              isVerifyingResetLink ? (
                <div className="text-sm text-muted-foreground">
                  Resetlink controleren...
                </div>
              ) : (
                <NewPasswordForm
                  isLoading={isLoading}
                  onSubmit={onNewPasswordSubmit}
                />
              )
            ) : (
              <AuthForm
                key={mode}
                isSignUp={mode === 'signup'}
                isLoading={isLoading}
                onSubmit={onSubmit}
                onToggleMode={() => setMode(mode === 'signup' ? 'signin' : 'signup')}
                onForgotPassword={() => setMode('forgot')}
                onGoogleSignIn={onGoogleSignIn}
                isGoogleLoading={isGoogleLoading}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
