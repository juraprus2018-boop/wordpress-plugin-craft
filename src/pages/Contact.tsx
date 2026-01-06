import { useState } from 'react';
import { useSEO, createBreadcrumbSchema } from '@/hooks/useSEO';
import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare, HelpCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  useSEO({
    title: 'Contact - FinOverzicht | Neem Contact Op',
    description: 'Heb je een vraag over FinOverzicht? Neem contact met ons op via het contactformulier of e-mail. We helpen je graag verder.',
    canonical: 'https://www.finoverzicht.nl/contact',
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact - FinOverzicht",
        "description": "Neem contact op met FinOverzicht",
        "url": "https://www.finoverzicht.nl/contact",
        "mainEntity": {
          "@type": "Organization",
          "name": "FinOverzicht",
          "email": "info@finoverzicht.nl",
          "url": "https://www.finoverzicht.nl"
        }
      },
      createBreadcrumbSchema([
        { name: 'Home', url: 'https://www.finoverzicht.nl/' },
        { name: 'Contact', url: 'https://www.finoverzicht.nl/contact' }
      ])
    ]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <PublicHeader />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gradient-to-br from-primary/5 via-transparent to-info/5">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold mb-6">
              Contact
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Heb je een vraag, suggestie of wil je gewoon even hallo zeggen? Neem gerust contact met ons op!
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-2">
                      <Mail className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">E-mail</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Voor algemene vragen kun je ons mailen op:
                    </p>
                    <a href="mailto:info@finoverzicht.nl" className="text-primary hover:underline">
                      info@finoverzicht.nl
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="p-3 rounded-xl bg-info/10 text-info w-fit mb-2">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Heb je suggesties om FinOverzicht te verbeteren? We horen het graag!
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="p-3 rounded-xl bg-success/10 text-success w-fit mb-2">
                      <HelpCircle className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-lg">Hulp nodig?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      Loop je ergens tegenaan? Stuur ons een bericht en we helpen je verder.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Stuur ons een bericht</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Naam</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Je naam"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="je@email.nl"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Onderwerp</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          placeholder="Waar gaat je bericht over?"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Bericht</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          placeholder="Schrijf hier je bericht..."
                          rows={5}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? 'Versturen...' : 'Verstuur bericht'}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
